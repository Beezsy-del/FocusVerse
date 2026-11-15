import React from 'react';
import {IllustratedEveryday} from './IllustratedEveryday';
import {SanctuaryDesign} from '../data/sanctuaries';
export function IllustratedGowns({id,d}:{id:string;d:SanctuaryDesign}){
 if(id==='elsa')return <g>
 <path className="illustrated-cloth" d="M-21 66Q-47 143-72 288Q-21 312 73 296Q48 196 22 63Z" fill="#8cc6da" fillOpacity=".23" stroke="#b2dbe7" strokeOpacity=".6"/>
 <path d="M-34 122L-58 282M36 124L60 286" stroke="#c9e9ec" strokeOpacity=".3" fill="none"/>
 <path d="M-23 146Q-34 175-32 204L-49 289Q-12 309 52 293L31 226Q30 177 18 145Z" fill="#7fbdce"/>
 <path d="M-16 158Q-20 204-32 287L-17 295Q-5 231-3 166ZM15 158Q29 211 35 291L48 291L29 222L25 172Z" fill="#5095b0" stroke="none"/>
 <path d="M-8 166Q-6 228-15 293M6 167Q18 231 17 293M-27 204L-40 285" fill="none" stroke="#b4e0e4" strokeWidth="1.5"/>
 <path d="M-24 294L-16 293L-15 301H-39Q-40 298-24 294ZM24 294L32 291L42 299Q41 304 23 302Z" fill="#a3d4dd"/>
 <g className="illustrated-breath"><path d="M-11 47L-25 62L-28 78L-18 116L-23 147Q-6 167 19 150L19 118L27 81L24 63L12 47Z" fill="#97cdd8"/>
 <path d="M-25 77Q-11 72 2 86Q14 72 25 76L18 119L20 149L4 159L-20 148L-17 118Z" fill="#72b5cb"/>
 <path d="M-18 88L-12 143M-7 92L-2 151M6 94L7 152M17 88L14 141" stroke="#d5f0ee" strokeWidth="1" fill="none"/>
 <path d="M-25 77Q-11 72 2 86Q14 72 25 76M-21 147L4 157L19 148" fill="none" stroke="#e0f2ec" strokeWidth="1.5"/>
 {[-12,-3,7,15].map((x,i)=><g key={x} fill="#d0edf0" stroke="none"><path d={`M${x} ${99+i%2*15}l2 5l-2 5l-2-5Z`}/><circle cx={x} cy={127+i%2*7} r="1.2"/></g>)}
 </g>
 <g stroke="#c5e9ed" strokeWidth=".7" opacity=".65" fill="none">{[-47,-28,33,50].map((x,i)=><path key={x} d={`M${x} ${220+i%2*42}v14m-7-7h14m-12-5l10 10m0-10l-10 10`}/>)}</g>
 </g>;
 if(id==='rapunzel')return <g>
 <path className="illustrated-cloth" d="M-22 1Q-55 31-48 106Q-42 154-56 207Q-74 256-40 280Q-8 310 59 291Q89 283 74 259Q66 245 51 253Q34 274 2 258Q-23 242-10 211L25 42Z" fill="#dfbb65"/>
 <path d="M-31 25Q-48 83-35 135Q-22 174-43 223Q-58 266-17 284Q18 298 58 281M-23 37Q-35 92-23 135Q-10 176-29 218Q-45 257-10 274Q17 285 48 274" stroke="#f4d98c" fill="none" strokeWidth="2"/>
 <path d="M-25 154Q-49 163-60 190L-53 276Q-29 291-1 279Q22 290 44 272L49 207Q42 177 23 152Z" fill="#b883b1"/>
 <path d="M-21 166Q-43 199-42 270M-3 173Q-22 217-19 279M14 168Q32 211 30 271M-54 205L-48 266" fill="none" stroke="#e2b8d4" strokeWidth="1.5"/>
 <path d="M-47 272L-33 277L-32 288Q-48 301-68 300Q-75 297-67 293L-47 284ZM24 274L38 271L36 287Q47 292 46 298Q32 305 18 300L18 293Z" fill={d.skin}/>
 <path d="M-65 295L-62 299M-58 294L-55 298M-51 292L-48 296M39 295V300M32 295V301M25 295V300" stroke="#a17d64" strokeWidth=".7" fill="none"/>
 <g className="illustrated-breath"><path d="M-12 48L-26 62Q-32 74-25 91L-20 118L-26 154Q-2 169 25 153L22 116L29 88Q34 69 22 60L12 47Z" fill="#b17fae"/>
 <path d="M-20 70Q-2 83 22 68L18 111L21 151L0 161L-23 152L-17 115Z" fill="#9a689d"/>
 <path d="M-18 75L-15 147M17 75L13 149M-10 85L9 96L-10 107L10 119L-9 132L9 144M10 85L-10 96L10 107L-10 119L9 132L-8 145" fill="none" stroke="#ebc3d3" strokeWidth="1.2"/>
 <path d="M-23 63Q-2 80 23 61" stroke="#f0d2dc" strokeWidth="3" fill="none"/>
 <path d="M-20 153L-13 160M-7 157V164M5 158L9 164M16 154L22 159" stroke="#d6a7c8" fill="none"/>
 </g></g>;
 if(id==='moana')return <g>
 <path className="illustrated-cloth" d="M-27 0Q-57 13-48 39Q-63 58-49 80Q-62 104-46 121Q-54 144-30 153L-12 141L10 153L39 146Q60 132 49 111Q64 91 49 70Q61 49 44 31L28-3Z" fill="#30231f"/>
 <path d="M-37 19Q-51 37-40 53Q-53 73-41 91Q-54 113-37 136M35 19Q51 37 40 56Q55 75 42 95Q55 115 38 136" stroke="#785747" fill="none" strokeWidth="1.6"/>
 <path d="M-27 199Q-35 230-31 249L-25 283L-8 285L-10 248L4 222L17 252L25 285L43 282L38 246Q34 216 27 198Z" fill={d.skin}/>
 <path d="M-23 222L-22 249L-16 276M24 224L29 246L34 275" stroke="#8e5c43" strokeWidth="2" fill="none"/>
 <path d="M-24 279L-8 282L-6 293Q-23 304-44 303Q-48 299-41 296L-25 287ZM27 280L42 278L41 291Q56 297 50 303Q35 307 23 302L22 296Z" fill={d.skin}/>
 <path d="M-39 298L-36 302M-32 296L-30 301M-25 295L-23 299M44 297V302M37 297V303M30 297V302" stroke="#81533e" strokeWidth=".7" fill="none"/>
 <path d="M-29 135Q-39 177-43 222Q-4 236 44 219L31 135Z" fill="#d2bb8c"/>
 <path d="M-28 157L30 154M-33 180L34 178M-38 207L38 204M-25 153L-29 216M-13 156L-15 222M1 155V225M15 154L20 221M27 153L34 217" stroke="#937d59" strokeWidth=".8" fill="none"/>
 <path d="M-38 214Q0 229 40 213" stroke="#e0c9a0" strokeWidth="3" fill="none"/>
 {[-33,-24,-15,-6,3,12,21,30].map(x=><path key={x} d={`M${x} 211l-1 15`} stroke="#d9c59c" strokeWidth="2"/>)}
 <g className="illustrated-breath"><path d="M-14 46L-32 60Q-41 74-33 93L-28 113L-29 139Q1 153 31 137L28 111L34 87Q40 71 28 59L13 46Z" fill={d.skin}/>
 <path d="M-34 76Q-1 87 34 72L29 112Q3 127-29 113Z" fill="#c56348"/>
 <g fill="#6c3830" stroke="none">{[-23,-15,-7,1,9,17].map(x=><path key={x} d={`M${x} 94l3-3l3 3l-3 3ZM${x} 99h5v1.5h-5Z`}/>)}</g><path d="M-28 82L-15 91L-1 82L12 90L28 80M-24 105L-12 114L0 105L13 113L24 102" stroke="#e7bd94" fill="none" strokeWidth="1.4"/>
 <path d="M-14 52Q-3 87 10 55" stroke="#d9c7a4" strokeWidth="2" fill="none"/><ellipse cx="0" cy="85" rx="7" ry="9" fill="#529e9f" stroke="#d8c89d" strokeWidth="1.3"/><path d="M3 80Q-5 77-4 85Q-1 93 4 87Q7 83 1 83Q-2 83 0 87" stroke="#b8e2cf" strokeWidth=".9" fill="none"/><g fill="#e9d6ac" stroke="none"><circle cx="-10" cy="64" r="2"/><circle cx="-6" cy="72" r="1.8"/><circle cx="4" cy="71" r="1.8"/><circle cx="7" cy="63" r="2"/></g>
 <path d="M-29 130Q0 140 31 128L31 140L6 147L-28 141Z" fill="#a64b40"/><path d="M-20 135L20 138" stroke="#d68d64" fill="none"/>
 </g></g>;
 if(id==='hermione-granger')return <g>
 <path className="illustrated-cloth" d="M-26 0Q-47 24-38 49Q-50 72-35 92Q-47 113-28 143L-3 130L24 143Q44 121 34 98Q49 74 35 53Q44 24 25 1Z" fill="#755344"/>
 <path d="M-29 22Q-37 39-27 58Q-38 85-27 104M27 23Q38 44 28 65Q39 91 25 123" stroke="#b28b65" fill="none" strokeWidth="1.3"/>
 <path d="M-24 201L-24 282H-8L-3 234L11 281L29 279L22 200Z" fill="#3b3d47"/>
 <path d="M-24 277H-8L-6 292Q-20 304-42 304Q-48 299-39 295L-24 287ZM11 277L29 276L29 291L42 299Q39 306 13 304L8 297Z" fill="#263544"/>
 <path d="M-36 300L-15 297M15 300H35" stroke="#7d909d" fill="none"/>
 <path className="illustrated-cloth" d="M-14 48L-28 61Q-38 73-30 95L-23 123L-39 247L-11 259L1 218L13 258L44 244L27 121L33 91Q38 70 26 60L13 47Z" fill="#4f4552"/>
 <path d="M-12 58L2 68L13 56L12 135L-12 139Z" fill="#c4c5b9"/>
 <path d="M-12 54L1 63L13 52L10 72L1 65L-9 75Z" fill="#ece7d8"/>
 <path d="M1 65L5 74L2 106L-4 101L-3 73Z" fill="#975248"/><path d="M-2 79L4 83M-3 91L3 95" stroke="#cfab65" strokeWidth="2"/>
 <path d="M-24 65L-13 87L-22 102L-12 144L-28 242M26 65L14 86L23 100L12 142L31 243" stroke="#9b8592" strokeWidth="1.3" fill="none"/>
 <path d="M16 87L27 85V101L22 107L16 102Z" fill="#a37450"/><path d="M19 90H24V100H19Z" fill="#d2b67e" strokeWidth=".5"/>
 <path d="M-18 163L-23 204M22 160L28 202M-9 150L0 156L12 150" stroke="#252e3d" strokeWidth="2" fill="none"/>
 </g>;
 return <IllustratedEveryday id={id} d={d}/>;
}
