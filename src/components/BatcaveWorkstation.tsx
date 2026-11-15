import React from 'react';

/** Fictional Gotham diagrams: ambient scene artwork, not live intelligence. */
export function Batcomputer() {
 return <g className="batcomputer" aria-hidden="true">
  <defs>
   <linearGradient id="bat-glass" x2=".3" y2="1"><stop stopColor="#1d3444"/><stop offset=".4" stopColor="#101f2d"/><stop offset="1" stopColor="#0b1723"/></linearGradient>
   <linearGradient id="bat-metal" x2=".2" y2="1"><stop stopColor="#354a59"/><stop offset=".45" stopColor="#263847"/><stop offset="1" stopColor="#172735"/></linearGradient>
   <linearGradient id="bat-wing" x2="0" y2="1"><stop stopColor="#2a3c4a"/><stop offset="1" stopColor="#162633"/></linearGradient>
   <radialGradient id="bat-screen-light"><stop stopColor="#6fbdcb" stopOpacity=".18"/><stop offset="1" stopColor="#6fbdcb" stopOpacity="0"/></radialGradient>
   <pattern id="bat-map-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#284453" strokeWidth=".5"/></pattern>
  </defs>
  <ellipse cx="530" cy="350" rx="330" ry="220" fill="url(#bat-screen-light)"/>
  <g fill="none" stroke="#293a49" strokeWidth="9"><path d="M240 342V409H470M530 310V405M775 348V409H630"/></g>
  <path d="M142 409H850L876 436H121Z" fill="#1a2936" stroke="#465665"/>
  <path d="M135 436H864" stroke="#78909a" strokeOpacity=".5"/>
  <g stroke="#536a79" strokeWidth="1.5" fill="url(#bat-glass)">
   <path d="M137 207L353 192V354L137 369Z"/><path d="M369 134H694V325H369Z"/><path d="M710 192L878 207V369L710 354Z"/>
  </g>
  <g fill="none" stroke="#8bbbc7" strokeWidth=".8" opacity=".6"><path d="M141 211L349 196M373 138H690M714 196L874 211"/></g>
  <g fill="#79b8c3"><circle cx="382" cy="319" r="1.5"/><circle cx="149" cy="362" r="1.5"/><circle cx="718" cy="348" r="1.5"/></g>
  <g transform="translate(380 145)">
   <path d="M0 0H303V168H0Z" fill="url(#bat-glass)"/><path d="M0 0H303V168H0Z" fill="url(#bat-map-grid)"/>
   <text x="12" y="17" fill="#9dbcc7" fontSize="8" fontFamily="monospace" letterSpacing="2">GOTHAM / DISTRICT ATLAS</text>
   <g fill="#213a48" stroke="#547b89" strokeWidth="1">
    <path d="M50 40L105 32L132 65L111 92L65 88L40 63Z"/><path d="M142 36L201 44L219 78L181 100L134 80Z"/><path d="M64 100L111 104L143 135L121 155L76 145L47 122Z"/><path d="M155 105L204 91L244 109L228 147L173 154L145 134Z"/>
   </g>
   <g fill="none" stroke="#86b7be" strokeWidth=".8" opacity=".65"><path d="M60 50L108 78M76 38L98 87M47 65L118 47M154 45L190 91M144 66L208 60M170 40L185 91M68 113L121 139M85 104L103 149M162 115L220 132M182 104L198 150M156 136L231 115"/></g>
   <path d="M125 25Q115 60 127 90T148 161" fill="none" stroke="#396b84" strokeWidth="5"/>
   <g fill="#c9a16a"><circle cx="87" cy="61" r="3"/><circle cx="189" cy="70" r="3"/><circle cx="192" cy="125" r="3"/></g>
   <circle className="bat-map-pulse" cx="87" cy="61" r="10" fill="none" stroke="#a5d6d8" strokeWidth="1"/>
   <text x="240" y="157" fill="#6f95a4" fontSize="6" fontFamily="monospace">ARCHIVE</text>
  </g>
  <g transform="translate(151 221)" fill="none">
   <text x="0" y="0" fill="#9dbcc7" fontSize="8" fontFamily="monospace" letterSpacing="1">FORENSIC / SONAR</text>
   <g transform="translate(72 64)" stroke="#4d8592" strokeWidth=".8"><circle r="46"/><circle r="30"/><circle r="14"/><path d="M-49 0H49M0-49V49" opacity=".5"/><g className="bat-radar-sweep"><path d="M0 0L-23-40A46 46 0 0 1 0-46Z" fill="#79cbcd" fillOpacity=".12" stroke="none"/><path d="M0 0V-46" stroke="#97e1df"/></g><g fill="#b6dcda" stroke="none"><circle cx="-20" cy="-26" r="2"/><circle cx="29" cy="13" r="2"/><circle cx="-9" cy="32" r="1.5"/></g></g>
   <path d="M131 37H177M131 46H165M131 55H172M131 78h8l5-12l6 24l6-15l5 3h16M0 121H180" stroke="#6798a5" strokeWidth="1"/>
   <text x="133" y="105" fill="#7796a5" fontSize="6" fontFamily="monospace">SIGNAL</text>
  </g>
  <g transform="translate(723 220)">
   <text x="0" y="0" fill="#9dbcc7" fontSize="8" fontFamily="monospace">SURVEILLANCE</text>
   <g fill="#182e3d" stroke="#426170" strokeWidth=".8"><path d="M0 14H65V62H0ZM73 14H139V62H73ZM0 70H65V118H0ZM73 70H139V118H73Z"/></g>
   <g fill="none" stroke="#6a919e" strokeWidth="1"><path d="M4 56L19 35L31 45L48 30L60 49M77 53H91V30H107V42H135M4 107L21 84L47 88L61 113M78 77L133 112M81 111L129 80"/><path d="M21 85h9m-9 0v9M49 109h-9m9 0v-9" stroke="#c3ab7e"/></g>
   <g fill="#85babd"><circle cx="59" cy="20" r="1.5"/><circle cx="133" cy="20" r="1.5"/></g>
  </g>
 </g>;
}

export function BatDesk({tool}:{tool:string}) {
 return <g strokeLinejoin="miter">
  <ellipse cx="558" cy="573" rx="210" ry="23" fill="#050b13" opacity=".38"/>
  <path d="M142 409H354V446L314 497L121 436ZM710 409H850L876 436L776 497L727 446Z" fill="url(#bat-wing)" stroke="#425767" strokeWidth="1.5"/>
  <path d="M354 446H727L776 497H314Z" fill="url(#bat-metal)" stroke="#5a6a77" strokeWidth="1.5"/>
  <path d="M314 497H776V511H314Z" fill="#111e2b" stroke="#3a4c5c"/>
  <path d="M339 511H367L351 589H326ZM722 511H750L766 589H741Z" fill="#182632" stroke="#394a58"/>
  <path d="M669 517H719V568H669Z" fill="#14202d" stroke="#344653"/><path d="M678 529H709M678 544H709" stroke="#59616b"/>
  <path d="M444 464H574L592 487H429Z" fill="#0d1925" stroke="#425968"/>
  <g stroke="#6b8894" opacity=".6">{[0,1,2].map(i=><path key={i} d={`M${450-i*5} ${470+i*5}h122`} strokeDasharray="4 3"/>)}</g>
  <path d="M598 463H640L652 487H606Z" fill="#122433" stroke="#4a6979"/>
  <circle cx="625" cy="475" r="6" fill="none" stroke="#6aa6b1"/>
  <path d="M363 452H718M325 492H765" fill="none" stroke="#8499a5" strokeWidth=".7" opacity=".45"/>
  <path d="M330 504H419M690 504H758" stroke="#77a9b6" strokeOpacity=".65"/>
  <path d="M685 455h22" stroke="#cfaa6b" strokeWidth="2"/>
  {tool==='wrench'&&<g fill="none" stroke="#b7bcc0" strokeWidth="3"><path d="M510 457h43l10-9m-10 9l10 7"/></g>}
 </g>;
}

export function BatEquipment() {
 return <g stroke="#3e5365" strokeWidth="1.5">
  <g data-room-prop="music" transform="translate(125 393)"><path d="M0 0H130V137H0Z" fill="#111c29"/><path d="M9 9H121V126H9Z" fill="#172532"/>{[0,1,2,3].map(i=><g key={i}><path d={`M18 ${25+i*26}H112`} stroke="#425d6e"/><circle cx="103" cy={18+i*26} r="2" fill={i===3?'#ca9b5a':'#72b7c0'}/></g>)}<text x="18" y="118" fill="#8196a3" stroke="none" fontSize="7" fontFamily="monospace">AUDIO / RELAY</text></g>
  <g data-room-prop="tasks" transform="translate(827 70)"><path d="M0 0H112V142H0Z" fill="#101c29"/><path d="M7 7H105V135H7Z" fill="#192b38"/><text x="15" y="25" fill="#acc2c8" stroke="none" fontSize="8" fontFamily="monospace">CASE FILES</text>{[0,1,2].map(i=><g key={i}><path d={`M16 ${43+i*27}h6v6h-6Z`} fill="none" stroke="#b19b77"/><path d={`M30 ${45+i*27}h57m-57 7h39`} stroke="#68828e"/></g>)}<path d="M15 121H96" stroke="#44606e"/></g>
  <g data-room-prop="notes" transform="translate(762 520)"><path d="M-12 58H132V70H-12ZM-3 70L-7 112M124 70L130 112" fill="#182632"/><path d="M0 7L58 12L118 4V55L58 63L0 55Z" fill="#929a9b"/><path d="M58 13V62M9 22L47 27M9 33L47 38M68 25L108 20M68 36L108 31M68 47L99 43" fill="none" stroke="#536576"/></g>
  <path d="M675 371V420M675 371L699 352H719" fill="none" stroke="#556773" strokeWidth="3"/><path d="M690 350H719L728 362H682Z" fill="#253745"/><path d="M689 363H720" stroke="#d8b578" strokeWidth="2"/>
 </g>;
}
