import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
const root='.court/product-focus';mkdirSync(root,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const click=async text=>{assert(await page.evaluate(text=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===text);b?.click();return !!b},text),`button: ${text}`);await wait(100)};
const clock=()=>page.$eval('.focus-clock',e=>e.textContent);
const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('focusverse_focus_v1')));
try{
 await page.setViewport({width:1440,height:1000});await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle0'});
 await page.evaluate(()=>{localStorage.clear();localStorage.setItem('focusverse_custom_appearance','{"keep":"me"}');localStorage.setItem('focusverse_tasks','[{"keep":"me"}]')});await page.reload({waitUntil:'networkidle0'});
 assert.equal((await page.$$('.focus-room-card')).length,4);
 await page.screenshot({path:`${root}/home-desktop.png`,fullPage:true});
 assert(!/flashcards|XP Earned|SUIT CUSTOMIZATION|DEMO ROOM|DASHBOARD/i.test(await page.$eval('body',e=>e.innerText)));
 await click('Your sessions');assert((await page.$eval('main',e=>e.innerText)).includes('Your first session belongs here.'));
 await click('Choose a room');await page.click('[data-testid="room-gwen-stacy"]');await page.waitForSelector('.queens-stage');
 assert(await page.$eval('.focus-primary',e=>e.disabled),'Intention required');
 await page.type('#intention','Finish the first chapter');await click('15 min');assert.equal(await clock(),'15:00');
 await page.screenshot({path:`${root}/room-desktop.png`,fullPage:true});
 await click('Begin focus');await page.waitForFunction(()=>document.querySelector('.focus-clock')?.textContent!=='15:00',{timeout:5000});assert.notEqual(await clock(),'15:00');
 const id=(await saved()).session.id;
 const second=await browser.newPage();await second.goto('http://127.0.0.1:5173/#session',{waitUntil:'networkidle0'});
 await click('Pause session');await wait(200);
 assert.equal(await second.evaluate(()=>JSON.parse(localStorage.getItem('focusverse_focus_v1')).session.status),'paused');
 assert((await second.$eval('.focus-controls',e=>e.innerText)).includes('Resume session'));
 await second.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent==='Resume session').click());await wait(200);
 assert((await page.$eval('.focus-controls',e=>e.innerText)).includes('Pause session'),'Other tab resumes the same timer');await second.close();
 await click('Your sessions');await page.reload({waitUntil:'networkidle0'});assert.equal((await saved()).session.id,id);
 await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.startsWith('Return to session')).click());await wait(100);
 assert(await page.$eval('#intention',e=>e.disabled));
 await click('Pause session');const paused=await clock();await wait(1100);assert.equal(await clock(),paused);
 await page.reload({waitUntil:'networkidle0'});assert.equal(await clock(),paused,'Paused timer survives reload');
 await click('Rooms');assert((await page.$$('.focus-room-card:disabled')).length===4,'No changing companion mid-session');
 await page.goBack({waitUntil:'networkidle0'});assert(await page.$('.focus-clock'),'Browser Back restores room');
 await click('Resume session');
 // Advance the clock, preserving all timer code and the running deadline.
 await page.evaluate(()=>{const realNow=Date.now;Date.now=()=>realNow()+16*60000});await wait(400);
 assert(await page.$('#reflection'),'Completion screen shown');assert.equal((await saved()).records.length,1);
 assert.equal((await saved()).records[0].intention,'Finish the first chapter');
 await page.type('#reflection','Read chapter one and wrote a short summary.');await wait(100);
 await page.screenshot({path:`${root}/complete-desktop.png`,fullPage:true});
 await page.reload({waitUntil:'networkidle0'});assert.equal((await saved()).records.length,1,'Completion is not duplicated on reload');assert((await page.$eval('#reflection',e=>e.value)).startsWith('Read chapter'));
 await click('View your sessions');await page.screenshot({path:`${root}/history-desktop.png`,fullPage:true});
 assert((await page.$eval('main',e=>e.innerText)).includes('15 minutes of focus'));
 await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.startsWith('Return to session')).click());await wait(100);await click('Another session');
 await page.type('#intention','A session to stop early');await click('Begin focus');await click('End session early');await click('Keep going');assert.equal((await saved()).session.status,'running');await click('End session early');await click('End session');assert.equal((await saved()).records.length,1,'Abandoned sessions earn no record');
 assert.equal(await page.evaluate(()=>localStorage.getItem('focusverse_custom_appearance')),'{"keep":"me"}','Legacy data remains');
 for(const companion of ['peter-parker','gwen-stacy','naruto-uzumaki','purring-window-cat']){
  await click('Rooms');await page.click(`[data-testid="room-${companion}"]`);await page.waitForSelector('.queens-stage');await wait(200);
  await page.addStyleTag({content:'*,*::before,*::after{animation:none!important}'});
  await (await page.$('.queens-stage')).screenshot({path:`${root}/${companion}-room.png`});
 }
 await page.setViewport({width:390,height:844});await page.screenshot({path:`${root}/room-mobile.png`,fullPage:true});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
 await click('Rooms');await page.screenshot({path:`${root}/home-mobile.png`,fullPage:true});
 await page.goto('http://127.0.0.1:5173/#rooms',{waitUntil:'networkidle0'});assert.equal((await page.$$('.focus-room-card')).length,4,'Old feature routes fall back to chooser');
 // First launch imports real older completions, including retired companions.
 await page.evaluate(()=>{localStorage.removeItem('focusverse_focus_v1');localStorage.setItem('focusverse_sessions',JSON.stringify([{id:'old-session',completed:true,tutorId:'elsa',taskTitle:'Old essay',durationMinutes:40,timestamp:Date.now()-3600000,notes:'Kept my work'}]))});
 await page.reload({waitUntil:'networkidle0'});await click('Your sessions');
 assert((await page.$eval('main',e=>e.innerText)).includes('Old essay'));assert((await page.$eval('main',e=>e.innerText)).includes('Elsa'));assert.equal((await saved()).records.length,1);
 await page.reload({waitUntil:'networkidle0'});assert.equal((await saved()).records.length,1,'Migration runs once');
 // Returning after a deadline must finish exactly once, even without a live tab.
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('focusverse_focus_v1'));s.session={id:'expired',companion:'peter-parker',intention:'Offline completion',minutes:25,status:'running',remainingMs:1500000,deadline:Date.now()-1000};localStorage.setItem('focusverse_focus_v1',JSON.stringify(s))});
 await page.reload({waitUntil:'networkidle0'});assert.equal((await saved()).records.length,2);assert.equal((await saved()).session.status,'complete');
 await page.reload({waitUntil:'networkidle0'});assert.equal((await saved()).records.length,2);
 assert.deepEqual(errors,[]);console.log('PASS: four rooms, intention, presets, countdown, navigation, refresh, pause, history, single completion, reflection, early end, legacy data, mobile, old routes.');
}finally{await browser.close()}
