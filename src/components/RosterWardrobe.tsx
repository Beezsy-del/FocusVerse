import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
export function RosterBackLayer({id,d}:{id:string;d:SanctuaryDesign}) {
 if(id==='levi-ackerman')return <g><path className="roster-cloth" d="M-30 56Q-56 81-50 143L-61 213L-30 204L-8 217L18 203L49 211L39 89L26 56Z" fill="#394c42"/><path d="M-33 76L-41 192M29 78L38 194" fill="none" stroke="#6e8068"/></g>;
 if(id==='elsa')return <g className="roster-cloth"><path d="M-23 65Q-42 141-65 243Q0 265 67 244L23 65Z" fill="#8ac6db" fillOpacity=".28" stroke="#accfdd" strokeOpacity=".45"/><path d="M-31 94L-48 236M32 98L53 237" fill="none" stroke="#c0e6e8" strokeOpacity=".35"/>{[-39,-20,22,42].map((x,i)=><path key={x} d={`M${x} ${150+i%2*36}v12m-6-6h12m-10-4l8 8m0-8l-8 8`} stroke="#c3e7ed" opacity=".5"/>)}</g>;
 if(['rapunzel','moana','hermione-granger','cozy-study-girl'].includes(id))return <g className="roster-cloth"><path d={id==='rapunzel'?'M-24 3Q-55 41-45 138Q-37 180-54 214Q-51 254 32 248Q71 244 56 219Q43 207 34 218Q20 237-10 223L19 39Z':id==='moana'?'M-27 0Q-49 21-41 44Q-51 67-38 81Q-48 108-28 131L-6 118L15 135L38 119Q49 99 38 77Q50 59 35 39L28 1Z':'M-27 3Q-47 31-38 59Q-48 80-31 99Q-41 119-21 139L0 123L24 137Q46 119 34 99Q46 75 34 54Q43 23 24 1Z'} fill={d.hair}/><path d={id==='rapunzel'?'M-30 28Q-43 107-28 160Q-13 207-33 223Q-23 242 30 237':'M-29 25Q-37 56-26 77Q-35 106-22 121M29 23Q39 52 28 75Q40 105 24 120'} fill="none" stroke={id==='rapunzel'?'#f3dc8c':'#b18b6a'} opacity=".45" strokeWidth="2"/></g>;
 return null;
}
export function RosterTorso({id,d}:{id:string;d:SanctuaryDesign}) {
 const outlines:Record<string,string>={
 'miles-morales':'M-13 49L-28 59Q-38 63-35 85L-26 116L-25 142Q0 151 27 141L25 113L35 84Q38 62 27 58L12 49Z',
 'gwen-stacy':'M-12 48L-24 60Q-31 63-31 80L-22 113L-24 139Q0 151 25 139L22 111L31 79Q34 64 24 59L12 48Z',
 'gojo-satoru':'M-17 46L-29 57Q-38 63-35 87L-28 116L-28 141Q0 153 29 142L28 113L35 83Q38 61 28 57L17 46Z',
 'levi-ackerman':'M-14 50L-30 61Q-36 64-34 83L-28 108L-29 140Q0 147 29 139L28 107L33 82Q36 64 29 60L14 50Z',
 'l-lawliet':'M-13 49L-28 61Q-42 65-38 89L-31 114L-35 143Q0 155 34 140L29 108L35 86Q38 67 27 62L12 49Z',
 'elsa':'M-13 51L-23 63L-29 74L-19 114L-22 137Q0 148 23 137L18 112L28 73L22 63L12 51Z',
 'rapunzel':'M-12 50L-25 60Q-35 65-30 85L-20 112L-22 140Q0 151 23 140L20 110L29 83Q34 65 24 60L12 50Z',
 'moana':'M-13 50L-29 62L-31 88L-22 111L-24 137Q0 147 25 137L23 111L30 87L28 62L12 50Z',
 'hermione-granger':'M-13 49L-29 61Q-38 68-33 89L-27 111L-32 145L0 151L33 145L26 110L34 85Q37 66 28 61L13 49Z',
 'wednesday-addams':'M-12 49L-26 62Q-33 69-29 87L-23 111L-27 140Q0 149 28 140L22 110L31 84Q33 68 26 62L12 49Z',
 'officer-k':'M-16 48L-32 58Q-42 66-38 88L-32 116L-37 145L0 153L37 144L31 112L38 84Q41 63 31 58L16 48Z',
 'neo':'M-13 48L-28 59Q-36 65-32 87L-26 112L-32 145Q0 153 33 144L27 110L33 83Q36 64 27 58L13 48Z',
 'cozy-study-girl':'M-14 52L-29 62Q-41 70-35 90L-29 114L-30 143Q0 156 31 143L28 113L35 86Q38 68 28 61L14 52Z',
 'late-night-study-boy':'M-14 50L-30 62Q-39 69-35 92L-29 116L-30 144Q0 153 32 143L28 111L36 85Q40 67 29 61L14 50Z',
 };
 const fill=id==='levi-ackerman'?'#8b7359':id==='moana'?d.skin:d.suit;
 return <g>
 <path d={outlines[id]} fill={fill}/>
 <path d="M-19 64Q-25 78-22 93L-16 107L-20 137L-29 140L-27 109Q-37 78-29 66Z" fill="#152434" opacity=".12" stroke="none"/>
 <path d="M10 67Q25 74 24 96L20 112L25 138" fill="none" stroke={id==='moana'?'#e3b78b':'#cbd7d5'} opacity=".16" strokeWidth="1.5"/>

 <path d="M-28 68Q-34 81-24 105L-21 132M27 69Q33 86 24 108L22 133" stroke="#0b1928" strokeOpacity=".22" strokeWidth="4" fill="none"/>
 {id==='miles-morales'&&<><path d="M-26 63L-19 82L-24 111M25 63L18 82L24 111" stroke="#b9445d" strokeWidth="3" fill="none"/><g fill="none" stroke="#a44158" strokeWidth=".8"><path d="M-27 71Q0 91 27 71M-28 85Q0 103 28 85M-25 100Q0 115 25 100M-18 61L-12 110M18 61L12 110"/></g><g stroke="#cf4b63" strokeWidth="2.3" fill="#cf4b63"><ellipse cy="90" rx="3" ry="9"/><path d="M-3 84L-14 77L-21 65M3 84L14 77L21 65M-3 89L-19 84L-25 75M3 89L19 84L25 75M-3 94L-19 102L-23 115M3 94L19 102L23 115M-2 98L-11 112L-9 125M2 98L11 112L9 125" fill="none"/></g><path d="M-24 138Q0 145 24 138" stroke="#734157" fill="none"/></>}
 {id==='gwen-stacy'&&<><path d="M-28 79L-12 96L-10 140H-24L-20 112ZM28 79L12 96L10 140H24L20 112Z" fill="#252b40"/><path d="M-20 64L-12 80L0 87L12 80L20 64" fill="none" stroke="#bd6990" strokeWidth="3"/><path d="M-25 69L-19 83M25 69L19 83" stroke="#8e416a"/></>}
 {id==='gojo-satoru'&&<><path d="M-18 60L-20 42Q0 50 20 42L18 63L7 70H-5Z" fill="#25283d"/><path d="M-16 49L-12 61M15 49L12 62M5 68L9 139M-25 98L-17 108M19 115L26 108" fill="none" stroke="#62657c"/><circle cx="10" cy="70" r="2" fill="#aca999"/><path d="M-23 134Q0 143 25 134" fill="none" stroke="#43495f"/></>}
 {id==='levi-ackerman'&&<><path d="M-16 55L0 68L16 55L12 127H-12Z" fill="#d1c9b6"/><path d="M-12 53L0 62L12 53L8 76L0 72L-8 77Z" fill="#ede5cf"/><path d="M-29 63L-15 84L-23 96L-11 126M29 63L15 84L23 96L11 126" fill="none" stroke="#bea17c"/><path d="M-28 92L27 127M28 92L-27 127M-26 130H26" stroke="#433b35" strokeWidth="4"/><path d="M-29 75H-17V91H-29Z" fill="#c7caba"/><path d="M-26 78L-19 87M-19 78L-26 87" stroke="#5b7892"/><path d="M-5 128H5V137H-5Z" fill="#a6a99d"/></>}
 {id==='l-lawliet'&&<><path d="M-16 56Q0 69 16 56M-29 80L-24 105L-28 121M25 91L18 114M-24 137Q-9 142 1 136Q16 145 29 136" fill="none" stroke="#a5a7ac"/><path d="M-21 61Q0 76 21 61" fill="none" stroke="#f2f0e3" strokeWidth="2"/></>}
 {id==='elsa'&&<><path d="M-26 69L0 81L26 69L18 125L0 141L-18 125Z" fill="#73b4c9"/><path d="M-17 79L-10 123M-7 82L-2 133M7 82L5 132M17 78L15 119" stroke="#c1e9e9"/><path d="M-25 69L0 79L25 69" stroke="#e0f5ee" strokeWidth="2"/>{[-12,-4,5,13].map((x,i)=><path key={x} d={`M${x} ${91+i%2*12}l2 5l-2 5l-2-5Z`} fill="#d2eff1" stroke="none"/>)}</>}
 {id==='rapunzel'&&<><path d="M-22 132L-18 143M-8 135L-7 145M6 135L8 144M19 132L22 142" stroke="#e0b4d2" strokeWidth=".8"/><path d="M-21 66Q0 82 21 66L14 137L0 145L-15 137Z" fill="#9b6699"/><path d="M-10 83L10 94L-10 105L10 116L-9 130M10 83L-10 94L10 105L-10 116L9 130" fill="none" stroke="#edc6d0"/><path d="M-24 63Q0 80 24 63" stroke="#eed1da" strokeWidth="3" fill="none"/><path d="M-17 73L-13 135M17 73L13 135" stroke="#cf9ac2"/></>}
 {id==='moana'&&<><path d="M-30 75Q0 85 30 75L24 112Q0 123-23 111Z" fill="#b95849"/><path d="M-28 82L-15 91L0 82L14 91L28 82M-25 102L-12 110L0 101L12 110L25 101" fill="none" stroke="#eac4a1"/><path d="M-16 57Q0 101 16 57" fill="none" stroke="#dcc9aa" strokeWidth="2"/><path d="M0 79Q-10 87 0 97Q10 88 0 79Z" fill="#69b7a6"/><path d="M-24 128Q0 138 26 127V140Q0 147-25 139Z" fill="#a4443e"/></>}
 {id==='hermione-granger'&&<><path d="M-13 55L0 67L13 55L10 130H-10Z" fill="#c9c5b8"/><path d="M-11 56L0 64L11 56L9 72L0 65L-9 72Z" fill="#e9e2d1"/><path d="M0 65L4 73L2 96L-3 92L-3 73Z" fill="#974c43"/><path d="M-2 76L3 79M-2 85L2 88" stroke="#d4ad63"/><path d="M-27 64L-15 83L-23 96L-11 136M27 64L15 83L23 96L11 136" fill="none" stroke="#877582"/><path d="M15 88H25V100L20 105L15 100Z" fill="#a86c49"/><path d="M18 91H22V99H18Z" fill="#d1b274"/></>}
 {id==='wednesday-addams'&&<><path d="M-20 57L-9 77L0 62L9 77L20 57L10 53L0 61L-10 53Z" fill="#e7e2d7"/><path d="M0 76V141" stroke="#6f6979"/>{[84,97,110,123,136].map(y=><circle key={y} cy={y} r="1.6" fill="#c0b9c4"/>)}<path d="M-24 109L-15 117M24 110L15 119" stroke="#515263"/></>}
 {id==='officer-k'&&<><path d="M-31 59L-19 47L0 62L18 47L31 58L20 86L0 68L-21 86Z" fill="#a89c86"/>{[-23,-16,16,23].map(x=><path key={x} d={`M${x} 56l-3 8l5 7l-3 6`} stroke="#d0c2a5" fill="none" strokeWidth="2"/>)}<path d="M1 74V145M-27 105H-12V120H-27M13 105H28V120H13" stroke="#7f7668" fill="none"/><path d="M-24 135L-13 132M14 132L25 136" stroke="#262e33"/></>}
 {id==='neo'&&<><path d="M-14 49L0 57L14 49V69L0 64L-14 69Z" fill="#3c4a44"/><path d="M3 68V144" stroke="#657369"/>{[79,92,105,118,131].map(y=><circle key={y} cx="6" cy={y} r="1.1" fill="#a8b4a6"/>)}<path d="M-26 90L-17 113M26 90L17 113" stroke="#3f5148"/></>}
 {id==='cozy-study-girl'&&<><path d="M-19 57Q0 77 19 57M-20 62Q0 82 20 62" stroke="#e3b493" strokeWidth="2" fill="none"/>{[-19,-7,7,19].map(x=><path key={x} d={`M${x} 82l-3 8l6 8l-6 8l6 8l-6 8l3 9`} stroke="#d79d85" fill="none" strokeWidth="1.2"/>)}<path d="M-28 136Q0 148 29 136" stroke="#8f5f59" strokeWidth="3" fill="none"/></>}
 {id==='late-night-study-boy'&&<><path d="M-24 62Q0 91 24 62L15 55Q0 73-15 55Z" fill="#344d61"/><path d="M-11 73V102M10 73V98" stroke="#c0ccc7" strokeWidth="1.6"/><path d="M-17 114H18L22 134H-22Z" fill="#466378"/><path d="M-16 115L-20 128M17 115L20 128M-27 140H28" stroke="#8da4ac" fill="none"/></>}
 </g>;
}
