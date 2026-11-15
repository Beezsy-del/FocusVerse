import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
import {SpiderMask} from './SpiderManDesign';
const hairShapes:Record<string,string>={
 'gojo-satoru':'M-25 17L-31 3L-38-3L-29-9L-32-21L-20-17L-18-30L-8-23L0-37L8-25L20-32L20-19L32-23L28-10L39-8L29 3L24 18L17 4L8 12L2 1L-8 13L-15 5L-21 20Z',
 'levi-ackerman':'M-25 29Q-32 2-22-12Q-6-24 13-15Q31-13 27 15L23 30L17 11L10 4L-2 17L-12 29L-10 10L-22 32Z',
 'l-lawliet':'M-24 35L-31 21L-29 8L-35-1L-24-5L-27-15L-13-12L-8-26L3-19L16-27L18-13L30-16L28-4L36 4L27 14L26 32L18 19L11 9L3 30L0 13L-9 29L-12 14L-22 38Z',
 'elsa':'M-25 26Q-32 8-22-8Q-18-23 3-24Q26-24 29-3Q34 14 24 28L19 12L20 0Q-2 15-22 8Z',
 'rapunzel':'M-26 31Q-37 9-23-10Q-5-26 14-16Q32-12 29 15L24 35L18 10L13 0Q-6 15-23 10Z',
 'moana':'M-28 38Q-46 26-35 8Q-44-9-28-18Q-16-34 0-22Q17-35 28-20Q43-18 37 0Q47 15 34 31L26 43L21 16Q12 3 0 9Q-12 0-21 18Z',
 'hermione-granger':'M-28 36Q-43 25-34 9Q-42-7-29-17Q-17-29-3-22Q9-31 22-19Q39-18 33 1Q44 16 30 34L22 44L19 11L11 1Q-5 17-22 13Z',
 'wednesday-addams':'M-25 32Q-32 12-26-7Q-16-23 1-21Q23-22 29-2L26 35L19 25L19 5L10 8L4 5L-2 8L-9 5L-18 8L-19 27Z',
 'officer-k':'M-25 24Q-31 5-23-8Q-12-21 7-17Q25-16 28 0L24 24L17 11L16 0Q-1 8-17 4L-20 24Z',
 'neo':'M-26 26Q-30 7-24-8Q-15-21 4-18Q23-19 28-3L26 25L20 22L17 1Q0 9-17 1L-21 26Z',
 'cozy-study-girl':'M-27 35Q-37 7-26-12Q-16-27 4-22Q31-24 31 1L28 37L21 29L19 5L7 12L-3 2L-19 16L-21 35Z',
 'late-night-study-boy':'M-25 29Q-31 8-25-9L-15-12L-12-23L1-18L11-25L17-15Q32-12 29 9L24 30L19 12L10 5L1 16L-3 5L-15 20L-18 9Z',
};
// Individual jaw, cheek and eye shapes keep the shared ink treatment from
// turning different companions into the same face with a different hairstyle.
const faces:Record<string,string>={
 'elsa':'M-23 8Q-20-10 0-9Q21-8 24 9L21 28Q15 39 2 47Q-11 45-20 31Z',
 'rapunzel':'M-23 8Q-20-10 0-9Q22-8 24 9L22 28Q18 42 1 47Q-17 43-22 28Z',
 'moana':'M-24 8Q-20-10 0-9Q23-9 25 10L24 29Q17 47 0 48Q-18 45-24 29Z',
 'hermione-granger':'M-23 8Q-19-10 0-9Q21-9 24 9L21 28Q14 42 0 47Q-17 41-22 27Z',
 'wednesday-addams':'M-23 8Q-19-10 0-9Q20-9 23 9L20 31L9 44L0 48L-11 43L-21 30Z',
 'officer-k':'M-24 8Q-21-10 0-9Q21-10 24 9L23 31L14 45L1 49L-15 43L-24 29Z',
 'levi-ackerman':'M-24 8Q-21-10 0-9Q21-10 24 9L20 31L9 45L0 49L-12 42L-22 29Z',
 'l-lawliet':'M-24 8Q-21-10 0-9Q21-10 24 9L22 29L14 41L1 49L-14 42L-23 29Z',
};
const eyes:Record<string,string>={
 'elsa':'M-19 24Q-12 17-5 23Q-11 30-18 26ZM5 23Q13 17 19 23Q13 30 6 26Z',
 'rapunzel':'M-19 24Q-12 16-5 24Q-11 32-18 26ZM5 24Q12 16 19 24Q13 32 6 26Z',
 'moana':'M-19 24Q-12 18-5 24Q-12 30-18 26ZM5 24Q13 18 20 24Q13 30 6 26Z',
 'wednesday-addams':'M-18 23Q-12 21-6 23Q-12 29-18 25ZM6 23Q12 21 18 23Q12 29 6 25Z',
 'officer-k':'M-18 24L-12 21L-6 24L-11 27L-17 26ZM6 24L12 21L18 24L17 26L11 27Z',
 'levi-ackerman':'M-18 24L-6 23L-8 26H-16ZM6 23L18 24L16 26H8Z',
 'l-lawliet':'M-18 24Q-12 17-6 24Q-12 32-18 24ZM6 24Q12 17 18 24Q12 32 6 24Z',
};
export function RosterPortrait({id,d}:{id:string;d:SanctuaryDesign}) {
 if(id==='miles-morales')return <g className="roster-head" transform="translate(0 -5)"><path d="M-12 45V65H12V45" fill="#242b3c"/><g className="miles-mask" transform="translate(0 -1) scale(2.35)"><SpiderMask/></g><path d="M-18 8Q-8 2 3 3" stroke="#5a647a" strokeWidth=".8" fill="none"/></g>;
 if(id==='gwen-stacy')return <g className="roster-head"><path d="M-14 40V61H14V40" fill="#e6e6df"/><path d="M-27 50Q-47 20-31-10Q-18-31 3-29Q30-27 37 2Q44 27 27 50L17 37H-16Z" fill="#eae6e5"/><path d="M-26 38Q-38 9-21-11Q0-30 23-8Q38 14 25 39L18 29H-17Z" fill="#b96792"/><g fill="none" stroke="#6a415e" strokeWidth=".8"><path d="M-27 2L-13 8M-31 13L-17 17M26 2L13 8M31 13L18 17M-22-8L-29 23M22-8L29 23"/></g><path d="M-21 6Q-18-11 0-12Q20-11 23 8L19 31Q13 44 0 48Q-15 43-20 30Z" fill="#edece5"/><path d="M16 0Q25 16 14 34L6 44L17 36L22 19Z" fill="#b8c4cd" stroke="none"/><path d="M-19 11L-3 20L-7 29Q-16 28-19 11ZM19 11L3 20L7 29Q16 28 19 11Z" fill="#eaf9f3" stroke="#b15e8a" strokeWidth="2.5"/></g>;
 const feminine=['elsa','rapunzel','moana','hermione-granger','wednesday-addams','cozy-study-girl'].includes(id);
 const eyeColor=({elsa:'#508bad',rapunzel:'#68845a',moana:'#6d493a','hermione-granger':'#75513b','wednesday-addams':'#45424b','officer-k':'#648993','l-lawliet':'#333b48'} as Record<string,string>)[id]||'#5c5148';
 return <g className={`roster-head head-${id}`}>
 <path d="M-12 40V62Q0 68 12 61V40" fill={d.skin}/>
 <path d="M-11 46Q0 54 11 46V53Q0 60-11 53Z" fill="#89615b" opacity=".17" stroke="none"/>
 <path d="M-24 17Q-31 13-29 23Q-28 31-23 30M24 17Q30 13 29 24Q28 30 23 30" fill={d.skin}/>
 <path d={faces[id]||(feminine?'M-23 8Q-19-10 0-9Q20-9 24 9L21 29Q15 44 0 48Q-17 43-22 29Z':'M-24 8Q-21-10 0-9Q21-10 24 9L22 31L11 46L0 50L-13 44L-23 30Z')} fill={d.skin}/>
 <path d="M17 4L23 11L20 30L10 43L0 48L11 43L16 29Z" fill="#8a625b" opacity=".23" stroke="none"/>
 {id!=='gojo-satoru'&&id!=='neo'&&<g className="roster-eyes" style={{transformOrigin:'0px 24px'}}>
 <path d={eyes[id]||"M-18 24Q-12 19-6 24Q-12 29-18 24ZM6 24Q12 19 18 24Q12 29 6 24Z"} fill="#ece7dc" strokeWidth=".8"/>
 <ellipse cx="-11" cy="24" rx="2.3" ry="2.8" fill={eyeColor} stroke="none"/><ellipse cx="11" cy="24" rx="2.3" ry="2.8" fill={eyeColor} stroke="none"/>
 <g fill="#fff4db" stroke="none" opacity=".8"><circle cx="-11.8" cy="23" r=".7"/><circle cx="10.2" cy="23" r=".7"/></g>
 <path d="M-11 23V26M11 23V26" stroke="#202b38" strokeWidth="1"/>
 {feminine&&<path d="M-19 22L-17 24M17 24L19 21" fill="none" stroke="#4b3840" strokeWidth="1.3"/>}
 </g>}
 {id==='l-lawliet'&&<path d="M-19 28Q-12 34-6 29M6 29Q12 34 19 28" stroke="#8b7e83" strokeWidth="2" fill="none"/>}
 <path d="M-18 18L-7 19M7 19L18 18" fill="none" stroke={d.hair} strokeWidth={id==='levi-ackerman'?2:1.3}/>
 <path d={id==='wednesday-addams'?'M1 26L-1 32L2 33M-6 39H6':id==='moana'?'M1 25L-2 32Q1 35 4 32M-7 38Q0 44 8 38':'M1 26L-1 32L2 33M-6 39Q0 41 7 38'} fill="none" stroke="#956c60" strokeWidth=".9"/>
 {feminine&&<path d="M-5 39Q0 37 5 39" stroke="#b07978" fill="none"/>}
 {id==='officer-k'&&<g stroke="#876d60" opacity=".6" strokeWidth=".6"><path d="M-17 33l3 4m0 2l3 4m2 0l2 2m4-1v2m5-4l-1 3m4-6l-1 3m3-8l-1 3"/></g>}
 <path d={hairShapes[id]} fill={d.hair}/>
 {['elsa','rapunzel'].includes(id)&&<g fill="none" stroke="#fff0bc" strokeWidth="1.1" opacity=".65"><path d="M-23 4Q-10 7 9-9M-18 1Q-6 1 4-10M17-14Q26-4 24 9"/></g>}
 {['moana','hermione-granger','cozy-study-girl'].includes(id)&&<g fill="none" stroke="#b28b70" strokeWidth=".9" opacity=".4"><path d="M-29 13Q-35-2-24-10M-24 5Q-24-7-16-10M27 13Q34 1 25-7M-30 35Q-38 29-33 20"/></g>}
 {id==='officer-k'&&<path d="M-20 1Q-5-8 11-9M-19-3Q-6-13 4-12M-19 31L-13 35M13 35L19 30" stroke="#a98b72" opacity=".5" fill="none" strokeWidth=".8"/>}
 <path d={id==='gojo-satoru'?'M-24-6L-17 2M-13-14L-8-3M1-23L3-10M16-17L12-4M24-8L18 2':id==='levi-ackerman'?'M-22 4Q-8-18 13-10M-15 10Q-4-7 9-10M12-7L20 8':id==='l-lawliet'?'M-23 5L-17-6L-12 5M-4-12L1 4M12-13L17 2':'M-21 4Q-18-15-3-15M-12 2Q0-14 12-12M12-10Q23-1 22 10'} stroke={id==='gojo-satoru'?'#b2c3d2':'#c6b19b'} opacity={id==='gojo-satoru'?'.7':'.25'} strokeWidth="1.2" fill="none"/>
 {id==='gojo-satoru'&&<><path d="M-26 13Q0 18 26 13L25 28Q0 33-25 27Z" fill="#111c2d"/><path d="M-24 16Q0 22 24 16" stroke="#44516b" fill="none" strokeWidth="1"/><path d="M-6 39Q2 43 9 37" fill="none" stroke="#98685e"/></>}
 {id==='neo'&&<g fill="#142329" stroke="#89978f" strokeWidth="1"><path d="M-23 18H-5V28Q-19 31-23 25ZM5 18H23L22 26Q8 31 5 27Z"/><path d="M-5 21H5"/><path d="M-20 20H-11M9 20H18" stroke="#648477" opacity=".5"/></g>}
 {id==='late-night-study-boy'&&<><path d="M-29 21V3Q0-31 29 3V22" stroke="#83979f" strokeWidth="4" fill="none"/><path d="M-29 15V31M29 15V31" stroke="#202e40" strokeWidth="9"/><path d="M-32 17V29M32 17V29" stroke="#7398a8" strokeWidth="2"/></>}
 {id==='wednesday-addams'&&[-25,25].map(x=><g key={x} className="roster-braid"><path d={`M${x} 24Q${x-3} 54 ${x} 88`} stroke={d.hair} strokeWidth="10" fill="none"/>{[36,46,56,66,76].map(y=><path key={y} d={`M${x-4} ${y}l8 6m-8 0l8-6`} fill="none" stroke="#4e4c5c" strokeWidth=".8"/>)}<path d={`M${x-5} 85h10`} stroke="#8a8294" strokeWidth="2"/></g>)}
 {id==='elsa'&&<g className="roster-braid">{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${22-i*2} ${30+i*10}q-13-1-14 8q4 9 14 1Z`} fill={i%2?'#d7c58f':'#ecdda7'} stroke="#ad9e7e" strokeWidth=".7"/>)}<path d="M4 98L-1 110L8 107" fill="#eddfa9"/></g>}
 </g>;
}
