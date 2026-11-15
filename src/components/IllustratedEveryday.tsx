import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
export function IllustratedEveryday({id,d}:{id:string;d:SanctuaryDesign}){
 if(id==='wednesday-addams')return <g>
 <path d="M-23 164Q-47 180-49 213L-37 279L-21 281L-25 221L-3 202L20 213L14 280L31 283L43 215Q44 190 23 164Z" fill="#323844"/>
 <path d="M-38 204L-32 266M30 211L23 267" stroke="#66717d" fill="none"/>
 <path d="M-38 275L-21 277L-20 289Q-31 302-55 303L-60 298L-38 286ZM15 276L32 278L31 289L44 297Q41 305 15 303L10 296Z" fill="#1d2b39"/>
 <path d="M-47 295L-30 291M17 296H36M-33 282L-23 283M18 283L29 284" stroke="#8f939b" fill="none" strokeWidth=".9"/>
 <path d="M-21 137Q-45 158-49 196Q-19 211 31 200L38 176L22 135Z" fill="#313441"/>
 <path d="M-16 149L-35 195M-4 151L-13 200M10 150L15 199M23 151L28 191" stroke="#646571" fill="none" strokeWidth="1"/>
 <g className="illustrated-breath"><path d="M-12 48L-25 60Q-33 70-27 91L-20 118L-23 144Q0 160 25 144L21 117L28 91Q34 70 24 60L12 48Z" fill="#2e3341"/>
 <path d="M-14 49L0 59L14 49L23 58L10 78L0 63L-10 78L-23 58Z" fill="#e5e3d9"/>
 <path d="M0 68V146M-22 111L-14 122M23 111L14 123" stroke="#777382" fill="none" strokeWidth=".8"/>
 {[83,98,113,128,142].map(y=><circle key={y} cy={y} r="1.3" fill="#b8b8bd" strokeWidth=".5"/>)}
 </g></g>;
 if(id==='cozy-study-girl')return <g>
 <path className="illustrated-cloth" d="M-24 3Q-42 22-35 52Q-46 72-33 96Q-43 116-25 135L0 127L24 140Q44 117 34 93Q44 65 33 44L24 1Z" fill="#6d4a40"/>
 <path d="M-28 27Q-36 54-26 77L-30 111M27 25Q38 58 28 78L31 117" stroke="#b28a6b" strokeWidth="1.2" fill="none"/>
 <path d="M-23 155Q-53 159-63 186Q-71 208-47 221L7 232L24 218L3 205L-29 192L-9 186L23 194L34 224L19 278L37 282L57 224Q53 187 26 159Z" fill="#435467"/>
 <path d="M-47 181Q-58 195-33 207L4 217M32 199L43 224L29 268M-13 180L3 183" stroke="#8296a1" strokeWidth="1.4" fill="none"/>
 <path d="M6 214L23 210L31 219Q28 228 13 232L0 227Z" fill="#c8bba4"/>
 <path d="M21 274L38 275L36 289L49 298Q45 304 19 302L16 295Z" fill="#89969b"/><path d="M20 298H43M25 282L35 284" stroke="#d4d6c9" fill="none"/>
 <g className="illustrated-breath"><path d="M-12 53L-29 66Q-41 78-32 102L-23 128L-29 159Q0 180 29 160L22 125L33 98Q41 75 25 64L12 51Z" fill="#bd8470"/>
 <path d="M-29 81Q-34 102-22 122L-19 151L-25 159L-10 167L-7 124L-15 94Z" fill="#9e685e" stroke="none"/>
 <path d="M-18 57Q-1 78 19 55M-21 63Q0 86 22 62" stroke="#e2b29a" strokeWidth="2.1" fill="none"/>
 {[-19,-7,7,19].map(x=><path key={x} d={`M${x} 91l-3 9l6 9l-6 9l6 9l-6 9l3 9`} stroke="#dca78e" strokeWidth="1" fill="none"/>)}
 <path d="M-25 153Q0 168 25 153M-25 158Q0 174 25 158" stroke="#956157" strokeWidth="1.3" fill="none"/>
 </g></g>;
 if(id==='late-night-study-boy')return <g>
 <path d="M-24 169Q-50 181-57 208L-44 276L-27 279L-31 223L-6 202L15 203L42 229L45 282L64 284L61 219Q49 191 24 165Z" fill="#354454"/>
 <path d="M-38 195L-46 210L-35 267M30 207L50 225L54 273M-49 232L-35 239" stroke="#6a7f8c" strokeWidth="1.5" fill="none"/>
 <path d="M-45 273L-27 276L-26 290Q-41 304-64 302L-69 297L-45 285ZM46 279L64 277L66 289L78 298Q74 306 47 303L42 296Z" fill="#476170"/>
 <path d="M-61 297H-39M49 298H72M-40 281L-29 283M50 285L62 284" stroke="#b1c3c0" fill="none"/>
 <g className="illustrated-breath"><path d="M-15 58Q-30 65-35 80Q-42 99-29 120L-21 140L-27 170Q-2 183 30 169L22 138L31 115Q40 93 30 80L11 60Z" fill="#587886"/>
 <path d="M-31 83Q-37 105-21 128L-15 161L-22 170L-5 175L-3 134L-15 96Z" fill="#395768" stroke="none"/>
 <path d="M-20 63Q-1 92 21 67L17 58Q1 72-13 56Z" fill="#2d485b"/>
 <path d="M-22 65Q-6 89 17 74M-13 79V111M10 82V109" stroke="#bacdc9" strokeWidth="1.4" fill="none"/>
 <path d="M-15 132L14 134L22 156L-20 156Z" fill="#416476"/><path d="M-13 134L-18 150M13 136L18 151M-24 165Q0 177 27 165M20 114L13 126M-20 117L-12 127" stroke="#88a4af" strokeWidth="1" fill="none"/>
 </g></g>;
 return null;
}
