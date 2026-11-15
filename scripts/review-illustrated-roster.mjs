import puppeteer from 'puppeteer-core';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const ids=(process.argv[3]||'tony-stark,miles-morales,gwen-stacy,gojo-satoru,levi-ackerman,l-lawliet,elsa,rapunzel,moana,hermione-granger,wednesday-addams,officer-k,neo,cozy-study-girl,late-night-study-boy,purring-window-cat,loyal-fireplace-dog').split(',');
const mode=process.argv[2]||'after',root=`docs/roster-overhaul/${mode}`;mkdirSync(root,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const p=await browser.newPage();await p.setCacheEnabled(false);const errors=[],results=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Failed to load resource'))errors.push(m.text())});
p.on('response',r=>{if(r.status()>=400&&r.url().includes('localhost:5173'))errors.push(`${r.status()} ${r.url()}`)});
try{for(const id of ids){
 await p.goto('about:blank');await p.setViewport({width:1440,height:1050});await p.goto(`http://localhost:5173/#timer?char=${id}`,{waitUntil:'networkidle0'});await p.waitForSelector('.queens-stage');
 await (await p.$('.queens-stage')).screenshot({path:`${root}/${id}-idle.png`});
 const buttons=await p.$$('.room-activity-options button');
 const poses=mode==='before'?1:Math.min(buttons.length-1,2);
 for(let i=0;i<poses;i++){
  await buttons[i+1].click();await new Promise(r=>setTimeout(r,1250));
  await (await p.$('.queens-stage')).screenshot({path:`${root}/${id}-${i}.png`});
  const box=await p.$eval('.queens-stage',e=>{const r=e.getBoundingClientRect();return{x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}});
  await p.screenshot({path:`${root}/${id}-${i}-detail.png`,clip:{x:box.x+box.w*.36,y:box.y+box.h*.22,width:box.w*.38,height:box.h*.70}});
 }
 if(mode!=='before'){
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(id!=='tony-stark')assert(await p.$('.illustrated-actor'),'No original actor fallback');
  for(const feature of ['notes','tasks']){await p.$eval(`.room-shortcuts button:nth-child(${feature==='notes'?2:3})`,e=>e.click());await p.waitForSelector('dialog[open]');await p.keyboard.press('Escape');await new Promise(r=>setTimeout(r,350));}
  await p.$eval('.room-shortcuts button:first-child',e=>e.click());await p.waitForSelector('[aria-label="Computer music player"]',{visible:true});await p.keyboard.press('Escape');
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  if(id!=='tony-stark')assert.equal(await p.$eval('.illustrated-head',e=>getComputedStyle(e).animationName),'none');
  await p.setViewport({width:390,height:1000});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await (await p.$('.spider-study-room')).screenshot({path:`${root}/${id}-mobile.png`});
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
 }
 results.push({id,poses});console.log('PASS',id);
}assert.deepEqual(errors,[]);const previous=existsSync(`${root}/verification.json`)?JSON.parse(readFileSync(`${root}/verification.json`)).results:[];writeFileSync(`${root}/verification.json`,JSON.stringify({results:[...previous.filter(r=>!ids.includes(r.id)),...results],errors},null,2));}finally{await browser.close()}
