import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
import {ROSTER_RIGS} from '../data/rosterActorRigs';
import {useArticulatedPose,RigPoint} from '../hooks/useArticulatedPose';
import {SanctuaryHeldTool} from './SanctuaryHeldTool';
import {RosterPortrait} from './RosterPortrait';
import {RosterBackLayer,RosterTorso} from './RosterWardrobe';
import './RosterSanctuaryActor.css';

function Legs({id,d}:{id:string;d:SanctuaryDesign}) {
 const stance=ROSTER_RIGS[id].stance;
 const dress=['elsa','rapunzel','moana','hermione-granger','wednesday-addams'].includes(id);
 const pants=['moana','rapunzel'].includes(id)?d.skin:id==='levi-ackerman'?'#d1c8b1':id==='l-lawliet'?'#465264':id==='miles-morales'?'#242b3c':id==='gwen-stacy'?'#252b40':'#303746';
 if(stance==='crouch')return <g><path d="M-23 136Q-52 97-67 121Q-76 135-58 157L-28 169L-10 164L-41 132L-23 158L4 150L23 151L13 174H31L48 146Q50 156 36 140L17 125Z" fill={pants}/><path d="M-55 129L-38 158M26 152L29 160L23 170" stroke="#738091" fill="none"/><path d="M-29 164L-10 163L-8 174L-21 181H-44Q-47 176-37 173ZM13 169H31L40 181Q38 188 30 187H9Z" fill={d.skin}/><path d="M-38 176V180M-32 175V180M-26 174V179M26 180L27 185M31 180L32 185" stroke="#9b7f71" strokeWidth=".7"/></g>;
 const standing=stance==='standing'||stance==='gown';
 const barefoot=id==='moana'||id==='rapunzel';
 return <g>
 <g fill="#0c1926" opacity=".18" stroke="none"><ellipse cx={standing?-25:-56} cy="250" rx="24" ry="3"/><ellipse cx="29" cy="250" rx="22" ry="3"/></g>
 <path d={standing?'M-25 134Q-32 171-27 227H-9L-1 170L12 227H32Q32 176 25 134Z':'M-25 135Q-46 143-54 164L-63 183L-56 230H-37L-38 185L-13 168L8 147L29 153L39 178L23 229H43L59 176Q60 166 48 154L24 133Z'} fill={pants}/>
 <path d={standing?'M-20 148L-18 212M17 150L23 214':'M-34 152L-48 181L-45 215M31 155L46 178L33 215'} fill="none" stroke="#7b8997" opacity=".35" strokeWidth="2"/>
 {dress&&<><path d={id==='moana'?'M-24 132Q-28 170-39 214Q0 225 40 214Q30 170 24 132Z':id==='rapunzel'?'M-25 133Q-46 145-58 165L-52 231Q-29 241-8 231Q17 240 38 229L47 177Q40 153 26 134Z':standing?'M-24 132Q-28 174-46 239Q0 253 48 239Q30 174 24 132Z':'M-25 133Q-44 142-62 169L-34 194Q0 183 36 170L26 134Z'} fill={id==='moana'?'#c5ac82':d.suit}/><path d={id==='moana'?'M-14 148L-27 210M0 150V215M15 148L28 210':id==='rapunzel'?'M-19 148Q-43 177-43 225M-4 151Q-20 180-22 228M12 148Q25 187 24 226':standing?'M-14 148L-27 232M0 150V239M15 148L30 233':'M-19 142L-46 175M-4 145L-30 184M12 142L-11 180'} fill="none" stroke={id==='elsa'?'#b8e7e8':id==='rapunzel'?'#d7a7cd':id==='moana'?'#8c775a':'#666476'} strokeWidth="1.5"/>{id==='moana'&&<><path d="M-29 161H30M-34 185H35M-38 211H39" stroke="#967d5b" strokeWidth="2"/>{[-23,-10,4,17,30].map(x=><path key={x} d={`M${x} 207v13`} stroke="#ddc8a1" strokeWidth="2"/>)}<path d="M-23 139L15 155L30 140" fill="#ae5145"/></>}</>}
 <g fill={barefoot?d.skin:id==='gwen-stacy'?'#6ba9b1':id==='elsa'?'#b0d8e1':'#233143'}>
 <path d={barefoot?(standing?'M-25 229Q-18 232-13 229L-13 239Q-24 249-39 248Q-44 245-38 241L-26 236Z':'M-55 228Q-46 231-41 228L-39 239Q-52 250-69 248Q-74 244-67 241L-55 235Z'):(standing?'M-26 221Q-19 224-11 221L-11 238Q-19 248-38 248Q-44 247-40 242L-26 234Z':'M-57 219Q-48 223-39 219L-37 238Q-49 249-70 248Q-77 247-72 242L-56 233Z')}/>
 <path d={barefoot?(standing?'M15 230Q22 233 29 229L28 238Q40 241 39 247Q28 250 14 247Q11 243 15 238Z':'M28 228Q36 232 42 228L39 237Q51 242 47 248Q34 251 22 247L26 238Z'):(standing?'M14 222Q22 226 30 221L29 235Q39 239 41 245Q41 250 15 249Q10 246 14 236Z':'M27 220Q36 223 43 219L40 235Q50 240 50 246Q46 251 22 249Q18 246 25 236Z')}/>
 </g>
 {barefoot?<g fill="none" stroke="#986b53" strokeWidth=".7"><path d={standing?'M-35 242L-32 246M-29 241L-27 246M-23 240L-21 244M32 243V247M27 242V247M21 242V247':'M-66 243L-63 247M-59 242L-57 246M-53 241L-51 245M42 244V248M36 243V248M30 242V247'}/></g>:<g fill="none" stroke="#9caeba" opacity=".3" strokeWidth=".9"><path d={standing?'M-36 245Q-23 246-15 239M17 245H36M-24 232L-14 235M17 234L28 233':'M-68 245Q-52 246-42 239M25 246H45M-53 232L-42 235M29 234L40 232'}/></g>}
 {id==='elsa'&&<path d="M-25 187Q-35 220-42 239Q0 251 44 239L26 187L29 234L15 240L0 236L-15 242L-30 236Z" fill="#83c6da" stroke="#92cedc" strokeWidth=".8"/>}
 {id==='miles-morales'&&<path d="M-39 243H-16M16 244H40M-24 223L-15 237M17 224L27 238" stroke="#c84a64" strokeWidth="2"/>}
 {id==='gwen-stacy'&&<path d="M-55 218L-44 234M-43 218L-54 233M28 221L40 234M41 221L28 234" stroke="#b7dcda" strokeWidth="1.3"/>}
 {id==='levi-ackerman'&&<g fill="none" stroke="#615147" strokeWidth="3"><path d="M-50 174L-36 186M-52 181L-39 193M32 178L46 185M30 185L43 193M-53 212L-45 233M32 214L31 234"/></g>}
 </g>;
}
function Sleeve({id,d,shoulder,elbow,wrist,near,tool}:{id:string;d:SanctuaryDesign;shoulder:RigPoint;elbow:RigPoint;wrist:RigPoint;near:boolean;tool:string}) {
 const armColor=id==='levi-ackerman'?'#8b7359':id==='moana'?d.skin:id==='gwen-stacy'?'#e5e4e3':id==='elsa'?'#9acbdc':d.suit;
 const gloved=['miles-morales','gwen-stacy'].includes(id),skin=gloved?(id==='gwen-stacy'?'#e5e5e3':'#252b3c'):d.skin;
 const length=(a:RigPoint,b:RigPoint)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
 const angle=(a:RigPoint,b:RigPoint)=>Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI-90;
 const upper=length(shoulder,elbow),lower=length(elbow,wrist),width=['elsa','gwen-stacy','rapunzel','moana','wednesday-addams'].includes(id)?7:9;
 return <g className={`roster-arm ${near?'roster-near':'roster-far'}`} style={{transformOrigin:`${shoulder[0]}px ${shoulder[1]}px`}} data-joint={near?'near':'far'}>
 <g transform={`translate(${shoulder}) rotate(${angle(shoulder,elbow)})`}>
 <path d={`M-${width} 0Q-${width+4} 9 -${width-2} ${upper}Q0 ${upper+5} ${width-2} ${upper}Q${width+4} 10 ${width} 0Q0-5-${width} 0Z`} fill={armColor}/>
 <path d={`M${width-2} 5Q${width+1} 18 ${width-3} ${upper-1}L${width-6} ${upper-1}Q${width-2} 20 ${width-5} 6Z`} fill="#142333" opacity=".14" stroke="none"/>
 <path d={`M-${width-2} 4Q-${width} 16 -${width-4} ${upper-3}`} fill="none" stroke={id==='moana'?'#edbd8c':'#b7c3c8'} opacity=".3" strokeWidth="1.7"/>
 {id==='miles-morales'&&<path d={`M-6 7Q0 12 6 7M-6 16Q0 21 6 16M0 3V${upper}`} stroke="#9e4259" fill="none" strokeWidth=".7"/>}
 {id==='gwen-stacy'&&<path d={`M-6 9L6 20L-6 31M6 9L-6 20L6 31`} stroke="#ba6990" fill="none" strokeWidth="1"/>}
 {id==='rapunzel'&&<><path d="M-8 1Q-15 11-8 21H8Q15 11 8 1Z" fill="#c797c1"/><path d="M-4 2V20M4 2V20" stroke="#e7bfd8" strokeWidth="2"/></>}
 </g>
 <g transform={`translate(${elbow}) rotate(${angle(elbow,wrist)})`}>
 <path d={`M-${width-1}-2Q-${width+2} 8-5 ${lower}H5Q${width+2} 8 ${width-1}-2Q0 3-${width-1}-2Z`} fill={armColor}/>
 <path d={`M-${width-2} 5L-3 ${lower-4}`} stroke="#b8c4c9" opacity=".25" fill="none"/>
 {['cozy-study-girl','late-night-study-boy','l-lawliet'].includes(id)&&<path d={`M-5 ${lower-8}H5M-5 ${lower-5}H5`} fill="none" stroke="#879498" opacity=".7"/>}
 <g transform={`translate(0 ${lower}) rotate(${-angle(elbow,wrist)})`}>
 <path d="M-6-3Q-10-1-8 4L-5 8Q1 10 6 5L7 1L2-2L-2-4Z" fill={skin}/><path d="M-5 1L3 3M-4 4L2 6M0-2L-1 2" stroke={gloved?'#a55c78':'#986e5a'} strokeWidth=".7" fill="none"/>
 {(near||tool==='sticks')&&<g className={`roster-tool tool-${tool}`}>
 {id==='miles-morales'&&tool==='spark'?<g fill="none" stroke="#e4cc81" strokeWidth="1.8"><path d="M-12-8L-22-22L-15-20L-23-37M8-5L18-17L12-19L20-30M-3-12L3-26L-3-27L1-43"/></g>:<SanctuaryHeldTool kind={tool} color={d.palette[2]} frame={0}/>}
 </g>}
 </g></g>
 </g>;
}
export function RosterSanctuaryActor({id,d,tool,layer}:{id:string;d:SanctuaryDesign;tool:string;layer:'body'|'hands'}) {
 const rig=ROSTER_RIGS[id];
 const near=rig.near[tool]||[[44,111],[8,148]],far=rig.far?.[tool]||[[-45,114],[-59,153]];
 const joints=useArticulatedPose([...far,...near] as RigPoint[],`${id}:${tool}`,layer==='hands');
 return <g className={`roster-actor roster-${id} roster-action-${tool}`} data-actor={layer==='body'?id:undefined} data-rig-layer={layer} transform={`translate(${rig.x} ${rig.y}) scale(${rig.scale})`} style={{'--roster-breath':`${rig.breath}s`,'--roster-blink':`${(rig.breath*1.73).toFixed(2)}s`} as React.CSSProperties} stroke="#202a38" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none">
 {layer==='body'?<><RosterBackLayer id={id} d={d}/><Legs id={id} d={d}/><g className="roster-breathe"><RosterTorso id={id} d={d}/><RosterPortrait id={id} d={d}/></g></>:<g className="roster-breathe"><Sleeve id={id} d={d} tool={tool} near={false} shoulder={[rig.shoulders[0],65]} elbow={joints[0]} wrist={joints[1]}/><Sleeve id={id} d={d} tool={tool} near shoulder={[rig.shoulders[1],65]} elbow={joints[2]} wrist={joints[3]}/></g>}
 </g>;
}
