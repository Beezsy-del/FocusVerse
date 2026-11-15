import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true}),page=await browser.newPage();
await page.setViewport({width:1440,height:1000});
await page.evaluateOnNewDocument(()=>{const set=window.setTimeout.bind(window),clear=window.clearTimeout.bind(window);window.__companionTimers=new Set();window.setTimeout=(fn,ms,...args)=>{const owned=new Error().stack.includes('useCompanionPerformance');let id;id=set(()=>{window.__companionTimers.delete(id);fn(...args)},ms);if(owned)window.__companionTimers.add(id);return id};window.clearTimeout=id=>{window.__companionTimers.delete(id);clear(id)}});
const nav=async name=>{for(const b of await page.$$('header button')){if((await b.evaluate(e=>e.textContent)).trim()===name&&await b.isVisible()){await b.click();return}}throw Error('Missing '+name)};
try{
 await page.goto('http://localhost:5173/#timer?char=miles-morales',{waitUntil:'networkidle0'});
 await page.waitForFunction(()=>window.__companionTimers.size===1);
 await nav('Tasks & Planner');await page.waitForSelector('[placeholder="Search tasks by title or subject..."]');await page.waitForFunction(()=>window.__companionTimers.size===0);
 await nav('Study Timer');await page.waitForSelector('.illustrated-actor');await page.waitForFunction(()=>window.__companionTimers.size===1);
 await nav('Statistics');await page.waitForFunction(()=>window.__companionTimers.size===0);
 await nav('Study Timer');await page.waitForSelector('.illustrated-actor');assert.equal(await page.$eval('[data-actor]',e=>e.dataset.actor),'miles-morales');
 writeFileSync('docs/roster-overhaul/navigation-checks.json',JSON.stringify({passed:['planner navigation','statistics navigation','character restored on return','scheduler cleanup on unmount','single scheduler on remount']},null,2));
 console.log('PASS planner/statistics navigation and companion unmount/remount cleanup');
}finally{await browser.close()}
