import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),p=await b.newPage(),errors=[];
p.on('pageerror',e=>errors.push(e.message));await p.setViewport({width:1440,height:1050});
const look=()=>p.$eval('[data-sanctuary]',e=>e.dataset.appearance);
try{
 await p.goto('http://localhost:5173/#timer?char=miles-morales',{waitUntil:'networkidle0'});
 await p.$eval('.sanctuary-appearance button:last-child',e=>e.focus());await p.keyboard.press('Enter');assert.equal(await look(),'unmasked');
 await p.click('.sanctuary-actions button:nth-child(2)');await p.waitForFunction(()=>document.querySelector('[data-sanctuary]').dataset.phase==='action');
 await p.click('.sanctuary-appearance button:first-of-type');assert.equal(await look(),'masked');assert.equal(await p.$eval('[data-sanctuary]',e=>e.dataset.action),'0');
 await p.click('.sanctuary-appearance button:last-child');
 await p.click('.timer-panel button::-p-text(LOCK IN)');
 await p.select('select','gwen-stacy');await p.waitForSelector('[data-sanctuary="gwen-stacy"]');await p.click('.sanctuary-appearance button:first-of-type');assert.equal(await look(),'masked');
 await p.select('select','miles-morales');await p.waitForSelector('[data-sanctuary="miles-morales"]');assert.equal(await look(),'unmasked');assert(await p.$('.timer-panel button::-p-text(PAUSE TIMER)'));
 await p.click('.timer-panel button::-p-text(PAUSE TIMER)');
 await p.reload({waitUntil:'networkidle0'});assert.equal(await look(),'unmasked');
 await p.select('select','gwen-stacy');await p.waitForSelector('[data-sanctuary="gwen-stacy"]');assert.equal(await look(),'masked');
 await p.select('select','elsa');await p.waitForSelector('[data-sanctuary="elsa"]');assert.equal(await p.$('.sanctuary-appearance'),null);
 assert.deepEqual(errors,[]);writeFileSync('docs/likeness-correction/appearance-checks.json',JSON.stringify({passed:['keyboard appearance selection','manual action retained','independent preferences','reload persistence','timer remains running through trainer/appearance changes','no appearance controls on unrelated characters'],errors},null,2));console.log('PASS independent appearance preferences, keyboard, persistence, timer continuity');
}finally{await b.close()}
