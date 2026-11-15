import React from 'react';
/** Portraits have individual facial construction. Irises are clipped to the
 * actual eye contours; no shared floating pupil coordinates or cheek slashes. */
function Eye({id,path,cx,cy,r,color}:{id:string;path:string;cx:number;cy:number;r:number;color:string}){
 return <g><defs><clipPath id={id}><path d={path}/></clipPath></defs><path d={path} fill="#fff7ef" stroke="#bb9488" strokeWidth=".45"/><g clipPath={`url(#${id})`}><circle cx={cx} cy={cy} r={r} fill={color} stroke="none"/><circle cx={cx} cy={cy-.25} r={r*.61} fill="#15252b" stroke="none"/><circle cx={cx-1.25} cy={cy-1.8} r={id.startsWith('moana')?1.15:.75} fill="#fffefa" stroke="none"/><circle cx={cx+1.4} cy={cy+1.8} r={id.startsWith('moana')?.45:.25} fill="#d6f2e8" stroke="none"/></g></g>;
}
export function DisneyPortrait({id}:{id:string}){
 if(id==='elsa')return <g stroke="#896c78" strokeWidth=".85" strokeLinejoin="round">
 <path d="M-8 39L-9 62Q1 68 12 61L9 39" fill="#f5d7c9"/><path d="M-8 44Q1 52 9 44V53Q1 57-9 52" fill="#dab4af" stroke="none"/>
 <path d="M-22 9Q-23-10 0-13Q24-11 24 9L21 29Q18 39 9 45Q2 50-5 46Q-17 41-21 29Z" fill="#f8ddd1"/>
 <path d="M19 6Q26 25 14 39L4 48Q20 42 23 29L25 13Z" fill="#e6bfc0" opacity=".65" stroke="none"/>
 <ellipse cx="-15" cy="32" rx="6" ry="3" fill="#eeb7bb" opacity=".42" stroke="none"/><ellipse cx="15" cy="32" rx="5" ry="3" fill="#eeb7bb" opacity=".42" stroke="none"/>
 <path d="M-20 18Q-12 12-5 17M5 17Q13 10 21 15" stroke="#b594ae" strokeWidth="1.7" fill="none"/>
 <g className="illustrated-eyes" transform="translate(0 2.2) scale(.9)" style={{transformOrigin:'0px 22px'}}>
 <Eye id="elsa-eye-left" path="M-20 21Q-13 16-5 21Q-5 26-12 27Q-18 27-20 21Z" cx={-11} cy={21.3} r={4.5} color="#518fba"/>
 <Eye id="elsa-eye-right" path="M5 21Q13 15 21 19Q21 25 14 27Q7 27 5 21Z" cx={13} cy={20.6} r={4.7} color="#518fba"/>
 <path d="M-20 21Q-13 15-5 20M5 20Q13 14 21 19M-20 21l-2-2M21 19l2-2" fill="none" stroke="#493749" strokeWidth="1.35"/>
 </g>
 <path d="M-20 12Q-14 7-5 12M5 11Q14 5 21 10" fill="none" stroke="#9b745e" strokeWidth="1.9"/>
 <path d="M0 24Q-1 29-3 31Q0 34 4 31" fill="none" stroke="#c6908e" strokeWidth=".7"/>
 <path d="M-8 38Q-3 36 0 37Q4 35 9 37Q3 41-3 41Z" fill="#b75d7f" stroke="none"/><path d="M-7 38Q1 39 8 37" stroke="#814665" fill="none" strokeWidth=".65"/>
 <path d="M-23 25Q-33 9-24-8Q-18-18-7-18Q1-29 12-22Q29-23 31-7Q36 5 24 22L20 8Q16-4 6-5Q-1 0-6-7Q-13 2-20 8L-19 24Z" fill="#eee5d2" stroke="#b5a68e"/>
 <path d="M-25 4Q-21-9-8-13M-23-1Q-15-13-5-12M-16-10Q-7-16-3-8M-4-8Q0-23 10-20M1-7Q8-19 18-17M7-6Q20-15 26-3M16-3Q25 1 25 11" stroke="#c9b99b" strokeWidth="1.2" fill="none"/>
 <path d="M-18-8Q-11-16-6-15M2-14Q8-24 16-19M12-9Q22-13 27-4" stroke="#fff9e9" strokeWidth="2" fill="none"/>
 <g className="illustrated-braid" transform="translate(4 12)">{[0,1,2,3,4,5,6].map(i=><g key={i}><path d={`M${24-i*2.1} ${26+i*9}q-12-5-15 5q1 9 13 7q7-7 2-12Z`} fill={i%2?'#e0d2b6':'#eee2c8'} stroke="#b9a888" strokeWidth=".7"/><path d={`M${20-i*2.1} ${29+i*9}l-8 6`} stroke="#fff4db" strokeWidth="1.2"/></g>)}<path d="M3 90L-3 104L6 101L9 93" fill="#e5d7ba"/><path d="M0 91L9 93" stroke="#8ab6cf" strokeWidth="2"/></g>
 </g>;
 if(id==='rapunzel')return <g stroke="#98725e" strokeWidth=".85">
 <path d="M-8 39L-10 62Q1 68 12 61L9 39" fill="#f7d5b8"/><path d="M-8 45Q0 52 9 45V53Q1 57-9 52" fill="#e2b398" stroke="none"/>
 <path d="M-23 8Q-24-10-1-12Q23-11 25 9L23 27Q21 39 9 47Q1 52-8 46Q-22 39-24 25Z" fill="#f9dabc"/>
 <path d="M21 6Q29 23 17 37L5 49Q20 43 25 28L26 10Z" fill="#eabd9f" stroke="none"/>
 <ellipse cx="-16" cy="32" rx="6" ry="3.5" fill="#edb0a6" opacity=".45" stroke="none"/><ellipse cx="17" cy="32" rx="5.5" ry="3.5" fill="#edb0a6" opacity=".45" stroke="none"/>
 <g className="illustrated-eyes" transform="translate(0 2.2) scale(.9)" style={{transformOrigin:'0px 22px'}}>
 <Eye id="rapunzel-eye-left" path="M-21 22Q-15 16-6 20Q-3 25-9 28Q-17 28-21 24Z" cx={-11} cy={22} r={4.9} color="#579c83"/>
 <Eye id="rapunzel-eye-right" path="M5 22Q13 17 21 21Q23 26 15 28Q7 28 5 22Z" cx={12.5} cy={23} r={4.7} color="#579c83"/>
 <path d="M-21 21Q-15 15-6 19M5 21Q13 16 21 20M-21 21l-2-2M21 20l2-2" stroke="#594135" strokeWidth="1.4" fill="none"/>
 </g>
 <path d="M-20 12Q-13 5-5 11M6 13Q14 11 21 14" stroke="#a37542" strokeWidth="1.8" fill="none"/>
 <path d="M1 26Q0 29-2 31Q1 34 6 31" fill="none" stroke="#cb9a7d" strokeWidth=".7"/>
 <path d="M-10 36Q-4 40 1 39Q6 40 11 37Q7 45 1 44Q-5 43-10 36Z" fill="#d77891" stroke="none"/><path d="M-9 37Q1 42 10 38" stroke="#99526d" strokeWidth=".7" fill="none"/><path d="M-3 42Q1 44 5 41" stroke="#f3b3bb" strokeWidth=".7" fill="none"/>
 <g fill="#b7906b" stroke="none" opacity=".55"><circle cx="-12" cy="32" r=".5"/><circle cx="-17" cy="31" r=".5"/><circle cx="13" cy="32" r=".5"/><circle cx="18" cy="31" r=".5"/></g>
 <path d="M-24 31Q-38 12-26-10Q-14-25 4-19Q22-24 30-8Q37 11 27 39L21 35Q28 12 17-1Q7-8 3-5Q-5 6-21 12L-19 28Z" fill="#e6bd65" stroke="#ae854a"/>
 <path d="M-26 5Q-17-7 2-13Q-4-1-23 12M-28-2Q-16-18-1-16M5-14Q17-22 25-7M10-9Q24-12 26 10M21 3Q29 16 23 29" stroke="#f8dc8a" strokeWidth="2" fill="none"/>
 <path d="M-23 2Q-11-9 0-10M14-13Q24-15 28-4M25 16L24 26" stroke="#bc914d" fill="none"/>
 </g>;
 if(id==='moana')return <g stroke="#664334" strokeWidth=".9">
 <path d="M-10 40L-13 62Q0 71 15 60L11 40" fill="#b97855"/><path d="M-10 46Q1 54 12 44L12 53Q1 60-12 53" fill="#955d45" stroke="none"/>
 <path d="M-26 9Q-25-12-1-12Q23-11 27 9L27 26Q25 41 10 49Q1 54-10 48Q-26 40-27 25Z" fill="#bf805e"/>
 <path d="M21 2Q32 18 21 37L9 48Q25 40 28 26L28 10Z" fill="#a96c52" stroke="none"/>
 <ellipse cx="-17" cy="32" rx="6" ry="3" fill="#c78a70" stroke="none"/><ellipse cx="18" cy="31" rx="5" ry="3" fill="#c78a70" stroke="none"/>
 <g className="illustrated-eyes" style={{transformOrigin:'0px 23px'}}>
 <Eye id="moana-eye-left" path="M-23 22Q-16 14-5 20L-2 26Q-13 31-22 26Z" cx={-12} cy={22.5} r={4.7} color="#80502a"/>
 <Eye id="moana-eye-right" path="M5 21Q14 14 24 21L23 26Q13 31 5 26Z" cx={14} cy={22.5} r={4.7} color="#80502a"/>
 <path d="M-23 21Q-15 14-5 20M5 21Q15 14 24 20M-22 20l-3-2M23 20l3-2" fill="none" stroke="#3b2825" strokeWidth="1.4"/>
 </g>
 <path d="M-23 13Q-15 5-4 11L-6 14Q-14 10-23 15ZM5 11Q14 7 23 13L24 16Q13 12 6 15Z" fill="#3b2926" stroke="none"/>
 <path d="M-4 27Q-8 32-4 34M5 27Q10 32 6 34M-4 34Q1 32 6 34" fill="none" stroke="#92583f" strokeWidth=".8"/>
 <path d="M-11 39Q-4 36 1 38Q7 36 13 38Q6 47-2 46Q-8 44-11 39Z" fill="#98523f" stroke="none"/><path d="M-10 39Q1 42 12 38" stroke="#6b3c31" strokeWidth=".7" fill="none"/><path d="M-4 44Q3 47 8 42" stroke="#cb8b72" strokeWidth="1" fill="none"/>
 <path d="M-29 40Q-45 36-39 20Q-49 6-37-9Q-35-25-17-24Q-2-36 13-25Q31-31 39-14Q51-7 43 10Q54 29 35 44L25 35Q32 21 23 8Q15-3 6-3Q-6-7-18 2Q-27 16-22 33Z" fill="#30231f"/>
 <path d="M-30 13Q-37 1-27-7M-26 3Q-29-13-17-16M-16-13Q-8-25 1-20M1-17Q12-26 21-16M24-14Q37-9 30 4M29 9Q39 22 30 29" fill="none" stroke="#70503c" strokeWidth="1.5"/>
 <path d="M-23-6Q-19-17-12-17M6-22Q15-25 20-19M31 15Q36 24 30 31" stroke="#9b7653" opacity=".4" fill="none"/>
 </g>;
 return null;
}
