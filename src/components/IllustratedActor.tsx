import React from 'react';
import {SanctuaryDesign} from '../data/sanctuaries';
import {ROSTER_RIGS} from '../data/rosterActorRigs';
import {ILLUSTRATED_RIGS} from '../data/illustratedActorRigs';
import {useArticulatedPose,RigPoint} from '../hooks/useArticulatedPose';
import {CompanionPhase} from '../hooks/useCompanionPerformance';
import {IllustratedBody} from './IllustratedBody';
import {IllustratedPortrait} from './IllustratedPortrait';
import {SanctuaryHeldTool} from './SanctuaryHeldTool';
import {IllustratedHand, HandGesture} from './IllustratedHand';
import './IllustratedActor.css';
function Limb({id,d,shoulder,elbow,wrist,near,tool,active}:{id:string;d:SanctuaryDesign;shoulder:RigPoint;elbow:RigPoint;wrist:RigPoint;near:boolean;tool:string;active:boolean}){
 const masked=['miles-morales','gwen-stacy'].includes(id);
 const fill=id==='miles-morales'?'#242733':id==='cozy-study-girl'?'#bd8470':id==='late-night-study-boy'?'#587886':id==='wednesday-addams'?'#2e3341':id==='moana'?d.skin:id==='elsa'?'#97cdd8':id==='rapunzel'?'#b17fae':id==='hermione-granger'?'#4f4552':id==='levi-ackerman'?'#937b5d':id==='officer-k'?'#514d45':id==='neo'?'#22262d':id==='tony-stark'?'#b05247':id==='gwen-stacy'?'#e2e6e1':id==='l-lawliet'?'#d9dedb':d.suit;
 const glove=id==='tony-stark'?'#ae5147':id==='gwen-stacy'?'#eeeae3':id==='miles-morales'?'#222530':d.skin;
 const w=id==='tony-stark'?16:id==='moana'?10:['gwen-stacy','elsa','rapunzel','hermione-granger','wednesday-addams','cozy-study-girl'].includes(id)?7:9;
 const len=(a:RigPoint,b:RigPoint)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
 const angle=(a:RigPoint,b:RigPoint)=>Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI-90;
 const upper=len(shoulder,elbow),lower=len(elbow,wrist);
 const holding=active&&(near||id==='gwen-stacy');
 const gesture:HandGesture=active&&tool==='headphones'&&near?'ear'
   :active&&tool==='type'?'keys'
   :holding&&['snow','ribbon','spark','infinity'].includes(tool)?'palm'
   :active&&tool==='cup'&&!near?'support'
   :holding?'grip':'rest';
 const wristTilt=gesture==='rest'?Math.max(-35,Math.min(35,angle(elbow,wrist)*.5)):0;
 const crease=masked?'#667c91':id==='tony-stark'?'#713e3b':'#96715f';
 return <g data-joint={near?'near':'far'} className={`illustrated-arm arm-${near?'near':'far'}`} style={{transformOrigin:`${shoulder[0]}px ${shoulder[1]}px`}}>
 <g transform={`translate(${shoulder}) rotate(${angle(shoulder,elbow)})`}>
 <path d={`M-${w} 1Q-${w+4} 11 -${w+1} 23Q-${w-2} ${upper-12} -${w-3} ${upper}Q0 ${upper+5} ${w-3} ${upper}Q${w} ${upper-17} ${w+2} 22Q${w+4} 6 ${w} 1Q0-5-${w} 1Z`} fill={fill}/>
 <path d={`M${w-2} 8Q${w+1} 20 ${w-4} ${upper-1}L${w-7} ${upper-3}Q${w-3} 20 ${w-5} 10Z`} fill="#142537" opacity=".24" stroke="none"/>
 <path d={`M-${w-2} 7Q-${w} 20 -${w-4} ${upper-7}`} stroke="#bed0d4" opacity=".4" fill="none"/>
 {id==='rapunzel'&&<><path d="M-8 0Q-15 12-8 25L7 26Q15 11 8 0Z" fill="#c997be"/><path d="M-4 2L-5 22M3 2L4 23" stroke="#ebc2d5" strokeWidth="2"/></>}
 {id==='tony-stark'&&<><path d={`M-17 4Q-21-8 0-10Q22-7 19 9L14 25L-15 23Z`} fill="#c05f4c"/><path d={`M-11 28L11 29L9 ${upper-8}L-8 ${upper-6}Z`} fill="#c4a16b"/><path d="M-9 2Q0-3 10 3M-7 12L8 14" stroke="#ebae77" fill="none"/></>}
 {id==='miles-morales'&&<g fill="none" stroke={id==='miles-morales'?'#ae4158':'#ba678f'} strokeWidth=".7"><path d={`M-6 10Q0 16 7 10M-7 22Q0 28 7 22M-6 34Q0 40 6 34M0 4V${upper-4}`}/></g>}
 {id==='gwen-stacy'&&<g><path d={`M-7 9Q-3 14-3 25L-4 ${upper-5}L-7 ${upper-3}Q-10 23-7 9Z`} fill="#d38bad" stroke="none"/><path d={`M-8 19L-3 23M-8 29L-3 33M-7 39L-4 43M-6 12L-5 ${upper-5}`} stroke="#75aeba" strokeWidth=".65" fill="none"/></g>}
 </g>
 <g transform={`translate(${elbow}) rotate(${angle(elbow,wrist)})`}>
 <path d={`M-${w-3}-3Q-${w+1} 5 -${w} 17Q-6 ${lower-12}-5 ${lower}H5Q5 ${lower-14} ${w-1} 17Q${w+2} 4 ${w-3}-3Q0 1-${w-3}-3Z`} fill={fill}/>
 <path d={`M${w-3} 7Q${w-1} 17 3 ${lower-3}`} stroke="#142738" opacity=".3" strokeWidth="2" fill="none"/>
 <path d={`M-${w-4} 5L-3 ${lower-8}`} stroke="#c5d7d7" opacity=".35" fill="none"/>
 {id==='tony-stark'&&<><circle r="7" fill="#443b42"/><circle r="3.5" fill="#b39770"/><path d={`M-14 11L14 11L11 ${lower-9}L7 ${lower-3}L-8 ${lower-3}L-12 ${lower-10}Z`} fill="#ad4f46"/><path d={`M-6 20H7M-6 28H7M-5 36H6M-4 44H5`} stroke="#713e3b" strokeWidth="1"/><path d={`M-6 16L-3 ${lower-8}`} stroke="#e6a477" fill="none"/></>}
 {['l-lawliet','cozy-study-girl','late-night-study-boy'].includes(id)&&<path d={`M-6 ${lower-9}L5 ${lower-7}M-5 ${lower-5}H5M-5 9L2 14`} stroke="#8298a6" fill="none"/>}
 {masked&&<><path d={`M-5 ${lower-13}H6M-4 ${lower-7}H5`} stroke={id==='miles-morales'?'#bd4b61':'#d28caa'} fill="none"/><path d={`M-3 ${lower-12}h6v4h-6Z`} fill="#6a7b8b" strokeWidth=".5"/></>}
 <g transform={`translate(0 ${lower}) rotate(${-angle(elbow,wrist)+wristTilt})`}>
 <IllustratedHand gesture={gesture} fill={glove} crease={crease}/>
 {active&&(near||id==='gwen-stacy')&&<g className={`illustrated-tool tool-${tool}`}>{id==='miles-morales'&&tool==='spark'?<g stroke="#e2c681" fill="none" strokeWidth="1.4"><path d="M-10-8L-21-25L-14-22L-20-36M6-9L16-25L11-23L15-39M-1-13L2-30L-3-28L0-44"/></g>:<g transform={id==='levi-ackerman'&&tool==='cup'?'translate(0 12)':id==='cozy-study-girl'&&tool==='cup'?'translate(-14 -2)':undefined}><SanctuaryHeldTool kind={tool==='reactor'?'pencil':tool==='diagnostics'?'scanner':tool} color={d.palette[2]} frame={0}/></g>}</g>}
 <IllustratedHand gesture={gesture} fill={glove} crease={crease} foreground/>
 </g></g></g>;
}
export function IllustratedActor({id,d,tool,layer,phase='action',variation=0,appearance='masked'}:{id:string;d:SanctuaryDesign;tool:string;layer:'body'|'hands';phase?:CompanionPhase;variation?:number;appearance?:'masked'|'unmasked'}){
 const rig=ILLUSTRATED_RIGS[id],active=phase==='action';
 const pose=active?(rig.poses[tool]||rig.idle):phase==='observe'?rig.observe:rig.idle;
 const points=useArticulatedPose([...pose.far,...pose.near,[pose.head[0],pose.head[1]],[pose.head[2],0]],`${id}:${tool}:${phase}:${variation}`,true);
 return <g className={`illustrated-actor illustrated-${id} illustrated-${phase} illustrated-tool-${tool}`} data-actor={layer==='body'?id:undefined} data-rig-layer={layer} data-art-version="3" data-phase={phase} transform={`translate(${rig.x} ${rig.y}) scale(${rig.scale})`} stroke="#243041" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none" style={{'--figure-breath':`${ROSTER_RIGS[id]?.breath||9}s`} as React.CSSProperties}>
 {layer==='body'?<><defs><linearGradient id={`figure-suit-${id}`} x1="0" x2="1" y2=".6"><stop stopColor={id==='miles-morales'?'#232630':d.suit}/><stop offset=".45" stopColor={id==='miles-morales'?'#303540':d.suit}/><stop offset="1" stopColor={id==='miles-morales'?'#171c25':d.palette[0]}/></linearGradient></defs>
 <ellipse cy={rig.ground} cx="2" rx={rig.stance==='crouch'?59:65} ry="5" fill="#102034" opacity=".2" stroke="none"/>
 <IllustratedBody id={id} d={d}/>
 <g transform={`translate(${rig.head[0]+points[4][0]} ${rig.head[1]+points[4][1]}) rotate(${rig.head[2]+points[5][0]} 0 50)`}><g className="illustrated-head"><g transform={rig.portraitScale?`translate(0 60) scale(${rig.portraitScale}) translate(0 -60)`:undefined}><IllustratedPortrait id={id} d={d} appearance={appearance}/></g></g></g>
 </>:<><Limb id={id} d={d} tool={tool} active={active} near={false} shoulder={rig.shoulders[0]} elbow={points[0]} wrist={points[1]}/><Limb id={id} d={d} tool={tool} active={active} near shoulder={rig.shoulders[1]} elbow={points[2]} wrist={points[3]}/></>}
 </g>;
}
