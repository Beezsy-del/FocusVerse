import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const ids=[...new Set(JSON.parse(readFileSync('public/assets/characters/illustrated-study-rigs/manifest.json')).map(x=>x.id))];
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const p=await browser.newPage();await p.setCacheEnabled(false);const errors=[],results=[];
p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Failed to load resource'))errors.push(m.text())});
await p.evaluateOnNewDocument(()=>{const set=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window);window.__timeouts=new Map();window.setTimeout=(fn,ms,...args)=>{const owned=new Error().stack.includes('useCompanionPerformance');let id;id=set(()=>{window.__timeouts.delete(id);fn(...args)},ms);if(owned)window.__timeouts.set(id,{ms,fn});return id};window.clearTimeout=id=>{window.__timeouts.delete(id);clear(id)}});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const click=async(text)=>{for(const el of await p.$$('.timer-panel button')){if((await el.evaluate(e=>e.textContent)).trim()===text){await el.click();return}}throw Error(`Missing ${text}`)};
try{for(const id of ids){
 await p.goto('about:blank');await p.setViewport({width:1280,height:1000});await p.goto(`http://localhost:5173/#timer?char=${id}`,{waitUntil:'networkidle0'});
 const actor='.illustrated-actor[data-actor]';await p.waitForSelector(actor);
 const bounds=await p.$eval(actor,e=>{const b=e.getBBox();return{anchor:e.getAttribute('transform'),localBounds:{x:b.x,y:b.y,width:b.width,height:b.height}}});
 const before=await p.$eval('.spider-study-room',e=>e.getAttribute('data-activity')||e.getAttribute('data-action'));
 for(const phase of ['observe','action','settle','idle','observe','action']){
  await p.evaluate(()=>{const entry=[...window.__timeouts.entries()][0];if(!entry)throw Error('Missing companion scheduler');const [id,{fn}]=entry;clearTimeout(id);fn()});await pause(80);
  assert.equal(await p.$eval('.spider-study-room',e=>e.dataset.phase),phase);
 }
 await pause(1200);
 const after=await p.$eval('.spider-study-room',e=>e.getAttribute('data-activity')||e.getAttribute('data-action'));assert.notEqual(before,after,'Automatic alternate action');
 assert.equal(await p.$eval(actor,e=>e.getAttribute('transform')),bounds.anchor,'Stable root through animation');
 for(const mode of ['POMODORO','STOPWATCH','COUNTDOWN']){
  await click(mode);await click('LOCK IN ▶');await pause(100);assert(await p.$eval('.timer-display',e=>e.textContent.includes('RUNNING')));
  await click('PAUSE TIMER');const time=await p.$eval('.timer-display > .font-pixel',e=>e.textContent);await pause(150);assert.equal(await p.$eval('.timer-display > .font-pixel',e=>e.textContent),time);
  await click('LOCK IN ▶');await p.click('[title="Reset timer"]');
 }
 await click('POMODORO');await click('REST (5M)');assert(await p.$eval('.timer-display',e=>e.textContent.includes('05:00')));await click('FOCUS (25M)');
 const flags=await p.$$eval('.timer-panel button',es=>es.map(e=>e.textContent.trim()));
 const distraction=flags.find(x=>x.includes('+1'));
 if(distraction)await click(distraction);
 assert(await p.$('.timer-panel select'),'Task linking retained');
 const features=id==='tony-stark'?['.stark-notebook','.object-board','.object-computer']:['.sanctuary-object[data-feature="notes"]','.sanctuary-object[data-feature="tasks"]','.sanctuary-object[data-feature="music"]'];
 for(const [i,sel] of features.entries()){await p.$eval(sel,e=>e.focus());await p.keyboard.press('Enter');await p.waitForSelector(i===2?'[aria-label="Computer music player"]':'dialog[open]',{visible:true});await p.keyboard.press('Escape');await pause(350)}
 await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await pause(100);
 assert(!(await p.evaluate(()=>window.__timeouts.size>0)),'Reduced motion stops character scheduler');
 const motion='.illustrated-head';assert.equal(await p.$eval(motion,e=>getComputedStyle(e).animationName),'none');
 await p.setViewport({width:768,height:1000});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await pause(100);
 assert(!(await p.evaluate(()=>window.__timeouts.size>0)),'Hidden page stops character scheduler');
 assert.equal(await p.$eval(motion,e=>getComputedStyle(e).animationPlayState),'paused');
 results.push({id,...bounds,checks:['alternate automatic pose','fixed anchor','three timer modes','pause/resume/reset','rest/focus','task selector','keyboard prop interactions','music','768px overflow','reduced motion','visibility cleanup']});console.log('PASS',id);
}assert.deepEqual(errors,[]);writeFileSync('docs/roster-overhaul/regression.json',JSON.stringify({results,errors},null,2));}finally{await browser.close()}
