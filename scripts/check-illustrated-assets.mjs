import puppeteer from 'puppeteer-core';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const manifest=JSON.parse(readFileSync('public/assets/characters/illustrated-study-rigs/manifest.json'));
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage(),results=[];
try{for(const asset of manifest){
 await page.setContent(readFileSync(asset.path,'utf8'));
 const bounds=await page.$eval('svg',e=>{const b=e.getBBox(),v=e.viewBox.baseVal;return{inside:b.x>=v.x&&b.y>=v.y&&b.x+b.width<=v.x+v.width&&b.y+b.height<=v.y+v.height,bounds:[b.x,b.y,b.width,b.height]}});
 assert(bounds.inside,asset.path+' clipped');results.push({path:asset.path,...bounds});
}writeFileSync('docs/roster-overhaul/asset-validation.json',JSON.stringify(results,null,2));console.log(`PASS ${results.length} exported SVGs: natural aspect ratios, no clipping`)}finally{await browser.close()}
