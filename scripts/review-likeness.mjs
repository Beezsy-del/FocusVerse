import puppeteer from 'puppeteer-core';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const base='http://localhost:5173',out='docs/likeness-correction/after';mkdirSync(out,{recursive:true});
const variants=[['miles-morales','masked'],['miles-morales','unmasked'],['gwen-stacy','masked'],['gwen-stacy','unmasked'],...['elsa','rapunzel','moana','neo','officer-k'].map(id=>[id,'default'])];
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),p=await browser.newPage(),errors=[],results=[];
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.url())});
await p.evaluateOnNewDocument(()=>{const set=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window);window.__actorTimeouts=new Map();window.setTimeout=(fn,ms,...args)=>{const owned=new Error().stack.includes('useCompanionPerformance');let id;id=set(()=>{window.__actorTimeouts.delete(id);fn(...args)},ms);if(owned)window.__actorTimeouts.set(id,fn);return id};window.clearTimeout=id=>{window.__actorTimeouts.delete(id);clear(id)}});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function capture(name){
 await (await p.$('.queens-stage')).screenshot({path:`${out}/${name}-scene.png`});
 const bounds=await p.$eval('.queens-stage',e=>{const r=e.getBoundingClientRect();return{x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}});
 await p.screenshot({path:`${out}/${name}.png`,clip:{x:bounds.x+bounds.w*.36,y:bounds.y+bounds.h*.19,width:bounds.w*.39,height:bounds.h*.73}});
}
try{for(const [id,look] of variants.filter(([id])=>!process.argv[2]||process.argv[2].split(',').includes(id))){
 await p.goto('about:blank');await p.setViewport({width:1440,height:1050});await p.goto(`${base}/#timer?char=${id}`,{waitUntil:'networkidle0'});
 if(look!=='default')await p.click(`.sanctuary-appearance button:nth-of-type(${look==='masked'?1:2})`);
 await wait(100);await capture(`${id}-${look}-idle`);
 const face=await p.$eval('[data-actor] .illustrated-head',e=>{const m=e.getScreenCTM();const a=new DOMPoint(-39,-36).matrixTransform(m),b=new DOMPoint(39,58).matrixTransform(m);return{x:Math.min(a.x,b.x)+scrollX-10,y:Math.min(a.y,b.y)+scrollY-10,width:Math.abs(b.x-a.x)+20,height:Math.abs(b.y-a.y)+20}});
 await p.screenshot({path:`${out}/${id}-${look}-face.png`,clip:face});
 await p.evaluate(()=>{const [id,fn]=[...window.__actorTimeouts.entries()][0];clearTimeout(id);fn()});await wait(1250);assert.equal(await p.$eval('[data-sanctuary]',e=>e.dataset.phase),'observe');await capture(`${id}-${look}-observe`);
 for(let i=0;i<2;i++){await p.click(`.sanctuary-actions button:nth-child(${i+2})`);await wait(1250);await capture(`${id}-${look}-action${i}`);}
 if(look!=='default'){
  await p.reload({waitUntil:'networkidle0'});assert.equal(await p.$eval('[data-sanctuary]',e=>e.dataset.appearance),look);
  assert.equal(await p.$eval('.sanctuary-appearance [aria-pressed="true"]',e=>e.textContent),look==='masked'?'Masked':'Unmasked');
 }
 for(const width of [768,390]){await p.setViewport({width,height:1000});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await (await p.$('.spider-study-room')).screenshot({path:`${out}/${id}-${look}-mobile.png`});
 results.push({id,look,checks:['idle','observe','both actions','face close-up','normal-size scene','768/390px overflow',...(look==='default'?[]:['preference persisted on reload'])]});console.log('PASS',id,look);
}assert.deepEqual(errors,[]);const file='docs/likeness-correction/verification.json';const previous=existsSync(file)?JSON.parse(readFileSync(file)).results:[];writeFileSync(file,JSON.stringify({results:[...previous.filter(r=>!results.some(n=>n.id===r.id&&n.look===r.look)),...results],errors},null,2));}finally{await browser.close()}
