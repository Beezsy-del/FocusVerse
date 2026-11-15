import React from 'react';
import {IllustratedWardrobe} from './IllustratedWardrobe';
import {SanctuaryDesign} from '../data/sanctuaries';
export function IllustratedBody({id,d}:{id:string;d:SanctuaryDesign}){
 const suit=`url(#figure-suit-${id})`;
 if(id==='miles-morales')return <g>
 {/* Independent weight-bearing leg and relaxed leg; knees and ankles remain
     on the floor anchor rather than stretching a single straight trouser shape. */}
 <path d="M-24 158Q-34 182-29 205L-24 229L-23 281L-7 283L-3 231L-8 210L4 185L16 216L23 239L27 283L43 281L39 233L32 209Q34 181 26 161Z" fill="#20232c"/>
 <path d="M-24 174Q-29 192-23 211L-17 231L-17 269M19 181L23 211L31 236L34 270" fill="none" stroke="#455064" strokeWidth="2.1"/>
 <path d="M-25 222Q-17 229-5 225M24 228L36 224M-21 271L-9 273M29 272L40 270" fill="none" stroke="#647184" strokeWidth=".8"/>
 <path d="M-24 276L-7 279L-8 292Q-20 302-41 303Q-47 301-42 297L-25 286ZM27 277L42 275L42 289L53 299Q53 305 31 303L25 299Z" fill="#191e28"/>
 <path d="M-41 299Q-23 299-12 292M31 300H48M-22 283L-11 285M30 283L39 282" stroke="#b64b62" strokeWidth="1.4" fill="none"/>
 <g className="illustrated-breath"><path d="M-12 50Q-22 55-35 62Q-44 69-36 91L-27 116L-25 158Q-7 175 27 164L27 121L37 92Q46 71 35 62L13 49Z" fill={suit}/>
 <path d="M-31 78Q-18 90-21 110L-23 139L-24 156Q-10 164-2 164L1 119L-8 82Z" fill="#151a24" stroke="none"/>
 <path d="M10 57Q29 60 35 71L30 88L9 81L-1 85L-22 77L-31 65" fill="#343945" opacity=".55" stroke="none"/>
 <path d="M-12 51Q0 60 13 50L14 60Q1 68-13 60Z" fill="#21252e"/>
 <g fill="none" stroke="#8b3547" strokeWidth=".65"><path d="M-30 67Q-4 82 35 69M-34 82Q-2 98 35 84M-29 98Q-4 111 30 100M-12 60L-11 116M13 58L16 117"/></g>
 {/* Chest emblem is inset from the shoulder and rib cage contours. */}
 <g transform="translate(1 8) scale(.89)"><circle cx="3" cy="100" r="27" fill="none" stroke="#bf3d4c" strokeWidth="3.1" strokeDasharray="78 3 46 2 35 5" transform="rotate(-9 3 100)"/><g stroke="#cc455c" fill="#cc455c" strokeWidth="2.3"><ellipse cx="3" cy="96" rx="3.5" ry="10"/><path d="M0 89L-14 80L-20 67M6 89L21 79L27 65M0 94L-22 89L-29 77M6 94L27 88L33 78M0 101L-19 113L-24 130M6 101L25 111L27 129M1 105L-8 124L-5 138M5 105L16 124L14 138" fill="none"/></g></g>
 <path d="M-22 128Q-13 132-7 130M13 130L25 126M-22 151Q1 158 25 151M-13 164L4 166" fill="none" stroke="#596476" strokeWidth=".8"/>
 </g>
 </g>;
 if(id==='gwen-stacy')return <g>
 <path d="M-21 151Q-48 160-61 190L-61 232L-45 285L-29 283L-40 230L-27 208L-2 186L17 196L37 231L28 281L44 284L59 229Q55 205 40 184L24 155Z" fill="#262c42"/>
 <path d="M-24 172Q-45 187-46 215M27 188L46 225L36 272" stroke="#56677c" fill="none" strokeWidth="2"/>
 <path d="M-45 276Q-35 283-29 276L-27 290Q-39 301-64 301Q-69 296-60 292L-45 286ZM29 276Q37 282 46 277L43 288L54 297Q52 304 27 301L24 295Z" fill="#6caab1"/>
 <path d="M-42 278L-30 289M-30 279L-42 288M31 278L42 288M42 278L31 290M-61 297L-39 296M30 298H48" stroke="#c6dfdc" strokeWidth="1" fill="none"/>
 <g className="illustrated-breath"><path d="M-12 44L-25 59Q-33 65-28 88L-19 118L-23 153Q-3 170 27 155L24 117L31 88Q37 67 24 60L12 44Z" fill="#e5e7e1"/>
 <path d="M-26 81L-10 96L-8 118L3 127L14 112L16 94L30 82L24 120L28 154Q6 167-22 154L-20 119Z" fill="#252e43"/>
 <path d="M-20 61Q-4 87 23 62M-26 72L-13 88M28 74L17 88" stroke="#be6b91" strokeWidth="2" fill="none"/>
 <path d="M-14 47L-9 59L1 65L12 58L15 47" fill="#cedbdc" stroke="none"/>
 <path d="M-8 131Q9 139 23 133M-16 147L-7 151M16 150L24 146" fill="none" stroke="#60738a" strokeWidth="1"/>
 </g>
 </g>;
 if(id==='l-lawliet')return <g>
 {/* The folded legs are separate anatomy, with bare feet on the chair seat. */}
 <path d="M-16 133Q-45 97-63 109Q-78 120-67 143L-35 182L-5 189L4 169L-35 137L-24 162L21 174L32 158L18 118Q25 99 41 114Q55 132 51 152L36 195L13 205L-10 194L-41 193L-60 173L-72 144" fill="#435466"/>
 <path d="M-60 120Q-58 140-29 167M37 120L39 149L24 182M-27 180L-7 184" fill="none" stroke="#83949e" strokeWidth="1.5"/>
 <path d="M-38 183L-15 185L-12 198Q-24 213-52 214Q-61 209-52 204L-37 197ZM17 191L34 188L34 202Q48 209 42 216H12Q7 211 17 201Z" fill="#dbc3b1"/>
 <path d="M-49 207L-46 212M-42 205L-39 211M-35 204L-33 210M21 209V214M28 208V215M35 209V215" stroke="#a18173" fill="none" strokeWidth=".8"/>
 <g className="illustrated-breath"><path d="M-16 50Q-30 57-36 75Q-42 92-31 112L-22 132Q-11 150 23 150Q35 147 30 132L21 110Q29 96 26 84Q23 66 10 58L3 48Z" fill="#d9dedb"/>
 <path d="M-27 71Q-32 94-19 110L-13 128Q4 139 25 136L30 145Q6 156-17 143L-29 122L-36 101Z" fill="#adb9bf" stroke="none"/>
 <path d="M-17 51Q-10 66 6 58L13 65Q-9 73-23 61M-23 87L-17 105M-17 124Q-6 130 4 128M5 134L21 139M17 97L10 109" stroke="#869aa6" fill="none" strokeWidth=".9"/>
 </g>
 </g>;
 if(id==='tony-stark')return <g>
 <path d="M-31 159Q-62 174-69 207L-61 278L-32 280L-31 229L-6 207L10 192L32 220L20 281L51 284L67 216Q63 195 47 177L27 156Z" fill="#8f3e3e"/>
 <path d="M-33 177L-51 196L-55 220L-42 226L-20 203ZM25 180L47 205L45 222L33 220L16 198Z" fill="#cba468"/>
 <path d="M-62 231L-35 234L-34 269L-56 274ZM29 230L54 232L47 274L24 271Z" fill="#b25448"/>
 <path d="M-63 212L-40 216L-34 229L-45 241L-65 233ZM34 212L56 213L59 228L43 242L27 231Z" fill="#c9875e"/>
 <path d="M-60 271L-32 272L-30 291Q-47 306-80 306L-84 299L-61 284ZM22 273L51 274L50 289L67 300L63 307H20L16 299Z" fill="#ae5046"/>
 <path d="M-73 300L-43 298M26 302H54M-52 282L-39 281M28 283L42 285M-52 246L-43 248M34 247L44 249" fill="none" stroke="#e0ae79"/>
 <g className="illustrated-breath"><path d="M-18 48L-41 59Q-57 69-46 94L-34 115L-30 158Q-3 177 32 161L34 116L47 93Q57 67 40 58L15 47Z" fill="#a54b45"/>
 <path d="M-32 64L-6 72L3 85L-10 94L-33 88L-39 75ZM9 75L29 62L40 73L34 89L16 95L4 85Z" fill="#c76751"/>
 <path d="M-33 94L-20 103L-17 132L-26 143L-31 121ZM31 96L20 106L18 136L28 145L32 119Z" fill="#c9a068"/>
 <path d="M-12 109L12 109L20 118L-19 119ZM-19 123L19 122L16 132H-17ZM-17 137H17L20 145L-22 146Z" fill="#70373d"/>
 <path d="M-22 150L-9 157H9L24 150L28 161L12 168H-10L-27 159Z" fill="#b16b51"/>
 <path d="M-29 68L-9 75M13 77L29 68M-34 82L-14 90M20 89L34 79M-14 115H14M-14 128H13M-13 142H14M-20 154L-8 160H9" fill="none" stroke="#f0b481" strokeWidth="1"/>
 <circle cx="2" cy="94" r="12" fill="#394b58"/><circle cx="2" cy="94" r="9" fill="#85c5c6"/><circle cx="2" cy="94" r="6" fill="#d7f1e5"/>
 <g fill="none" stroke="#8dcbcd" strokeWidth=".8"><path d="M2 83V86M2 102V105M-9 94H-6M10 94H13"/></g>
 <g fill="#cbab7a" strokeWidth=".5"><circle cx="-29" cy="91" r="1.5"/><circle cx="30" cy="93" r="1.5"/><circle cx="-23" cy="146" r="1"/><circle cx="23" cy="146" r="1"/></g>
 </g>
 </g>;
 return <IllustratedWardrobe id={id} d={d}/>;
}
