import React from 'react';
export function SanctuaryHeldTool({kind,color,frame}:{kind:string;color:string;frame:number}) {
 const wave=[0,.5,1,.5,0,-.5,-1,-.5][frame%8];
 const ink='#192331';
 switch(kind) {
 case 'wrench': return <path d="M0 8V-17L-7-24V-32L-3-27H3L7-32V-24L0-17" fill="none" stroke="#bed0d5" strokeWidth="5"/>;
 case 'brush': case 'pencil': case 'quill': return <g><path d="M-3-24L4 16" stroke="#e9bd79" strokeWidth="4"/><path d="M4 16L5 23" stroke={color} strokeWidth="3"/>{kind==='quill'&&<path d="M-3-20Q-26-52-3-42Q10-38-3-20" fill="#e9d8b3"/>}</g>;
 case 'cup': return <g fill="#e4d4b6" stroke={ink} strokeWidth="2"><path d="M-12-12H10V7Q0 18-12 7Z"/><path d="M10-8Q26-10 21 3L10 6" fill="none"/><path d="M-5-17Q-12-25-5-34" stroke="#d7d9cc" fill="none"/></g>;
 case 'scanner': return <g><rect x="-17" y="-24" width="30" height="40" rx="4" fill="#263d49" stroke="#9cb9c3" strokeWidth="2"/><path d="M-10-12H7M-10-4H4M-10 4H9" stroke={color} strokeWidth="3"/></g>;
 case 'spray': return <g><rect x="-9" y="-14" width="18" height="33" rx="3" fill="#c95282" stroke={ink} strokeWidth="2"/><path d="M-3-14V-21H5" stroke="#d9e1dd" strokeWidth="5"/><path d="M8-22L33-29M8-22H36M8-22L33-15" stroke={color} opacity=".65"/></g>;
 case 'sticks': case 'cymbal': return <path d="M-10 14L17-31" stroke="#e7bd8e" strokeWidth="5"/>;
 case 'blade': return <path d="M0 15V-10L-7-12V-61L4-70L7-12H0M-12-8H12" fill="#c6d3cb" stroke="#6f8490" strokeWidth="3"/>;
 case 'sugar': return <path d="M-5-5H4V4H-5Z" fill="#f9eee0" stroke="#b4c0c5" strokeWidth="2"/>;
 case 'snow': return <g stroke="#d9fcff" strokeWidth="3"><path d="M0-46V0M-23-23H23M-16-39L16-7M16-39L-16-7M-7-39L0-32L7-39M-7-7L0-14L7-7"/></g>;
 case 'ribbon': return <path d="M0 0Q44-20 25-45Q7-63 25-88" fill="none" stroke="#9bdcef" strokeWidth="5" opacity=".8"/>;
 case 'lantern': return <g><path d="M0 0V-14" stroke="#f5d891"/><path d="M-17-45H17L13-14H-13Z" fill="#eebc71" stroke="#a97b65" strokeWidth="2"/><path d="M-5-40V-20" stroke="#fff1b8" strokeWidth="6"/></g>;
 case 'paddle': return <g transform={`rotate(${25+wave*8})`}><path d="M0-65V65" stroke="#c0905c" strokeWidth="6"/><path d="M0 25Q-27 62 0 88Q27 62 0 25" fill="#af784d" stroke="#e2bb82" strokeWidth="3"/></g>;
 case 'compass': return <g><circle cy="-8" r="17" fill="#c6a77b" stroke="#294a55" strokeWidth="3"/><path d="M0-22L5-8L0 7L-5-8Z" fill="#e7e1c3"/></g>;
 case 'wand': return <g><path d="M-3 12L15-40" stroke="#b7936b" strokeWidth="4"/><path d="M15-53V-43M5-43L12-40M24-43L19-40" stroke={color} strokeWidth="3"/></g>;
 case 'bow': return <g><path d="M-45-20L45 20" stroke="#b08a67" strokeWidth="4"/><path d="M-44-15L44 24" stroke="#e6d7bd" strokeWidth="2"/></g>;
 case 'horse': return <path d="M-20 3L-12-8H8L13-24L23-17L18-2L12 3V19H7V5H-9V19H-14V5Z" fill="#bc9165" stroke="#674c39" strokeWidth="2"/>;
 case 'spoon': return <g><path d={`M0 16Q${-12-wave*13} -9 ${2-wave*10} -20`} stroke="#c3d4cd" strokeWidth="4" fill="none"/><ellipse cx={4-wave*10} cy="-28" rx="8" ry="13" fill="#c3d4cd"/></g>;
 case 'hologram': return <g transform={`scale(${1+wave*.14} 1)`} stroke={color} fill="#366778" strokeWidth="2"><path d="M-9-63H9L19-53L30-25L20-20L10-40V-16L16 8H4L0-9L-5 8H-17L-11-16V-40L-21-20L-31-25L-19-53Z"/><ellipse cy="16" rx="38" ry="8" fill="none"/><circle cy="-42" r="5" fill={color}/></g>;
 case 'orb': case 'infinity': case 'spark': return <g fill="none" stroke={color}><circle cy="-30" r="24" strokeWidth="2"/><ellipse cy="-30" rx="33" ry="10" strokeWidth="2" transform="rotate(-25 0 -30)"/><path d="M-17-30L-5-45L0-22L15-36" strokeWidth="4"/><circle cy="-30" r="35" strokeWidth="6" opacity=".12"/></g>;
 default: return null;
 }
}
