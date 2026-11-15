import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const page=await browser.newPage();
 await page.evaluateOnNewDocument(()=>{
  window.loads=[];
  const tracks=['first','second','third'].map(videoId=>({id:videoId,videoId,title:videoId,channel:'Test',thumbnail:'',category:'Test'}));
  localStorage.setItem('focusverse_yt_favorites',JSON.stringify(tracks));
  localStorage.setItem('focusverse_yt_queue','[]');
  window.YT={Player:class {
   constructor(id,options){this.options=options;window.mockPlayer=this;}
   setVolume(){} mute(){} destroy(){} cueVideoById(){}
   loadVideoById(id){window.loads.push(id);}
   playVideo(){this.options.events.onStateChange({data:1});}
   pauseVideo(){this.options.events.onStateChange({data:2});}
   getCurrentTime(){return 0;} getDuration(){return 180;}
  }};
 });
 await page.goto('http://localhost:5173/#workspace?char=gwen-stacy',{waitUntil:'networkidle0'});
 await page.click('[data-feature="music"]');
 await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.includes('LIKED (')).click());
 await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='PLAY ALL').click());
 assert.deepEqual(await page.evaluate(()=>window.loads),[],'Click before ready must wait');
 await page.evaluate(()=>window.mockPlayer.options.events.onReady({target:window.mockPlayer}));
 await page.waitForFunction(()=>window.loads.length===1);
 assert.deepEqual(await page.evaluate(()=>window.loads),['first']);
 await page.evaluate(()=>window.mockPlayer.options.events.onError({data:150}));
 await page.waitForFunction(()=>window.loads.length===2,{timeout:1000});
 await page.evaluate(()=>window.mockPlayer.options.events.onError({data:100}));
 await page.waitForFunction(()=>window.loads.length===3,{timeout:1000});
 await page.evaluate(()=>window.mockPlayer.options.events.onError({data:150}));
 await page.waitForFunction(()=>document.body.innerText.includes('Choose another track or a room soundscape.'));
 assert.deepEqual(await page.evaluate(()=>window.loads),['first','second','third'],'No duplicate loads or retry loop');
 assert.equal(await page.$eval('.dock-play',e=>e.title),'Play');
 assert.equal(await page.evaluate(()=>document.body.innerText.includes('BUFFERING STREAM')),false);
 console.log('PASS: early play survives readiness, each track loads once, restricted tracks skip immediately using current queue, exhausted queue stops.');
} finally {await browser.close();}
