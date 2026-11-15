import puppeteer from 'puppeteer-core';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const root='.court/natural-character-art/'+(process.argv[2]||'after');mkdirSync(root,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try{for(const id of (process.argv[3]?.split(',') || ['elsa','rapunzel','tony-stark','cozy-study-girl','late-night-study-boy','peter-parker','moana','gwen-stacy'])){
 await page.setViewport({width:1440,height:1050});await page.goto('about:blank');await page.goto(`http://127.0.0.1:5173/#timer?char=${id}`,{waitUntil:'networkidle0'});await page.waitForSelector('.queens-stage');
 // Freeze decorative CSS only; articulated pose state still follows controls.
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important}'});
 const capture=async name=>{const stage=await page.$('.queens-stage');await stage.screenshot({path:`${root}/${id}-${name}.png`});const r=await stage.boundingBox();await page.screenshot({path:`${root}/${id}-${name}-detail.png`,clip:{x:r.x+r.width*.35,y:r.y+r.height*.14,width:r.width*.41,height:r.height*.78}})};
 await capture('idle');const controls=await page.$$('.room-activity-options button');assert(controls.length>=3);
 for(let i=1;i<3;i++){await controls[i].click();await wait(1350);await capture(`action${i}`)}
 const invalid=await page.$$eval('svg path',paths=>paths.some(p=>/NaN|Infinity/.test(p.getAttribute('d')||'')));assert(!invalid,`${id}: finite geometry`);
 await page.setViewport({width:390,height:1000});await (await page.$('.queens-stage')).screenshot({path:`${root}/${id}-mobile.png`});
 console.log(id+': idle, two actions, mobile');
}assert.deepEqual(errors,[]);writeFileSync(`${root}/validation.json`,JSON.stringify({passed:true,browserErrors:errors},null,2));}finally{await browser.close()}
