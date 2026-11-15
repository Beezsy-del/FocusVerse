import React from 'react';
import {FilmPortrait} from './FilmPortrait';
import {DisneyPortrait} from './DisneyPortrait';
import {SanctuaryDesign} from '../data/sanctuaries';
interface Portrait {face:string;hair:string;locks:string;eyes:string;brows:string;mouth:string;iris:string;}
const masters:Record<string,Portrait>={
 'gojo-satoru':{face:'M-19 7Q-18-8 1-8Q21-7 24 11L20 30L8 45L-1 48L-14 39L-21 24Z',hair:'M-20 19L-29 7L-25-2L-33-8L-22-10L-24-21L-13-16L-9-29L-1-21L8-34L13-20L25-25L23-14L34-13L27-4L36 1L25 10L23 20L15 7L6 12L1 2L-8 15L-13 7Z',locks:'M-20-4L-14 4M-9-15L-5-2M6-23L8-7M21-15L16-1M24-4L20 5',eyes:'',brows:'',mouth:'M-5 37Q3 43 12 35M-2 39Q4 41 9 37',iris:'#72cae0'},
 'levi-ackerman':{face:'M-21 7Q-19-9 1-8Q21-7 23 10L19 29L7 43L-2 47L-15 37L-22 22Z',hair:'M-22 27Q-29 2-17-11Q0-23 15-12Q29-5 25 15L20 27L14 8L9 1L-2 14L-13 28L-9 7L-19 26Z',locks:'M-23 4Q-9-15 13-10M-19 8Q-8-9 8-9M11-6L20 9M-17 31L-13 19',eyes:'M-18 23L-6 22L-9 26L-17 25ZM4 22L18 20L15 25L7 26Z',brows:'M-18 18L-6 19M4 18L17 16',mouth:'M-7 38L5 38',iris:'#65727c'},
 'hermione-granger':{face:'M-22 8Q-19-9 0-8Q22-6 24 10L20 29Q14 42 1 47Q-15 42-21 29L-24 19Z',hair:'M-25 30Q-37 25-31 12Q-40-2-28-14Q-17-28-5-21Q8-29 22-16Q36-16 32 1Q41 14 28 32L22 31L19 12L12 0Q-4 17-22 11L-20 29Z',locks:'M-28 9Q-34 0-24-10M-21 3Q-19-10-10-12M-3-17Q7-22 18-11M25 2Q34 12 25 25',eyes:'M-18 24Q-12 18-5 23Q-10 29-17 26ZM4 23Q11 17 18 21Q13 28 6 26Z',brows:'M-18 17L-5 18M5 17L18 14',mouth:'M-6 38Q0 41 7 37',iris:'#76553c'},
 'wednesday-addams':{face:'M-21 8Q-18-9 0-8Q20-7 23 10L20 31L9 44L0 48L-12 42L-21 28Z',hair:'M-23 27Q-30 8-22-10Q-13-23 2-20Q22-20 27-5L25 27L18 25L17 7L9 7L3 5L-4 8L-11 5L-18 9L-17 28Z',locks:'M-21 1Q-15-15-2-16M4-16Q17-17 23-2M-15 4L-9-6M10-7L16 3',eyes:'M-18 23Q-11 21-5 23Q-11 29-18 26ZM5 23Q12 20 18 22Q13 29 6 26Z',brows:'M-18 17L-5 18M5 17L18 16',mouth:'M-6 39H6',iris:'#504c57'},
 'cozy-study-girl':{face:'M-22 8Q-18-8 1-8Q22-6 24 11L21 29Q13 44 0 47Q-15 42-22 28L-24 18Z',hair:'M-24 29Q-35 8-24-11Q-12-25 7-20Q29-19 29 4L25 31L19 26L17 8L8 13L0 3L-18 18L-19 29Z',locks:'M-25 4Q-24-11-11-13M-18 8Q-9-4 1-10M16-10Q25-1 23 11',eyes:'M-18 24Q-12 18-5 24Q-11 30-18 26ZM4 23Q12 17 18 22Q13 29 6 26Z',brows:'M-18 17Q-12 14-5 17M5 16Q12 13 18 15',mouth:'M-6 38Q1 42 8 37',iris:'#7a5c49'},
 'late-night-study-boy':{face:'M-22 8Q-19-9 0-8Q22-7 24 11L20 31L8 45L-2 48L-16 40L-23 24Z',hair:'M-22 27Q-30 9-24-8L-15-12L-12-22L0-17L11-24L17-13L27-12L28 4L23 29L17 14L10 7L2 17L-3 7L-16 22L-17 10Z',locks:'M-23 0L-16-6L-14 8M-8-12L-2-3M9-14L15-3M21-5L23 8',eyes:'M-18 24Q-12 21-5 24L-10 28L-17 27ZM4 23Q11 19 18 22L14 27L6 27Z',brows:'M-18 18L-5 20M5 18L18 16',mouth:'M-6 39L6 38',iris:'#5d6976'},
};
export function HumanPortrait({id,d}:{id:string;d:SanctuaryDesign}){
 if(['neo','officer-k'].includes(id))return <FilmPortrait id={id}/>;
 if(['elsa','rapunzel','moana'].includes(id))return <DisneyPortrait id={id}/>;
 const p=masters[id];if(!p)return null;
 return <g stroke="#34313a" strokeWidth="1">
 <path d="M-10 37L-13 62Q0 69 13 60L10 37" fill={d.skin}/><path d="M-9 43Q0 52 10 43L9 54Q0 59-11 53Z" fill="#91685c" opacity=".35" stroke="none"/>
 <path d="M-21 17Q-29 13-26 24L-20 29M21 16Q28 12 26 23L20 28" fill={d.skin}/>
 <path d={p.face} fill={d.skin}/><path d="M15 0Q24 14 16 30L6 42L-2 47L11 43L22 29L24 12Z" fill="#976b61" opacity=".3" stroke="none"/>
 <path d="M-18 12L-17 21M-16 30L-11 34" stroke="#f2dac2" opacity=".55" fill="none" strokeWidth="1.1"/>
 <g className="illustrated-eyes" style={{transformOrigin:'0px 24px'}}>
 {p.eyes&&<><defs><clipPath id={`portrait-eyes-${id}`}><path d={p.eyes}/></clipPath></defs><path d={p.eyes} fill="#eee9df" strokeWidth=".7"/><g clipPath={`url(#portrait-eyes-${id})`}><ellipse cx="-11" cy="23" rx={id==='levi-ackerman'?2.2:3.2} ry="3.3" fill={p.iris} stroke="none"/><ellipse cx="11" cy="22" rx={id==='levi-ackerman'?2.2:3.2} ry="3.3" fill={p.iris} stroke="none"/><circle cx="-11" cy="23" r="1.6" fill="#273340" stroke="none"/><circle cx="11" cy="22" r="1.6" fill="#273340" stroke="none"/><circle cx="-12" cy="22" r=".65" fill="#fff9ec" stroke="none"/><circle cx="10" cy="21" r=".65" fill="#fff9ec" stroke="none"/></g></>}
 </g><path d={p.brows} stroke={d.hair} strokeWidth="1.6" fill="none"/>
 <path d="M0 25Q0 29-2 31Q0 33 3 31" stroke="#9c7464" strokeWidth=".7" fill="none"/><path d={p.mouth} stroke="#805d58" strokeWidth=".8" fill="none"/>
 {id==='officer-k'&&<g stroke="#816c5d" strokeWidth=".65" opacity=".8"><path d="M-18 30l3 4m-1 2l2 3m2-2l2 4m1-2l2 4m2-2v3m3-3v3m4-6l-1 4m4-6l-1 3m3-8l-1 3M-8 35l2 1m3-1h3m3 0l2-1"/></g>}
 <path d={p.hair} fill={d.hair}/>{id==='elsa'&&<g className="illustrated-braid">{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${21-i*2} ${28+i*9}q-12-2-13 7q3 8 13 2Z`} fill={i%2?'#d1bd85':'#e9d9a3'} stroke="#a69b7f" strokeWidth=".7"/>)}<path d="M4 91L-1 103L8 100Z" fill="#e5d4a0"/></g>}<path d={p.locks} fill="none" stroke={id==='gojo-satoru'?'#94abc2':'#a79b8d'} opacity={id==='gojo-satoru'?.8:.35} strokeWidth="1"/>
 {id==='gojo-satoru'&&<><path d="M-15 48Q0 55 15 46L18 62L4 73L-12 65Z" fill="#283047"/><path d="M-11 55L2 63L12 53" fill="none" stroke="#65738d"/><path d="M-24 12Q-1 19 25 9L24 25Q3 34-23 25Z" fill="#172237"/><path d="M-22 15Q0 22 23 12M-21 24Q0 29 22 22" stroke="#4e607d" fill="none" strokeWidth=".8"/><path d="M24 15L32 18L26 25" fill="#25334b"/></>}
 {id==='wednesday-addams'&&[-23,23].map((x,i)=><g key={x} className="illustrated-braid"><path d={`M${x} 23Q${x+(i?5:-5)} 55 ${x+(i?2:-3)} 90`} stroke="#252a35" strokeWidth="9" fill="none"/>{[37,46,55,64,73,82].map(y=><path key={y} d={`M${x-4} ${y}l8 6m-8 0l8-6`} stroke="#535563" fill="none" strokeWidth=".65"/>)}<path d={`M${x-5} 88h10`} stroke="#908695" strokeWidth="2"/></g>)}
 {id==='late-night-study-boy'&&<><path d="M-28 18V1Q-1-26 27 0V20" stroke="#6f8795" strokeWidth="4" fill="none"/><path d="M-28 15V29M27 15V29" stroke="#263446" strokeWidth="9"/><path d="M-30 17V27M29 17V27" stroke="#92acb3" strokeWidth="1.7"/><path d="M-28 29Q-37 53-23 63" stroke="#536b7b" fill="none" strokeWidth="1.2"/></>}
 {id==='neo'&&<g fill="#122127" stroke="#748a82" strokeWidth=".9"><path d="M-21 19L-5 21L-6 29Q-20 31-21 23ZM3 21L20 17L19 26Q12 31 4 28Z"/><path d="M-5 23H3M-21 21L-25 19M20 19L24 16" fill="none"/><path d="M-18 21L-10 22M7 22L16 20" stroke="#a6bab1" opacity=".35"/></g>}
 </g>;
}
