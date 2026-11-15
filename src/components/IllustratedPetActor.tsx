import React from 'react';
import {ILLUSTRATED_PETS} from '../data/illustratedActorRigs';
import {CompanionPhase} from '../hooks/useCompanionPerformance';
import {useArticulatedPose} from '../hooks/useArticulatedPose';
import './IllustratedActor.css';
export function IllustratedPetActor({id,tool,phase='action',layer}:{id:string;tool:string;phase?:CompanionPhase;layer:'body'|'hands'}){
 const cat=id==='purring-window-cat',rig=ILLUSTRATED_PETS[id],active=phase==='action';
 const headAngle=phase==='observe'?(cat?-8:9):active?(tool==='paw'?(cat?-8:-3):(cat?6:11)):0;
 const joint=useArticulatedPose([[headAngle,0]],`${id}:${phase}:${tool}`,layer==='body');
 if(layer==='hands')return null;
 return <g transform={`translate(${rig.x} ${rig.y}) scale(${rig.scale})`} className={`illustrated-actor illustrated-pet illustrated-${id} illustrated-${phase} illustrated-tool-${tool}`} data-actor={id} data-art-version="3" data-rig-layer="body" data-phase={phase} stroke="#493e36" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
 <ellipse cy={rig.ground} cx="5" rx={cat?117:105} ry="5" fill="#15242d" opacity=".25" stroke="none"/>
 {cat?<>
 {/* A reclining feline: shoulder blades, long back and folded hindquarters. */}
 <path className="cat-tail-tip" d="M64 58Q120 76 119 40Q117 20 103 29Q95 36 107 39Q110 58 82 49" fill="#b89a72" strokeWidth="1.5"/>
 <g className="pet-ribcage"><path d="M-54 43Q-40 6-5 10Q25-1 53 14Q80 27 83 60Q87 80 58 85L-56 83Q-72 69-54 43Z" fill="#c5a67c"/><path d="M-5 14Q28 8 48 23Q64 42 54 64L24 78L64 83Q84 77 80 58Q77 26 48 14Q22 2-5 14Z" fill="#aa845f" stroke="none"/><path d="M-40 42Q-22 32-10 45L-5 74L-42 83L-57 76Z" fill="#e3cc9f" stroke="none"/>
 <path d="M45 38Q22 43 30 65L58 76" stroke="#8f7055" fill="none" strokeWidth="1.5"/><path d="M-4 14L1 30M10 12L16 27M25 15L30 30M57 26L51 39M69 39L61 49M75 55L64 60" stroke="#906d4e" strokeWidth="3.4" fill="none"/></g>
 <path d="M24 68Q36 61 51 70L67 80Q68 88 54 88H14Q10 82 24 78Z" fill="#d4b88e"/><path d="M36 82V87M45 82V87M54 82V87" stroke="#a08765" strokeWidth=".8"/>
 <path d="M-43 54Q-31 51-27 66L-34 77L-63 86L-94 87Q-104 85-98 79L-69 75L-50 67Z" fill="#dcca9f"/><path d="M-94 81L-92 86M-87 80L-85 86M-80 80L-78 85" stroke="#a28a68" strokeWidth=".8"/>
 <g transform={`rotate(${joint[0][0]} -54 38)`}><g className="illustrated-head">
 <path d="M-86 7L-88-23L-66-9Q-51-16-36-8L-18-22L-18 7Q-9 27-28 41Q-52 55-76 40Q-93 29-86 7Z" fill="#cfb085"/>
 <path d="M-83-14L-69-4L-81 2ZM-24-13L-34-4L-23 3Z" fill="#bd8d80" stroke="#a08268" strokeWidth=".8"/>
 <path d="M-80 28Q-67 16-54 27Q-39 15-27 26L-36 39Q-54 50-72 38Z" fill="#f0dfba" stroke="none"/>
 <path d="M-73-6L-68 6M-57-10L-56 5M-42-7L-45 6M-86 19L-75 22M-20 18L-30 22" fill="none" stroke="#94714f" strokeWidth="2.7"/>
 <g className="cat-slow-blink" style={{transformOrigin:'-53px 17px'}}><path d="M-78 16Q-68 8-60 18Q-69 25-78 16ZM-47 18Q-37 8-28 15Q-35 26-47 18Z" fill="#a4b48a"/><path d="M-68 13V20M-37 13V21" stroke="#283b36" strokeWidth="2.3"/><path d="M-72 15h1M-41 15h1" stroke="#f3eed1" strokeWidth="1"/></g>
 <path d="M-59 29Q-54 26-48 28L-53 34Z" fill="#ac7b73"/><path d="M-53 34V38Q-60 43-65 38M-53 38Q-47 42-42 37" fill="none" stroke="#8b715d" strokeWidth=".8"/>
 <path d="M-68 30L-102 24M-69 35L-103 37M-38 30L-5 23M-37 35L-4 37" stroke="#eee1c6" strokeWidth=".85" fill="none"/>
 <path d="M-73 43Q-54 55-34 44" stroke="#778273" strokeWidth="3" fill="none"/><circle cx="-51" cy="51" r="3.5" fill="#c6ab69"/>
 </g></g>
 <g className={active&&tool==='paw'?'cat-groom-paw':''} style={{transformOrigin:'-53px 57px'}}><path d={active&&tool==='paw'?'M-57 57Q-70 57-75 48L-69 33Q-65 23-59 28L-54 35Q-53 41-62 44L-59 47L-45 56Z':'M-56 55Q-43 54-42 67L-51 80L-82 88H-108Q-115 85-109 80L-77 75L-62 66Z'} fill="#e5cfa5"/><path d={active&&tool==='paw'?'M-66 32L-60 35M-68 37L-63 40':'M-107 82L-105 87M-100 81L-98 87M-93 81L-91 87'} stroke="#a98d69" strokeWidth=".8" fill="none"/></g>
 {active&&tool==='leaf'&&<path className="cat-leaf-watch" d="M-116 7Q-137-7-120-21Q-105-11-116 7ZM-120-17L-116 9" fill="#879f73" stroke="#526e55" strokeWidth="1"/>}
 </>:<>
 <path className="dog-tail-tip" d="M48 93Q95 101 105 66Q111 48 118 61Q125 88 97 108Q81 119 51 117Z" fill="#a87951"/>
 <g className="pet-ribcage"><path d="M-48 68Q-50 20-17 17Q16 8 34 40Q68 45 79 76Q91 111 59 118L-35 117Q-59 104-48 68Z" fill="#bd9062"/><path d="M22 32Q44 53 34 86L15 111L56 118Q85 110 78 83Q72 52 37 45Z" fill="#a57550" stroke="none"/><path d="M-43 48Q-17 34 9 54L-2 81L-20 101L-42 93Z" fill="#e0c7a0" stroke="none"/><path d="M51 69Q26 72 30 96L50 105" stroke="#89674c" strokeWidth="1.5" fill="none"/><path d="M-34 51L-28 60L-22 55L-17 65L-10 59L-5 69" stroke="#b99a75" fill="none" strokeWidth="1"/></g>
 <path d="M-8 70Q6 66 13 81L7 107Q28 112 23 120H-12Q-19 116-11 107Z" fill="#d1b087"/><path d="M35 102Q55 96 69 109L73 120H28Q21 112 35 102Z" fill="#cfaa7c"/>
 <path d="M-4 113V119M5 113V119M14 115V119M37 113V119M48 112V119M59 114V119" stroke="#997c59" strokeWidth=".8"/>
 <g transform={`rotate(${joint[0][0]} -33 40)`}><g className="illustrated-head">
 <path d="M-66 1Q-67-23-38-28Q-8-33 7-11Q18 13 3 32Q-8 49-34 49Q-61 43-67 24Z" fill="#c59a6b"/>
 <path className="dog-ear-left" d="M-57-18Q-82-20-86 8Q-90 35-73 42Q-63 40-62 25L-50-4Z" fill="#826045"/>
 <path className="dog-ear-right" d="M-6-23Q17-22 22 3Q26 29 12 38Q2 36 1 20L-14-7Z" fill="#8d6749"/>
 <path d="M-58 22Q-48 10-32 17Q-19 9-4 20L-8 35Q-29 53-52 36Z" fill="#e9d3ad" stroke="none"/>
 <g className="dog-soft-blink" style={{transformOrigin:'-31px 8px'}}><path d="M-56 7Q-49-1-42 7Q-45 16-53 13ZM-24 7Q-16-3-8 6Q-10 15-19 14Z" fill="#4c4134"/><circle cx="-49" cy="6" r="1.8" fill="#f6e7c9" stroke="none"/><circle cx="-16" cy="5" r="1.8" fill="#f6e7c9" stroke="none"/></g>
 <path d="M-57-3Q-51-7-44-3M-25-4Q-17-9-9-3" stroke="#a77b54" strokeWidth="2" fill="none"/>
 <path d="M-42 23Q-32 17-21 22Q-19 28-31 32Q-43 30-42 23Z" fill="#443e38"/><path d="M-37 23Q-31 20-25 23" stroke="#9a8d7c" fill="none" strokeWidth="1"/>
 <path d="M-31 32V37Q-43 45-50 34M-31 37Q-20 45-11 33" fill="none" stroke="#896b52" strokeWidth=".9"/>
 <path d="M-54 44Q-30 58-7 44L-8 51Q-29 67-54 51Z" fill="#96544d"/><path d="M-27 57V64" stroke="#ddbc7c" strokeWidth="2"/><path d="M-32 62H-23L-20 68L-28 75L-35 68Z" fill="#d7b573" strokeWidth=".8"/>
 </g></g>
 <g className={active&&tool==='paw'?'dog-offer-paw':''} style={{transformOrigin:'-42px 67px'}}><path d={active&&tool==='paw'?'M-49 65Q-35 62-32 76Q-36 93-57 96L-84 98Q-98 98-101 90Q-101 83-91 82L-62 81L-55 69Z':'M-50 66Q-37 63-30 79L-32 108Q-12 113-18 121H-60Q-65 115-54 106Z'} fill="#dbbc91"/><path d={active&&tool==='paw'?'M-94 87L-92 95M-86 86L-84 96M-76 87Q-62 88-52 82':'M-52 114V120M-43 114V120M-33 115V120'} stroke="#a48661" strokeWidth=".8" fill="none"/></g>
 </>}
 </g>;
}
