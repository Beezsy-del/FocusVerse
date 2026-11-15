import React from 'react';
import {SpiderIdentityPortrait} from './SpiderIdentityPortrait';
import {HumanPortrait} from './HumanPortrait';
import {SanctuaryDesign} from '../data/sanctuaries';
/** Portrait masters are drawn in three-quarter view, not recolored stock faces. */
export function IllustratedPortrait({id,d,appearance='masked'}:{id:string;d:SanctuaryDesign;appearance?:'masked'|'unmasked'}){
 if(appearance==='unmasked'&&['miles-morales','gwen-stacy'].includes(id))return <SpiderIdentityPortrait id={id}/>;
 if(id==='miles-morales')return <g stroke="#171923" strokeWidth="1.05">
 <path d="M-11 39L-12 62Q0 68 12 61L10 39" fill="#20232d"/>
 <path d="M-23 8C-24-7-14-15 0-15C16-15 26-5 26 10C26 29 18 43 5 48C-8 47-21 32-23 8Z" fill="#222631"/>
 <path d="M14-10C26 0 26 19 17 33L5 48Q21 43 26 25Q33 0 14-10" fill="#131822" stroke="none"/>
 <path d="M-18 1Q-16-7-5-10M-21 9L-19 22" stroke="#65717d" fill="none" opacity=".55"/>
 <g stroke="#a33c49" strokeWidth=".7" fill="none"><path d="M0-14L-3 2L0 18L2 34L5 47M-13-10L-13 6L-10 26L-4 42M14-9L10 7L12 28L12 43M-23 7Q-1 17 26 5M-21 20Q0 30 25 17M-15 34Q5 41 20 31M-17-5Q0 2 20-5"/></g>
 <path d="M-21 9C-15 10-8 13-2 19C-2 29-7 33-12 29C-18 25-21 18-21 9ZM3 19C9 12 17 8 25 7C25 18 21 28 12 31C6 33 3 27 3 19Z" fill="#faf6e9" stroke="#cb3848" strokeWidth="2.4"/>
 <path d="M-18 12Q-12 13-6 20M8 20Q15 13 21 12" fill="none" stroke="#fffefa" strokeWidth="1.1"/>
 </g>;
 if(id==='gwen-stacy')return <g stroke="#282734" strokeWidth="1.05">
 <path d="M-9 37L-11 62Q0 69 12 62L10 38" fill="#e9e8e5"/>
 <path d="M-26 45C-36 30-36 8-25-9Q-16-23 0-27Q21-22 31-5C40 12 34 35 22 49L10 41L-9 42Z" fill="#f0efeb"/>
 <path d="M-23 35C-30 15-28-4-12-12Q3-22 18-9C32 7 29 29 18 42L-10 40Z" fill="#da79ab"/>
 <g stroke="#65a6b7" fill="none" strokeWidth=".85"><path d="M-24-2L-14 3M-28 9L-14 15M-27 22L-13 27M21-4L14 4M27 8L17 15M25 23L14 28M-15-11L-23 33M16-10L23 34M-27 9Q-21 6-16 7M18 9Q23 6 26 9"/></g>
 <path d="M20-16C35 2 35 22 24 41L19 46L26 43C39 24 39 4 27-9Z" fill="#b6c4cf" stroke="none"/>
 <path d="M-19 7C-19-5-11-12 1-12C14-12 22-3 22 11Q22 30 7 43Q2 47-3 42C-15 33-19 20-19 7Z" fill="#faf7ef"/>
 <path d="M16-4Q25 13 13 32L3 45Q18 36 22 20Q26 6 16-4Z" fill="#cfdae0" stroke="none"/>
 <path d="M-17 12Q-9 14-2 21C-2 29-6 32-11 28Q-16 23-17 12ZM4 21Q11 14 20 11C20 22 16 29 10 30Q4 30 4 21Z" fill="#fafdf7" stroke="#262635" strokeWidth="2.3"/>
 <path d="M-18 12Q-10 13-2 20M4 20Q11 13 21 10" stroke="#bc5289" strokeWidth="1" fill="none"/>
 <path d="M-27-5Q-18-19-3-24M-31 3Q-35 22-28 33" fill="none" stroke="#fffdf5" strokeWidth="1.5"/>
 </g>;
 if(id==='l-lawliet')return <g stroke="#30313c" strokeWidth="1.1">
 <path d="M-10 37L-15 63L10 67L11 36" fill="#dbc3b3"/><path d="M-7 43L7 48L7 57L-11 53" fill="#a8918b" stroke="none"/>
 <path d="M-20 7Q-19-9 1-8Q19-7 23 10L20 30L9 44L0 48L-13 41L-22 26Z" fill="#e1cbbc"/>
 <path d="M14 5L21 14L16 31L6 42L0 48L11 42L21 28Z" fill="#b29b91" stroke="none"/>
 <path d="M-20 19Q-12 11-4 21Q-10 33-19 25ZM4 21Q12 13 19 20Q14 32 5 27Z" fill="#ecebe2" stroke="#746e77"/>
 <g className="illustrated-eyes" style={{transformOrigin:'0px 23px'}}><ellipse cx="-11" cy="23" rx="2.8" ry="3.7" fill="#262e3b"/><ellipse cx="11" cy="23" rx="2.6" ry="3.5" fill="#262e3b"/></g>
 <path d="M-20 28Q-12 35-4 29M5 30Q13 35 20 26" fill="none" stroke="#8e8188" strokeWidth="1.5"/>
 <path d="M1 25L-3 33L1 34M-6 39L4 40" fill="none" stroke="#9c7c72" strokeWidth=".8"/>
 <path d="M-22 31Q-31 20-27 9L-33 12Q-33-1-23-8L-28-10Q-19-18-10-16Q-7-25 4-22L2-17Q16-24 25-15L21-10Q34-10 30 1L27 6L33 10L24 19L22 33Q17 27 14 13Q11 25 4 30L3 16Q-1 27-10 34L-9 16Q-15 31-22 35Z" fill="#252b39"/>
 <g fill="none" stroke="#586273" strokeWidth=".8"><path d="M-22 7L-15-6L-13 8M-5-12L-1 3M11-12L13 4M23-3L20 10M-21 21L-17 10"/></g>
 </g>;
 if(id==='tony-stark')return <g stroke="#442d36" strokeWidth="1.2">
 <path d="M-13 43L-15 64L0 70L16 61L12 40" fill="#76353d"/><path d="M-10 51L1 56L12 49M-10 57L0 62L12 55" stroke="#bb8065" fill="none"/>
 <path d="M-23 7Q-24-5-10-9Q7-14 21-3L28 9L26 35L14 52L-2 56L-18 46L-25 29Z" fill="#a44943"/>
 <path d="M12-7Q29 0 27 20L21 40L12 50L18 48L28 34L30 13Q27-2 12-7Z" fill="#6e333a" stroke="none"/>
 <path d="M-18 6L-8 10L8 8L21 3L22 19L17 28L17 40L7 48L-5 47L-17 35L-17 24L-21 17Z" fill="#ccaa68"/>
 <path d="M-18 6L-12 11L-12 23L-6 29L-7 40L-2 46L-6 46L-17 35L-17 24L-21 17Z" fill="#9a784b" stroke="none"/>
 <path d="M10 10L20 6L20 18L14 26L13 39L7 44L13 44L18 38L18 27L23 19Z" fill="#e1bd7e" stroke="none"/>
 <path d="M-20 17L-6 21L-7 26L-18 22ZM2 21L21 15L18 22L4 26Z" fill="#c3f1e5" stroke="#527681" strokeWidth="1"/>
 <path d="M-19 14L-5 18M2 18L21 12M-8-6L-9 6M12-5L12 5M-17 36L-6 43L6 44L15 37M-8 35L6 36M-2 24L-5 31L4 31" stroke="#765741" fill="none" strokeWidth="1"/>
 <path d="M-19 1Q-9-8 4-8M-22 9V26M24 5L25 16" stroke="#dc9373" fill="none" strokeWidth="1"/>
 <path d="M-24 25L-21 27V36L-18 40M25 24L22 29V38" stroke="#292e3c" fill="none" strokeWidth="2"/>
 </g>;
 return <HumanPortrait id={id} d={d}/>;
}
