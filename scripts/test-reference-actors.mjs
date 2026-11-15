import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const out='docs/character-refinement';mkdirSync(out,{recursive:true});
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();await page.setCacheEnabled(false);const errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Failed to load resource'))errors.push(m.text())});
page.on('response',r=>{if(r.status()>=400&&r.url().includes('localhost:5173'))errors.push(`${r.status()} ${r.url()}`)});
await page.evaluateOnNewDocument(()=>{
 const nativeSet=window.setInterval.bind(window),nativeClear=window.clearInterval.bind(window);window.__intervals=new Map();
 window.setInterval=(fn,ms,...args)=>{const id=nativeSet(fn,ms,...args);window.__intervals.set(id,ms);return id};
 window.clearInterval=id=>{window.__intervals.delete(id);nativeClear(id)};
});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const clickText=async (selector,text)=>{const found=await page.$$(selector);for(const el of found){if((await el.evaluate(e=>e.textContent)).trim()===text){await el.click();return}}throw Error(`Missing ${text}`)};
try {
 for(const [id,poses] of [
  ['peter-parker',['Tinker','Sketch','Code','Read','Write','Think']],
  ['bruce-wayne',['Sweep Gotham sonar','Calibrate grapnel']],
  ['naruto-uzumaki',['Trace a sealing scroll','Gather a Rasengan']],
 ]) {
  await page.goto('about:blank');
  await page.setViewport({width:1440,height:1050});
  await page.goto(`http://localhost:5173/#timer?char=${id}`,{waitUntil:'networkidle0'});
  await page.waitForSelector(id==='peter-parker'?'.seated-spider':'.reference-actor');
  for(const [index,label] of poses.entries()) {
   await clickText('.room-activity-options button',label);await pause(1300);
   assert.equal(await page.$$eval(id==='peter-parker'?'[data-hand]':'.reference-actor [data-joint]',es=>es.length),2,'Two arms');
   const actor=await page.$(id==='peter-parker'?'.seated-spider.layer-body':'.reference-actor[data-rig-layer="body"]');
   const transform=await actor.evaluate(e=>e.getAttribute('transform')||e.firstElementChild.getAttribute('transform'));
   await pause(150);assert.equal(await actor.evaluate(e=>e.getAttribute('transform')||e.firstElementChild.getAttribute('transform')),transform,'Root anchor remains fixed');
   await (await page.$('.queens-stage')).screenshot({path:`${out}/${id}-${index}.png`});
   const stage=await page.$eval('.queens-stage',e=>{const r=e.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}});
   await page.screenshot({path:`${out}/${id}-${index}-detail.png`,clip:{x:stage.x+stage.w*.43,y:stage.y+stage.h*.33,width:stage.w*.28,height:stage.h*.55}});
  }
  for(const mode of ['POMODORO','STOPWATCH','COUNTDOWN']) {
   await clickText('.timer-panel button',mode);await clickText('.timer-panel button','LOCK IN ▶');await pause(150);
   assert(await page.$eval('.timer-display',e=>e.textContent.includes('RUNNING')));
   await clickText('.timer-panel button','PAUSE TIMER');const value=await page.$eval('.timer-display > .font-pixel',e=>e.textContent);
   await pause(150);assert.equal(await page.$eval('.timer-display > .font-pixel',e=>e.textContent),value);
   await clickText('.timer-panel button','LOCK IN ▶');await page.click('[title="Reset timer"]');
  }
  await clickText('.timer-panel button','POMODORO');await clickText('.timer-panel button','REST (5M)');
  assert(await page.$eval('.timer-display',e=>e.textContent.includes('05:00')));
  await clickText('.timer-panel button','FOCUS (25M)');
  for(const [feature,selector] of [['notes',id==='peter-parker'?'.object-notebook':'.sanctuary-object[data-feature="notes"]'],['tasks',id==='peter-parker'?'.object-board':'.sanctuary-object[data-feature="tasks"]']]) {
   await page.$eval(selector,e=>e.focus());await page.keyboard.press('Enter');await page.waitForSelector('dialog[open]');await page.keyboard.press('Escape');await pause(350);
  }
  await clickText('.room-shortcuts button','Music');await page.waitForSelector('[aria-label="Computer music player"]',{visible:true});await page.keyboard.press('Escape');await pause(350);
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await pause(100);
  assert.equal(await page.$eval(id==='peter-parker'?'.spider-head':'.reference-head',e=>getComputedStyle(e).animationName),'none');
  assert(!(await page.evaluate(()=>[...window.__intervals.values()].some(ms=>ms===100||ms===24000||ms===28000))),'No character intervals in reduced motion');
  for(const width of [768,390]) {
   await page.setViewport({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await (await page.$('.spider-study-room')).screenshot({path:`${out}/${id}-${width}.png`});
  }
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await pause(150);
  assert(!(await page.evaluate(()=>[...window.__intervals.values()].some(ms=>ms===100||ms===24000||ms===28000))),'No character intervals while hidden');
  assert.equal(await page.$eval(id==='peter-parker'?'.spider-head':'.reference-head',e=>getComputedStyle(e).animationPlayState),'paused');
  results.push({id,poses,checks:['fixed anchors','two articulated arms','timer modes and pause/resume/reset','rest','keyboard notes/tasks','music','reduced motion','hidden cleanup','768/390px overflow']});
 }
 assert.deepEqual(errors,[]);
 writeFileSync(`${out}/verification.json`,JSON.stringify({results,errors},null,2));console.log('PASS',results.map(r=>r.id).join(', '));
} finally {await browser.close()}
