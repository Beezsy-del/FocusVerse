import React from 'react';
import { useArticulatedPose } from '../hooks/useArticulatedPose';
import { REFERENCE_ACTOR_RIGS } from '../data/referenceActorRigs';
import './ReferenceSanctuaryActor.css';

type Hero = keyof typeof REFERENCE_ACTOR_RIGS;
type Point = [number, number];
const ink = '#162231';

/** Each limb is drawn in its own joint coordinates; tools inherit the wrist. */
function Limb({ shoulder, elbow, wrist, kind, near, activity }: {
 shoulder:Point; elbow:Point; wrist:Point; kind:Hero; near:boolean; activity:string;
}) {
 const bat=kind==='bruce-wayne';
 const upper=Math.hypot(elbow[0]-shoulder[0],elbow[1]-shoulder[1]);
 const lower=Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1]);
 const angle=(a:Point,b:Point)=>Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI-90;
 return <g className={`reference-arm ${near?'near-arm':'far-arm'}`} data-joint={near?'near':'far'} style={{transformOrigin:`${shoulder[0]}px ${shoulder[1]}px`}}>
  <g transform={`translate(${shoulder}) rotate(${angle(shoulder,elbow)})`}>
   <path d={`M-10 0Q-14 10-10 ${upper-6}Q-8 ${upper+4} 0 ${upper+5}Q10 ${upper+2} 10 ${upper-6}Q14 9 9 0Q0-7-10 0Z`} fill={bat?'#3b4e61':'#292f3c'}/>
   <path d={`M-8 4Q-11 17-5 ${upper-1}L0 ${upper+3}Q-3 16-2 4Z`} fill={bat?'#53697a':'#404857'} stroke="none"/>
   <path d={`M6 8Q11 19 5 ${upper-3}`} stroke={bat?'#213044':'#161e2b'} fill="none" strokeWidth="2"/>
   {!bat&&near&&<g transform="translate(3 13)" fill="#b7a68a" stroke="#6f6559"><ellipse rx="7" ry="10"/><path d="M0-6Q-7-4-3 2Q4 6 4-1Q3-5-1-2Q-3 1 1 2" fill="none" strokeWidth="1.4"/></g>}
  </g>
  <g className="reference-forearm" transform={`translate(${elbow}) rotate(${angle(elbow,wrist)})`}>
   <path d={`M-9-2Q-11 7-6 ${lower}H6Q11 8 9-2Q0 4-9-2Z`} fill={bat?'#22364b':'#303542'}/>
   <path d={`M-7 5Q-6 15-3 ${lower-4}`} fill="none" stroke={bat?'#688397':'#646977'} strokeWidth="1.7"/>
   {bat&&<><path d={`M8 8L18 3L11 16L18 17L10 25L16 30L7 35Z`} fill="#23384c"/><path d={`M-6 ${lower-11}H6M-5 ${lower-7}H5`} stroke="#4e7188" fill="none"/></>}
   {!bat&&<path d={`M-7 ${lower-7}Q0 ${lower-3} 7 ${lower-7}`} stroke="#7c5d40" fill="none"/>}
   <g transform={`translate(0 ${lower}) rotate(${-angle(elbow,wrist)})`}>
    <path d={!bat&&near&&activity==='orb'?"M-9 1L-13-3Q-14-7-11-6L-5-1L7-4Q11-5 11-2L7 2Q11 2 9 5L4 8H-4Z":"M-7-3Q-10-1-9 3L-7 8Q-2 11 5 8L8 4Q7 0 3-1L-1-4Z"} fill={bat?'#293e52':'#e6b28d'}/>
    <path d="M-6 2L4 3M-5 5L3 6M-1-2L-2 2" fill="none" stroke={bat?'#7291a4':'#a97053'} strokeWidth=".8"/>
    {near&&bat&&activity==='scanner'&&<g transform="translate(0 -9) rotate(-8)"><path d="M-10-15Q0-18 10-15V13H-10Z" fill="#172b3a" stroke="#7d9eaf"/><path d="M-6-10H6V5H-6Z" fill="#315769"/><circle cy="-3" r="4" fill="none" stroke="#91d5da" strokeWidth=".8"/><path d="M-6 9H2" stroke="#acb7b7"/></g>}
    {near&&bat&&activity==='wrench'&&<g transform="rotate(-20)"><path d="M0 5V-19M0-19L-5-24L-4-31M0-19L5-24L4-31" fill="none" stroke="#aebec8" strokeWidth="3"/><path d="M-3-2H3V5H-3Z" fill="#2a3d4f"/></g>}
    {near&&!bat&&activity==='brush'&&<g transform="rotate(-16)"><path d="M0-22V12" stroke="#a77c42" strokeWidth="3"/><path d="M0 12L-1 20L2 15" fill="#293833"/></g>}
    {near&&!bat&&activity==='orb'&&<g className="naruto-rasengan" transform="translate(0 -19)" fill="none" stroke="#a7ebee" strokeWidth="1"><circle r="17" fill="#4bacc4" fillOpacity=".24"/><path d="M-13-5Q-1-22 12-3Q19 9 0 13Q-16 15-11 0Q-4-13 7-4Q13 6 0 8Q-7 6-3 0"/><ellipse rx="14" ry="7" transform="rotate(-35)"/><circle r="21" opacity=".18"/></g>}
   </g>
  </g>
 </g>;
}

function BatmanBody() {
 return <>
  <path className="bat-cape" d="M-34 59Q-57 72-61 121L-69 232Q-54 217-41 239Q-23 220-6 241Q14 219 31 238Q47 216 64 230L49 106Q48 72 31 59Z" fill="#17283d"/>
  <path d="M-34 74Q-46 132-48 218M-21 80Q-31 152-26 222M31 76Q43 139 46 215" stroke="#344b61" fill="none" strokeWidth="2"/>
  <path d="M-28 139Q-44 143-52 161L-62 187L-56 231H-34L-36 185L-15 171L10 149Z" fill="#35495c"/>
  <path d="M-33 148Q-43 160-46 181L-43 220" fill="none" stroke="#69808b" strokeWidth="3"/>
  <path d="M6 143Q29 136 40 150L49 175L29 228H7L22 179L-4 169Z" fill="#293d50"/>
  <path d="M25 151L35 177L18 214" fill="none" stroke="#4d6578" strokeWidth="2"/>
  <path d="M-59 210Q-48 216-35 210L-34 239L-43 249H-80Q-82 242-72 239L-57 232Z" fill="#1d3046"/>
  <path d="M8 210Q20 216 34 210L31 234L44 243V250H4Q1 240 7 233Z" fill="#1c2e42"/>
  <path d="M-57 218L-51 235L-70 243M16 218L14 236L30 244" fill="none" stroke="#4c687d" strokeWidth="2"/>
  <path d="M-79 249H-44M5 249H43" stroke="#0d1725" strokeWidth="3"/>
  <g className="reference-upper-body">
   <path d="M-15 49L-31 59Q-48 63-45 82L-32 111L-28 139Q-1 151 29 139L34 110L46 81Q49 64 29 59L15 49Z" fill="#3a4e61"/>
   <path d="M-31 63Q-43 69-37 88L-25 105L-24 131L-13 137L-17 104L-13 91L-26 72Z" fill="#52697b" stroke="none"/>
   <path d="M31 62Q43 69 36 89L24 105L21 136L30 132L36 108L43 85Z" fill="#24374b" stroke="none"/>
   <path d="M-31 72Q-15 65-2 75Q14 65 31 72M-27 99Q-12 105-1 99Q14 104 27 98M-20 111Q-9 115-1 110Q9 115 20 110M-18 123Q0 129 18 123" fill="none" stroke="#233749" strokeWidth="1.6"/>
   <path d="M-32 70Q-20 65-8 70M6 70Q20 65 30 70M-17 116L-4 118" fill="none" stroke="#7b8d99" strokeWidth="1"/>
   <ellipse cy="85" rx="25" ry="13" fill="#baa666" stroke="#182536" strokeWidth="1.7"/>
   <path d="M-23 78L-17 84L-11 81L-7 85L-4 78L-2 82H2L4 78L7 85L11 81L17 84L23 78L20 90L14 88L10 94L5 92L0 99L-5 92L-10 94L-14 88L-20 90Z" fill="#192a3b" stroke="none"/>
   <path d="M-29 134Q0 142 29 134V146Q0 151-29 145Z" fill="#9b804c"/>
   {[-23,-12,13,24].map(x=><g key={x}><path d={`M${x-4} 135h8v13h-8Z`} fill="#b49a60"/><path d={`M${x-3} 138h6`} stroke="#d2bc83"/></g>)}
   <path d="M-6 136H6V147H-6Z" fill="#d1ba79"/><path d="M-3 139H3V144H-3Z" fill="#8a754e"/>
   <g className="reference-head">
    <path d="M-14 43V61Q0 72 15 60V42" fill="#243a50"/>
    <path d="M-22 15L-23-25L-11-6Q0-12 12-6L24-24L22 20L19 40L9 51H-8L-20 39Z" fill="#263c52"/>
    <path d="M-20-18L-15 0L-17 22L-9 29L-11 41L-17 36L-21 18Z" fill="#4c667c" stroke="none"/>
    <path d="M12-5L20-16L18 22L10 27L12 42L19 36L22 16Z" fill="#15273a" stroke="none"/>
    <path d="M-15 29L-6 27L0 31L7 27L16 29L13 42L6 48H-7L-15 40Z" fill="#c59d82"/>
    <path d="M-12 34L-7 42L5 46L-7 46L-13 40Z" fill="#a77863" stroke="none"/>
    <path d="M-19 17L-5 21L-9 25L-17 23ZM19 17L5 21L9 25L17 23Z" fill="#e4f1ed" stroke="#102033" strokeWidth="1"/>
    <path d="M0 14L-3 28L0 31L3 28Z" fill="#1a2e42" stroke="none"/>
    <path d="M-7 37Q0 35 7 37M-4 42H4M-18 12L-6 17M6 17L18 12" stroke="#324356" fill="none" strokeWidth="1"/>
   </g>
  </g>
 </>;
}

function NarutoBody() {
 return <>
  <path d="M-25 135Q-42 143-49 165L-57 184L-52 225H-32L-33 184L-12 167L10 146Z" fill="#d48140"/>
  <path d="M-32 153L-42 177L-40 214M-46 182L-35 187" fill="none" stroke="#a45b32" strokeWidth="2"/>
  <path d="M5 140Q28 135 35 151L45 175L29 227H9L21 180L-5 168Z" fill="#e3944c"/>
  <path d="M25 151L34 176L20 211M13 181L25 185" fill="none" stroke="#ad683c" strokeWidth="2"/>
  <path d="M-48 165L-29 173L-34 186L-53 179Z" fill="#ded6bb"/><path d="M-50 172L-31 180" stroke="#716d67" strokeWidth="3"/>
  <path d="M-57 170L-48 173L-51 196L-62 192Z" fill="#27343e"/><path d="M-59 178L-50 181" stroke="#66747c"/>
  <path d="M-53 216L-32 218L-34 237L-48 245H-68L-69 239L-54 231Z" fill="#263540"/>
  <path d="M9 217L30 218L27 236L36 243V249H5Q2 239 8 232Z" fill="#263540"/>
  <path d="M-66 238Q-57 233-48 239V246H-68ZM9 241Q22 236 33 243V248H8Z" fill="#dca983"/>
  <path d="M-62 239V244M-57 238V244M-52 239V244M13 242V247M18 241V247M23 241V247M28 243V247" stroke="#8c654f" strokeWidth=".8"/>
  <path d="M-52 224L-35 226M11 225L28 226M-70 247H-47M6 250H36" stroke="#526878" strokeWidth="2"/>
  <g className="reference-upper-body">
   <path d="M-14 48L-27 59Q-38 66-34 85L-27 108L-29 136Q-2 148 29 136L27 108L34 84Q38 67 26 60L14 49Z" fill="#d8833d"/>
   <path d="M-29 88Q-20 106-22 130L-10 139L-25 135L-29 109Z" fill="#ad5d32" stroke="none"/>
   <path d="M17 92Q25 110 22 134L12 140L27 136L28 109Z" fill="#f0a45a" stroke="none"/>
   <path d="M-27 59L-12 51H14L27 60Q35 68 32 90L4 93H-5L-32 91Q-37 68-27 59Z" fill="#2c3340"/>
   <path d="M-26 62Q-34 70-29 84L-12 86L-14 59Z" fill="#454b57" stroke="none"/>
   <path d="M-14 47V67Q0 75 15 66V47" fill="#303743"/><path d="M-11 49V66M-6 50V68M7 50V68M12 49V66" stroke="#62646b" strokeWidth="1"/>
   <path d="M-3 68V139H3V68" fill="#242d38"/><path d="M0 71V137" stroke="#c2bdab" strokeWidth="1.4" strokeDasharray="1 2"/>
   <path d="M-1 76H3V82H-1Z" fill="#aeb2ac" strokeWidth=".6"/>
   <path d="M-23 111L-12 116L-15 129M23 110L12 115L16 128M-20 135L-8 138M8 138L22 133" fill="none" stroke="#99552f" strokeWidth="1.2"/>
   <path d="M-28 135Q0 143 29 135V145Q0 151-28 145Z" fill="#343b45"/><path d="M-22 138V145M-16 139V146M-10 140V147M10 140V147M16 139V146M22 138V145" stroke="#5e6268" strokeWidth=".8"/>
   <g className="reference-head">
    <path d="M-22 19Q-29 16-28 25Q-28 32-21 31M22 19Q28 16 27 25Q27 32 21 31" fill="#dba17a"/>
    <path d="M-22 8Q-20-5 0-6Q21-5 23 8L20 31Q17 43 1 49Q-13 46-20 34Z" fill="#e9b78e"/>
    <path d="M16 8L21 10L18 32Q14 42 1 48L9 42L13 30Z" fill="#c78e6d" stroke="none"/>
    <path d="M-22 6L-28-1L-23-7L-34-12L-20-14L-23-26L-11-20L-9-33L1-24L8-34L14-21L27-28L25-16L35-14L27-5L32 2L23 13L18 3L11 8L6-2L0 8L-7-1L-14 9L-18 2L-23 15Z" fill="#e6bc4f"/>
    <path d="M-26-12L-17-10L-16-19L-7-14L-4-25L3-17L10-25L14-14L24-18L20-6" fill="none" stroke="#f7d978" strokeWidth="1.4"/>
    <path d="M20-5L27-10L24 1L18 8L16-2M-22-5L-17 2L-16-8" fill="#b98b36" stroke="none"/>
    <path className="naruto-headband-tail" d="M21 12Q37 11 45 26L35 23L43 38Q29 33 21 19Z" fill="#252e3b"/>
    <path d="M-24 7Q0 3 24 8L23 20Q0 16-24 20Z" fill="#28343f"/>
    <path d="M-18 8Q0 6 18 9L17 18Q0 16-17 18Z" fill="#b7bdb6" stroke="#53636e" strokeWidth="1"/>
    <path d="M-15 10Q0 8 15 11" stroke="#e3dfcc" strokeWidth=".8" fill="none"/>
    {[-14,14].map(x=><g key={x} fill="#53636e" stroke="none"><circle cx={x} cy="11" r=".8"/><circle cx={x} cy="15" r=".8"/></g>)}
    <path d="M-6 15L-3 10L-2 13Q-5 16 0 16Q6 15 4 11Q2 8 0 11Q-2 13 1 14M4 12L8 9" fill="none" stroke="#465660" strokeWidth="1"/>
    <g className="naruto-eyes">
     <path d="M-17 25Q-12 21-6 25Q-12 30-17 25ZM6 25Q12 21 17 25Q12 30 6 25Z" fill="#eee9d8" strokeWidth=".7"/>
     <ellipse cx="-11" cy="25" rx="2.5" ry="3" fill="#5089b2" stroke="none"/><ellipse cx="11" cy="25" rx="2.5" ry="3" fill="#5089b2" stroke="none"/>
     <path d="M-11 23V27M11 23V27" stroke="#25384d" strokeWidth="1.2"/>
    </g>
    <path d="M-18 21L-7 22M7 22L18 21" stroke="#9b7238" strokeWidth="1.4"/>
    <path d="M1 27L-1 33L2 34M-6 39Q0 41 7 38M-3 43H3" fill="none" stroke="#a46c51" strokeWidth=".8"/>
    <path d="M-20 30L-12 32M-19 34L-12 35M-17 38L-11 38M12 32L20 30M12 35L19 34M11 38L17 38" stroke="#805f4e" strokeWidth=".9"/>
   </g>
  </g>
 </>;
}

/** Animate pose changes only; the continuous idle loops stay on the compositor. */
function usePoseJoints(id:Hero, tool:string, layer:'body'|'hands'):Point[] {
 const bat=id==='bruce-wayne';
 const target:Point[]=[bat?[-48,116]:[-44,111],bat?[-58,158]:[-59,155],bat?[49,113]:(tool==='orb'?[46,115]:[40,123]),bat?(tool==='scanner'?[15,145]:[-10,153]):(tool==='orb'?[7,137]:[-9,157])];
 return useArticulatedPose(target,`${id}:${tool}:${layer}`,layer==='hands');
}

export function ReferenceSanctuaryActor({id,tool,layer}:{id:Hero;tool:string;layer:'body'|'hands'}) {
 const rig=REFERENCE_ACTOR_RIGS[id];
 const joints=usePoseJoints(id,tool,layer);
 const bat=id==='bruce-wayne';
 return <g transform={`translate(${rig.x} ${rig.y}) scale(${rig.scale})`} className={`reference-actor actor-${id} activity-${tool}`} data-actor={layer==='body'?id:undefined} data-rig-layer={layer} stroke={ink} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none">
  {layer==='body'?(bat?<BatmanBody/>:<NarutoBody/>):<g className="reference-upper-body">
   <Limb kind={id} activity={tool} near={false} shoulder={bat?[-35,70]:[-28,66]} elbow={joints[0]} wrist={joints[1]}/>
   <Limb kind={id} activity={tool} near shoulder={bat?[34,70]:[27,66]} elbow={joints[2]} wrist={joints[3]}/>
  </g>}
 </g>;
}
