import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {mkdirSync, writeFileSync} from 'node:fs';
const root = '.court/character-repairs';
mkdirSync(root, {recursive:true});
const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page = await browser.newPage();
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const wait = ms => new Promise(r=>setTimeout(r,ms));
const sprite='canvas[width="64"][height="96"]';
const pixels=()=>page.$eval(sprite,c=>c.toDataURL());
const clickText=async text=>{const found=await page.evaluate(text=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===text);b?.click();return !!b},text);assert(found,`Button: ${text}`);await wait(100)};
const navigate=async route=>{await page.goto('about:blank');await page.goto(`http://127.0.0.1:5173/#${route}`,{waitUntil:'networkidle0'})};
try {
 await page.setViewport({width:1440,height:1050});
 const hashes=new Set();
 for(const id of ['miles-morales','gwen-stacy','elsa','rapunzel','purring-window-cat','loyal-fireplace-dog']){
  await navigate(`select?char=${id}`);
  await page.waitForSelector(sprite);
  // The deep link itself must preserve pets rather than selecting Peter.
  const selected=await page.$eval(`[data-testid="character-card-${id}"]`,e=>!!e.querySelector('svg.lucide-check'));
  assert(selected,`${id} selected on deep link`);
  const initial=await pixels();assert(!hashes.has(initial),'Distinct signature sprite');hashes.add(initial);
  await (await page.$(sprite)).screenshot({path:`${root}/${id}-selection.png`});
  if(id.includes('cat')||id.includes('dog')) {
   assert(await page.$('input[aria-label="Pet callsign"]'));
   assert(await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='RANDOMIZE').disabled));
  } else {
   // An actual different suit must change pixels; reset returns to canonical art.
   await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.includes('90s SYNTH WINDBREAKER')).click());
   await wait(100);assert.notEqual(await pixels(),initial,'Customization changes sprite');
   await clickText('RESET');assert.equal(await pixels(),initial,'Reset restores signature');
  }
  await page.setViewport({width:390,height:1000});
  await (await page.$(sprite)).screenshot({path:`${root}/${id}-selection-mobile.png`});
  await page.setViewport({width:1440,height:1050});
  console.log(`${id}: distinct default, deep link, customization/reset, mobile`);
 }
 // Saved legacy default upgrades without erasing a customized outfit.
 await page.evaluate(async()=>{
  const {CHARACTERS}=await import('/src/data/characters.ts');
  const {getAppearanceForCharacter}=await import('/src/utils/pixelSpriteCompositor.ts');
  const state=getAppearanceForCharacter(CHARACTERS.find(c=>c.id==='elsa'),'TEST');
  delete state.signatureCharacter;
  localStorage.setItem('focusverse_custom_appearance',JSON.stringify(state));
  localStorage.setItem('focusverse_appearance_owner','elsa');
 });
 await navigate('select?char=elsa');const migrated=await pixels();assert(hashes.has(migrated),'Legacy default upgraded');
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('focusverse_custom_appearance'));s.outfit='retro-arcade';localStorage.setItem('focusverse_custom_appearance',JSON.stringify(s))});
 await navigate('select?char=elsa');assert.notEqual(await pixels(),migrated,'Saved custom outfit preserved');
 await page.evaluate(()=>localStorage.clear());
 for(const id of ['officer-k','moana']) {
  await navigate(`timer?char=${id}`);await page.waitForSelector('.queens-stage');
  const capture=async name=>{
   const stage=await page.$('.queens-stage');await stage.screenshot({path:`${root}/${id}-${name}-scene.png`});
   const r=await stage.boundingBox();
   await page.screenshot({path:`${root}/${id}-${name}-detail.png`,clip:{x:r.x+r.width*.35,y:r.y+r.height*.14,width:r.width*.41,height:r.height*.78}});
  };
  await capture('idle');
  const buttons=await page.$$('.room-activity-options button');
  for(let i=1;i<Math.min(3,buttons.length);i++){await buttons[i].click();await wait(1250);await capture(`action${i}`)}
  await page.setViewport({width:390,height:1000});await (await page.$('.queens-stage')).screenshot({path:`${root}/${id}-mobile.png`});
  await page.setViewport({width:1440,height:1050});
  console.log(`${id}: idle, both actions, mobile captured`);
 }
 assert.deepEqual(errors,[]);
 writeFileSync(`${root}/validation.json`,JSON.stringify({passed:true,errors,distinctDefaults:hashes.size,checks:['deep links','customization','reset','legacy default migration','saved custom loadout','desktop/mobile','two room actions']},null,2));
 console.log('Character accuracy regression checks passed.');
} finally {await browser.close()}
