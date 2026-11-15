import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
import './RosterSanctuaryActor.css';
/** Animal anatomy and contact planes are deliberately separate from the humanoid rig. */
export function RosterPetActor({id,d,tool,layer}:{id:string;d:SanctuaryDesign;tool:string;layer:'body'|'hands'}) {
 if(layer==='hands')return null;
 const cat=id==='purring-window-cat';
 return <g className={`roster-actor roster-${id} pet-${cat?'cat':'dog'} roster-action-${tool}`} data-actor={id} data-rig-layer="body" transform={`translate(${d.x} ${d.y}) scale(${d.scale})`} stroke="#443c36" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
 <ellipse cx="0" cy="113" rx={cat?86:98} ry="10" fill="#16202a" opacity=".32" stroke="none"/>
 {cat?<>
 <path className="pet-tail" d="M39 86Q102 92 94 39Q92 16 78 20Q69 24 81 35Q93 56 71 69L40 66" fill="#b79470" strokeWidth="2"/>
 <g className="roster-breathe pet-body"><path d="M-48 73Q-49 12-6 13Q25 13 41 45Q64 59 64 89Q63 106 39 109H-43Z" fill="#c9aa80"/><path d="M20 33Q31 62 19 89Q5 106-30 105L40 108Q65 105 61 84Q61 60 40 46Z" fill="#a88260" stroke="none"/><path d="M-42 45Q-13 30 3 48L-5 81L-39 92Z" fill="#e7d3ac" stroke="none"/><path d="M31 70Q14 74 21 96L42 100" fill="none" stroke="#866c55"/><path d="M15 31L31 46M17 43L37 56M38 59L49 66M40 70L56 75" fill="none" stroke="#937051" strokeWidth="4"/></g>
 <path d="M-9 64Q5 64 3 86L0 102Q16 103 13 111H-13Q-17 107-14 96Z" fill="#dac09a"/>
 <path d="M28 97Q47 91 57 102L59 111H27Q20 107 28 97Z" fill="#d3b48c"/>
 <g className="pet-head" style={{transformOrigin:'-25px 37px'}}>
 <path d="M-66 1L-68-32L-42-17Q-25-21-11-15L10-30L7 6Q14 30-5 42Q-35 57-59 37Q-73 24-66 1Z" fill="#c9aa80"/>
 <path d="M-61-21L-44-11L-61-3ZM1-19L-10-10L2-2Z" fill="#be8b83" stroke="#a67d6a"/>
 <path d="M-57 25Q-48 16-33 26Q-17 16-7 25L-15 37Q-33 47-50 36Z" fill="#ecdbb9" stroke="none"/>
 <path d="M-49-12L-43 0M-33-16L-32-1M-18-13L-22 0M-65 17L-55 20M1 15L-8 20" stroke="#8e6c4e" strokeWidth="3" fill="none"/>
 <g className="roster-eyes" style={{transformOrigin:'-32px 13px'}}><path d="M-58 11Q-49 4-41 12Q-48 20-58 11ZM-25 12Q-17 4-7 10Q-15 21-25 12Z" fill="#a6ad7d"/><path d="M-49 8V15M-16 8V16" stroke="#273534" strokeWidth="2.3"/><path d="M-52 10h1M-19 10h1" stroke="#f3ecd6"/></g>
 <path d="M-39 26Q-33 23-27 26L-33 31Z" fill="#a37270"/><path d="M-33 31V35Q-39 39-43 35M-33 35Q-27 39-23 35" fill="none" strokeWidth=".9"/>
 <path d="M-48 28L-79 23M-49 33L-81 35M-19 28L14 21M-18 33L15 35" stroke="#e7d8bb" fill="none" strokeWidth=".9"/>
 <path d="M-54 40Q-30 53-8 41" fill="none" stroke="#7d6d62" strokeWidth="4"/><circle cx="-26" cy="49" r="4" fill="#c4ac6d"/>
 </g>
 <g className={`pet-forepaw ${tool==='paw'?'pet-grooming':''}`} style={{transformOrigin:'-43px 61px'}}><path d={tool==='paw'?'M-48 60Q-59 59-64 51L-53 32Q-48 24-42 30L-37 37Q-36 42-44 45L-48 48L-37 62Z':'M-48 60Q-37 59-33 70L-35 100Q-21 104-26 111H-55Q-58 104-51 99Z'} fill="#e0c8a2"/><path d={tool==='paw'?'M-50 33L-44 36M-52 37L-46 40':'M-46 105V110M-39 105V111M-33 105V110'} stroke="#ac8c69"/></g>
 <path d="M-6 106V110M1 106V111M35 105V110M43 104V110" stroke="#977e65"/>
 {tool==='leaf'&&<path className="pet-leaf" d="M-83 2Q-102-13-85-24Q-73-11-83 2ZM-84-19L-83 4" fill="#829d72" stroke="#4f735d" strokeWidth="1"/>}
 </>:<>
 <path className="pet-tail" d="M43 82Q83 87 91 62Q99 46 100 63Q102 96 60 103" fill="#a77950" strokeWidth="2"/>
 <g className="roster-breathe pet-body"><path d="M-46 69Q-49 20-8 18Q29 14 40 49Q67 61 67 89Q66 108 43 110H-42Z" fill="#bd8d5e"/><path d="M18 35Q40 69 27 92L12 107H48Q68 102 65 85Q63 63 41 50Z" fill="#a4754e" stroke="none"/><path d="M-38 46Q-10 34 10 53L-2 91L-29 98Z" fill="#e0c59a" stroke="none"/><path d="M39 69Q15 72 24 95L42 99" stroke="#866044" fill="none"/><path d="M-30 50L-25 58L-18 54L-13 64L-7 57L-2 65" stroke="#c3a376" fill="none"/></g>
 <path d="M-3 67Q10 64 12 79L9 101Q28 103 24 113H-7Q-12 109-8 98Z" fill="#d4b080"/><path d="M31 98Q52 91 65 102L68 113H28Q23 105 31 98Z" fill="#cda678"/>
 <g className="pet-head" style={{transformOrigin:'-28px 38px'}}>
 <path d="M-66 1Q-67-28-31-29Q1-32 9-6L8 23Q-2 45-29 48Q-58 43-64 24Z" fill="#c39667"/>
 <path className="pet-ear" d="M-56-20Q-78-17-80 8Q-80 37-65 40Q-55 37-56 20L-48-8Z" fill="#805b42"/>
 <path className="pet-ear pet-ear-right" d="M-1-22Q19-18 21 5Q21 34 9 37Q0 34 0 17L-8-9Z" fill="#805b42"/>
 <path d="M-58 17Q-45 7-30 17Q-16 6-3 18L-8 35Q-29 52-52 34Z" fill="#e1c8a0" stroke="none"/>
 <g className="roster-eyes" style={{transformOrigin:'-30px 6px'}}><ellipse cx="-48" cy="7" rx="4.5" ry="5.4" fill="#483b30"/><ellipse cx="-13" cy="7" rx="4.5" ry="5.4" fill="#483b30"/><circle cx="-49" cy="5" r="1.5" fill="#efe2c5" stroke="none"/><circle cx="-14" cy="5" r="1.5" fill="#efe2c5" stroke="none"/></g>
 <path d="M-55-4Q-49-8-42-4M-20-4Q-13-9-7-3" fill="none" stroke="#9e714d" strokeWidth="3"/>
 <path d="M-40 21Q-30 16-20 21Q-20 29-30 30Q-40 28-40 21Z" fill="#433d39"/><path d="M-36 22Q-31 20-25 22" fill="none" stroke="#938475" strokeWidth="1"/>
 <path d="M-30 30V36M-48 31Q-40 43-30 36Q-19 44-10 31" fill="none" stroke="#785d4a"/>
 <path d="M-53 41Q-28 57-4 42L-5 49Q-29 64-52 48Z" fill="#9c4b47"/><path d="M-21 51V59" stroke="#cba771" strokeWidth="3"/><path d="M-26 58H-17L-15 65L-22 70L-29 65Z" fill="#d8b572" strokeWidth=".8"/>
 </g>
 <g className={`pet-forepaw ${tool==='paw'?'pet-offering':''}`} style={{transformOrigin:'-43px 61px'}}><path d={tool==='paw'?'M-48 59Q-38 58-35 69Q-39 86-56 89L-81 94Q-94 98-98 90Q-99 83-90 80L-65 77L-55 63Z':'M-48 59Q-35 58-30 73L-32 99Q-12 103-17 113H-56Q-63 107-54 100Z'} fill="#d9b88b"/><path d={tool==='paw'?'M-92 85L-90 92M-85 84L-83 91M-76 85Q-61 85-53 78':'M-48 106V112M-40 106V112M-30 107V112'} stroke="#9d7854" fill="none"/></g>
 <path d="M0 107V112M9 107V113M38 106V112M48 105V111M58 107V112" stroke="#927453"/>
 </>}
 </g>;
}
