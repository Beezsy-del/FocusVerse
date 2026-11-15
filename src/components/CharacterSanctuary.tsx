import React, { useEffect, useState } from 'react';
import {ILLUSTRATED_RIGS,ILLUSTRATED_PLACEMENTS} from '../data/illustratedActorRigs';
import {useCompanionPerformance} from '../hooks/useCompanionPerformance';
import { ROSTER_RIGS } from '../data/rosterActorRigs';
import { REFERENCE_ACTOR_RIGS } from '../data/referenceActorRigs';
import { Character } from '../types/character';
import { SANCTUARIES } from '../data/sanctuaries';
import { Batcomputer, BatDesk, BatEquipment } from './BatcaveWorkstation';
import { SanctuaryActor } from './SanctuaryActor';
import { UserFocusAction } from './AudioCodeFooter';
import { Headphones, NotebookPen, ListTodo, Radio, RotateCw, Sparkles } from 'lucide-react';
import './SpiderStudyRoom.css';
import './CharacterSanctuary.css';
import { SanctuaryRoomObjects, roomObjectLayout } from './SanctuaryRoomObjects';

function WorkSurface({id,tool,color}:{id:string;tool:string;color:string}) {
 if(id.endsWith('-cat')||id.endsWith('-dog')) return null;
 if(id==='hermione-granger')return <g stroke="#493b3a" strokeWidth="3"><path d="M442 445L570 432L592 473L453 491Z" fill="#9b7754"/><path d="M472 488L480 574H541L553 482Z" fill="#5c4b45"/><path d="M451 444L514 449L570 438L579 469L518 480L461 474Z" fill="#dcc59f"/><path d="M514 450L518 477M467 454L503 461M532 458L565 451" stroke="#9d8664" strokeWidth="1.5"/></g>;
 if(id==='rapunzel')return <g stroke="#604b40" strokeWidth="3"><path d="M354 441H552L576 480H332Z" fill="#b18b61"/><path d="M347 480L335 573M559 480L573 573" stroke="#786047" strokeWidth="9"/><path d="M454 442L505 449L550 442V471L505 479L454 471Z" fill="#e5cfab"/><path d="M505 450V476" stroke="#a58b6c" strokeWidth="1.5"/><circle cx="524" cy="461" r="8" fill="#d6aa53"/><path d="M377 449V427H393V450" fill="#a57379"/></g>;
 if(id==='officer-k')return <g stroke="#36464e" strokeWidth="3"><path d="M306 437L474 422L497 466L313 481Z" fill="#667778"/><path d="M322 480L312 559M481 469L496 558" stroke="#39464d" strokeWidth="9"/><path d="M329 438L447 430L460 455L338 464Z" fill="#243e48"/><path d="M345 444L436 438M350 452L440 446" stroke="#9bbab2" strokeWidth="2"/></g>;
 if(id==='miles-morales')return <g stroke="#263248" strokeWidth="2"><path d="M365 326L479 335L469 469L356 456Z" fill="#34394f"/><path d="M370 335L470 342L462 457L365 447Z" fill="#45425b"/><path d="M376 417Q412 350 458 402M383 436L439 373" stroke="#ce648a" strokeWidth="7" fill="none"/><path d="M375 463L358 555M454 469L475 554M354 460L479 474" stroke="#8b735b" strokeWidth="7"/><path d="M421 536H456V567H421Z" fill="#775b58"/></g>;
 if(id==='l-lawliet')return <g stroke="#253343" strokeWidth="3"><path d="M310 447H552L571 479H291Z" fill="#728591"/><path d="M291 479H571V491H291ZM311 491L305 571M550 491L557 571" fill="#354653"/><path d="M451 450L496 455L545 449V473L497 480L451 473Z" fill="#d5cfb9"/><path d="M497 456V477M460 460L484 464M507 465L535 459" stroke="#888b86" strokeWidth="1.5"/></g>;
 if(id==='moana') return <g stroke="#614f3c" strokeWidth="3"><path d="M285 462L450 447L467 530L291 547Z" fill="#ab875e"/><path d="M300 470L438 458L443 492L303 505Z" fill="#dac59a"/><path d="M311 490L344 472L370 484L425 469" stroke="#4e7e83" fill="none"/><path d="M310 523L443 510"/><circle cx="387" cy="480" r="8" fill="#68c5a8"/></g>;
 if(id==='elsa') return <g stroke="#b8dfec" strokeWidth="3"><path d="M340 451L480 435L502 470L356 490Z" fill="#8bbccd"/><path d="M377 483L402 586L444 583L472 475Z" fill="#598aab"/><path d="M377 483L444 583L420 480Z" fill="#a0d6e4"/><path d="M375 451L432 444L453 461L391 470Z" fill="#d0eef1"/></g>;
 if(id==='gojo-satoru') return <g stroke="#535774" strokeWidth="1.5"><path d="M306 465H447V487H306ZM326 487L321 567M427 487L434 567" fill="#252b43"/><path d="M352 454L401 448L410 473L356 479Z" fill="#d6c7b5"/><path d="M365 458L390 455M366 466L396 462" stroke="#6e6184"/></g>;
 if(id==='wednesday-addams') return <g stroke="#292637" strokeWidth="3">
  <path d="M270 457H511L536 496H244Z" fill="#95755b"/><path d="M244 496H536V508H244Z" fill="#5d4c46"/><path d="M260 508L252 588M520 508L529 588" stroke="#766254" strokeWidth="9"/>
  <path d="M430 452H512L525 482H418Z" fill="#293c44"/><path d="M443 452V413H506V452" fill="#ded3bb"/><path d="M451 425H494M451 435H489" stroke="#928672" strokeWidth="2"/>
  {[0,1,2].map(i=><path key={i} d={`M434 ${459+i*8}H511`} stroke="#a2b5b2" strokeWidth="3" strokeDasharray="4 4"/>)}
  <g transform={tool==='bow'?'translate(0 0)':'translate(145 0)'}>
   <path d="M569 438Q534 456 552 482Q531 514 561 548Q581 561 602 540Q623 509 603 482Q620 451 592 438Z" fill="#805745"/>
   <path d="M561 365L584 543" stroke="#bba17c" strokeWidth="5"/><path d="M560 365L582 541M564 365L586 541" stroke="#e2cbb0" strokeWidth="1"/><path d="M580 551V580" stroke="#999b96"/>
  </g>
  <path d="M679 470V398" stroke="#d3bc8f" strokeWidth="12"/><path d="M679 394Q664 375 679 361Q694 379 679 394" fill="#e5d7ad"/>
 </g>;
 if(id==='gwen-stacy') return <g stroke="#303248" strokeWidth="4"><ellipse cx="565" cy="499" rx="68" ry="61" fill="#a96e96"/><ellipse cx="565" cy="499" rx="52" ry="47" fill="#34384c"/><path d="M440 452V555M695 429V555" stroke="#b4c0c4"/><ellipse cx="440" cy="445" rx="57" ry="12" fill="#cfb891"/><ellipse cx="695" cy="424" rx="59" ry="11" fill="#cfb891"/><path d="M487 453V485Q520 504 551 485V453" fill="#b27b99"/><ellipse cx="519" cy="453" rx="32" ry="9" fill="#d9ced0"/></g>;
 return <g stroke="#24303b" strokeWidth="3">
 <defs><linearGradient id={`desk-${id}`} x2="0" y2="1"><stop stopColor={['bruce-wayne','neo','officer-k'].includes(id)?'#71868a':'#ba936b'}/><stop offset="1" stopColor={['bruce-wayne','neo','officer-k'].includes(id)?'#3d535c':'#78583f'}/></linearGradient></defs>
 <path d="M370 457H721L753 496H340Z" fill={`url(#desk-${id})`}/>
 <path d="M344 494H747" fill="none" stroke="#c3a077" strokeWidth="2"/>
 <path d="M660 508H721V558H660Z" fill="#5f4e46"/><path d="M662 532H719M679 520H702M679 545H702" stroke="#ae906d" strokeWidth="3"/>
 <path d="M340 496H753V508H340ZM365 508L356 589M729 508L738 589" fill="#5a5552" strokeWidth="10"/>
 {id==='naruto-uzumaki'&&tool==='brush'&&<g><path d="M468 451H597V482H468Z" fill="#e0c69a"/><path d="M469 449V485M597 449V485" stroke="#8b6345" strokeWidth="9"/><circle cx="536" cy="466" r="11" fill="none" stroke="#6e7962"/><path d="M490 459h21m-21 11h21M556 459h21m-21 11h21" stroke="#6e7962" strokeWidth="2"/></g>}
 {id!=='naruto-uzumaki'&&['pencil','brush','quill','wand'].includes(tool)&&<g><path d="M470 456L528 461L583 456V482L528 490L470 482Z" fill="#e5cfa6"/><path d="M528 461V488M481 468L517 473M539 473L573 468" fill="none" stroke="#a28b6e" strokeWidth="2"/></g>}
 {id==='late-night-study-boy'&&<g><path d="M381 367L484 375L490 452L390 442Z" fill="#283d4c" stroke="#93b1ad"/><path d="M396 385L472 391M397 397L463 402M398 409L475 415M399 421L455 426" stroke="#8acabb" strokeWidth="3"/></g>}
 {tool==='type'&&<g><path d="M467 458H605L620 485H456Z" fill="#283f47"/>{[0,1,2].map(i=><path key={i} d={`M474 ${465+i*7}h127`} stroke="#9eb9b5" strokeDasharray="5 4" strokeWidth="3"/>)}{id==='wednesday-addams'&&<path d="M480 458V411H586V458" fill="#ded3bb"/>}</g>}
 {tool==='wrench'&&id==='bruce-wayne'&&<g><path d="M503 462H548V471H525V482H514V472H503Z" fill="#9aaeb9"/><path d="M548 466H562L572 456M562 466L572 476" fill="none" stroke="#b4c6cd" strokeWidth="3"/></g>}
 {tool==='wrench'&&id!=='bruce-wayne'&&<g><ellipse cx="535" cy="470" rx="28" ry="13" fill="#253e4c"/><ellipse cx="535" cy="467" rx="18" ry="9" fill={color}/><path d="M579 470H605M590 461V478" stroke="#c0cece" strokeWidth="4"/></g>}
 {tool==='spray'&&<g><path d="M478 380H540V474H478Z" fill="#363952"/><path d="M486 451Q500 417 528 444M491 461L521 425" stroke="#e486ba" strokeWidth="6" fill="none"/></g>}
 {tool==='blade'&&<path d="M462 475H602L620 468H462Z" fill="#d2d8d0"/>}
 {tool==='bow'&&<g><path d="M520 430Q474 446 504 473Q478 500 512 545Q539 564 559 541Q581 502 553 474Q581 446 543 430Z" fill="#805745"/><path d="M533 391V552" stroke="#c0aa86" strokeWidth="5"/></g>}
 {['elsa','gojo-satoru'].includes(id)?<g><path d="M659 472L675 376L694 472Z" fill={color} opacity=".8"/><path d="M675 376L680 472H694Z" fill="#e2f6f5" opacity=".6"/></g>:['moana','naruto-uzumaki','hermione-granger','rapunzel','levi-ackerman','wednesday-addams'].includes(id)?<g><path d="M679 470V398" stroke="#d3bc8f" strokeWidth="12"/><path d="M679 394Q660 375 679 361Q697 379 679 394" fill={color}/><path d="M663 472H695" stroke="#9a805f" strokeWidth="5"/></g>:<g><path d="M673 457V371L702 351" fill="none" stroke="#a5aaa0" strokeWidth="5"/><path d="M682 345H715L729 365H670Z" fill={color}/></g>}
 <path d="M626 460H647V480H626ZM647 465H655V475H647" fill="#d0b899"/>
 </g>;
}
function IllustratedSeat({id}:{id:string}){
 const rig=ILLUSTRATED_RIGS[id];
 const seat=rig.y+rig.scale*(id==='l-lawliet'?216:id==='cozy-study-girl'?215:175);
 const floor=rig.y+rig.scale*rig.ground;
 return <g transform={`translate(${rig.x} ${seat})`} stroke="#293442" strokeWidth="3"><path d="M-38-115Q0-136 38-115L43 0H-43Z" fill="#39454e"/><path d="M-47-2Q0-10 47-2V11H-47Z" fill="#736c66"/><path d={`M-35 11L-44 ${floor-seat}M35 11L47 ${floor-seat}`} strokeWidth="7" fill="none"/><path d="M-31-107Q0-119 31-107" stroke="#88908d" opacity=".35" fill="none"/></g>;
}
export function CharacterSanctuary({character,action,onCompanionClick,onMusic,onNotes,onTasks}:{character:Character;action:UserFocusAction;onCompanionClick:()=>void;onMusic:()=>void;onNotes:()=>void;onTasks:()=>void}) {
 const batman=character.id==='bruce-wayne';
 const gojo=character.id==='gojo-satoru';
 const pet=character.id.endsWith('-cat')||character.id.endsWith('-dog');
 const standing=ILLUSTRATED_RIGS[character.id]?.stance==='standing'||ILLUSTRATED_RIGS[character.id]?.stance==='gown'||['elsa','moana','gojo-satoru','miles-morales'].includes(character.id);
 const d={...SANCTUARIES[character.id], x:565, y:280, scale:1.15};
 if(character.id==='bruce-wayne'||character.id==='naruto-uzumaki') Object.assign(d,REFERENCE_ACTOR_RIGS[character.id]);
 if(ROSTER_RIGS[character.id])Object.assign(d,ROSTER_RIGS[character.id]);
 if(ILLUSTRATED_PLACEMENTS[character.id])Object.assign(d,ILLUSTRATED_PLACEMENTS[character.id]);
 const [appearances,setAppearances]=useState<Record<string,'masked'|'unmasked'>>(()=>{try{const saved=JSON.parse(localStorage.getItem('focusverse-spider-appearance')||'{}');return saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{}}catch{return {}}});
 const appearance=appearances[character.id]==='unmasked'?'unmasked':'masked';
 const chooseAppearance=(next:'masked'|'unmasked')=>{const updated={...appearances,[character.id]:next};setAppearances(updated);try{localStorage.setItem('focusverse-spider-appearance',JSON.stringify(updated))}catch{/* Preferences remain usable when storage is unavailable. */}};
 const spiderIdentity=['miles-morales','gwen-stacy'].includes(character.id);
 const [lamp,setLamp]=useState(true);
 const objects=roomObjectLayout(character.id);
 const handlers={music:onMusic,notes:onNotes,tasks:onTasks};
 const [manual,setManual]=useState<number|null>(null),[tick,setTick]=useState(0),[hidden,setHidden]=useState(document.hidden),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'); const visibility=()=>setHidden(document.hidden); const motion=()=>setReduced(media.matches);document.addEventListener('visibilitychange',visibility);media.addEventListener('change',motion);return()=>{document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',motion);};},[]);
 const resting=action==='BREAK'||action==='COMPLETED';
 useEffect(()=>{if(hidden||reduced||resting||ILLUSTRATED_PLACEMENTS[character.id])return;const reference=character.id==='bruce-wayne'||character.id==='naruto-uzumaki'||!!ROSTER_RIGS[character.id];const timer=setInterval(()=>setTick(t=>t+(reference?96:1)),reference?(ROSTER_RIGS[character.id]?.dwell||24000):180);return()=>clearInterval(timer);},[hidden,reduced,resting,character.id]);
 const performance=useCompanionPerformance(character.id,manual,resting||!ILLUSTRATED_PLACEMENTS[character.id],ROSTER_RIGS[character.id]?.dwell);
 const authored=!!ILLUSTRATED_PLACEMENTS[character.id];
 const index=authored?performance.activity:manual??(Math.floor(tick/96)%2),tool=d.tools[index];
 const activityLabel=resting?'Taking a quiet break':authored&&performance.phase!=='action'?(performance.phase==='observe'?'Looking around':performance.phase==='settle'?'Settling back in':pet?'Resting comfortably':'Quiet concentration'):d.actions[index];
 const gestureFrames = ['cup','sugar','horse','blindfold','headphones'].includes(tool) ? [0,0,1,2,2,2,3,4,4,5,6,7,0,0,0,0] : [0,1,2,2,3,4,5,6,6,7];
 const frame=reduced||resting?0:gestureFrames[tick%gestureFrames.length];
 return <section className={`spider-study-room character-sanctuary ${lamp?'lamp-on':''} ${hidden||resting?'sanctuary-paused room-hidden':''}`} data-appearance={spiderIdentity?appearance:undefined} data-focus-state={action} data-sanctuary={character.id} data-action={index} data-phase={authored?performance.phase:undefined} aria-label={`${character.name}: ${d.title}`}>
 <header className="queens-heading"><div><div className="queens-caption"><span><i/>{d.setting.toUpperCase()}</span><span>FOCUSVERSE</span></div><h2>{d.title.toUpperCase()}</h2><p>{gojo?'Leave the noise outside. This space is yours.':batman?'A quiet watch over Gotham. A clear mind for the work ahead.':'Music, notes, and tasks. Select an object to open it.'}</p></div><span className="queens-live"><Radio size={13}/>{action==='FOCUSING'?'FOCUSING':resting?'BREAK':'READY'}</span></header>
 <div className="queens-stage">
 <div className="room-scene-label"><span className="room-scene-dot"/>{activityLabel.toUpperCase()}</div>
 <svg className="sanctuary-stage" viewBox="0 0 1000 660" role="img" aria-label={`${d.architecture}. ${d.props}. ${activityLabel}.`}>
 <image href={`${import.meta.env.BASE_URL}assets/sanctuaries/${character.id}.svg`} width="1000" height="660"/>
 {batman && <Batcomputer/>}
 {gojo && <g className="gojo-infinity" aria-hidden="true">
 <defs><radialGradient id="infinity-halo"><stop stopColor="#62d9ff" stopOpacity=".12"/><stop offset=".65" stopColor="#7180dc" stopOpacity=".06"/><stop offset="1" stopColor="#62d9ff" stopOpacity="0"/></radialGradient></defs>
 <ellipse cx="565" cy="320" rx="240" ry="250" fill="url(#infinity-halo)"/>
 <g fill="none" stroke="#8bdcf2" strokeWidth="1"><circle cx="565" cy="315" r="176" opacity=".35"/><circle cx="565" cy="315" r="164" opacity=".16"/>
 <g className="gojo-orbit"><circle cx="565" cy="315" r="182" strokeDasharray="100 430 20 594" opacity=".8"/><path d="M565 125v16M565 489v16M375 315h16M739 315h16" opacity=".7"/></g>
 <ellipse cx="565" cy="315" rx="200" ry="64" transform="rotate(-32 565 315)" opacity=".3"/>
 </g><g fill="#b3edff"><circle cx="408" cy="235" r="2"/><circle cx="728" cy="382" r="2"/><circle cx="601" cy="143" r="2"/></g>
 </g>}
 <g className={`sanctuary-ambient ambient-${d.ambient}`} fill={d.palette[2]} opacity=".35">{Array.from({length:22},(_,i)=>d.ambient==='rain'?<path key={i} d={`M${60+(i*43)%880} ${65+(i*53)%300}l-5 18`} stroke={d.palette[2]} strokeWidth="1"/>:<circle key={i} cx={60+(i*137)%880} cy={65+(i*53)%300} r={d.ambient==='snow'?2.5:1.5}/>)}</g>
 {!pet&&!standing&&<ellipse cx="550" cy="576" rx="210" ry="29" fill="#0c1422" opacity=".32"/>}
 {!pet&&!standing&&(ILLUSTRATED_RIGS[character.id]?<IllustratedSeat id={character.id}/>:<g stroke="#252534" strokeWidth="5"><path d="M526 352Q565 333 604 352V477H526Z" fill={d.palette[0]}/><path d="M510 477H608V489H510Z" fill={d.palette[1]}/><path d="M523 489L513 578M597 489L610 578" fill="none" strokeWidth="9"/></g>)}
 <g className={gojo?"gojo-actor-light":batman?"batman-monitor-light":undefined}><SanctuaryActor id={character.id} design={d} appearance={appearance} tool={tool} frame={frame} phase={authored?performance.phase:undefined} variation={performance.variation} layer="body"/></g>
 {batman?<BatDesk tool={tool}/>:<WorkSurface id={character.id} tool={tool} color={d.palette[2]}/>}
 {tool==='wand'&&<g transform={`translate(${620+frame%4} ${410-frame%4*3}) rotate(-12)`}><path d="M-23-26H23V22H-23Z" fill="#e4d2ac" stroke="#9c8662" strokeWidth="2"/><path d="M-14-13H13M-14-4H8M-14 5H13" stroke="#9c8662" strokeWidth="2"/></g>}
 <g className={gojo?"gojo-room-props":undefined}>{batman?<BatEquipment/>:<SanctuaryRoomObjects id={character.id} objects={objects}/>}</g>
 <SanctuaryActor id={character.id} design={d} appearance={appearance} tool={tool} frame={frame} phase={authored?performance.phase:undefined} variation={performance.variation} layer="hands"/>
 <defs><radialGradient id={`glow-${character.id}`}><stop stopColor={d.palette[2]} stopOpacity=".22"/><stop offset="1" stopColor={d.palette[2]} stopOpacity="0"/></radialGradient></defs><ellipse className="desk-light" cx="665" cy="431" rx="185" ry="150" fill={`url(#glow-${character.id})`} pointerEvents="none"/>
 <path d="M0 653H1000" stroke={d.palette[1]} strokeWidth="14" opacity=".45"/>
 </svg>
 {objects.map(object=><button key={object.feature} className="room-object sanctuary-object" data-feature={object.feature} aria-label={`${object.label} — Open ${object.feature}`} style={{left:`${object.x/10}%`,top:`${object.y/6.6}%`,width:`${object.width/10}%`,height:`${object.height/6.6}%`}} onClick={handlers[object.feature]}><span>{object.label} · {object.feature}</span></button>)}
 <button className="room-object sanctuary-companion-hit" style={{left:`${(d.x-48*d.scale)/10}%`,top:`${(d.y-24*d.scale)/6.6}%`,width:`${96*d.scale/10}%`,height:`${120*d.scale/6.6}%`}} aria-label={`Encourage ${character.name}`} onClick={onCompanionClick}><span>{character.name.split(' (')[0]}</span></button>
 <button className="room-object sanctuary-light" style={{left:'66%',top:'51%',width:'7%',height:'9%'}} aria-label="Toggle room light" aria-pressed={lamp} onClick={()=>setLamp(v=>!v)}><span>Room light</span></button>
 </div>
 <div className="room-activity-bar"><span className="room-activity-label"><Sparkles size={13}/>COMPANION ACTIVITY</span><div className="room-activity-options sanctuary-actions" role="group" aria-label="Companion activities"><button aria-pressed={manual===null} onClick={()=>setManual(null)}><RotateCw size={13}/>Auto</button>{d.actions.map((a,i)=><button key={a} disabled={resting} aria-pressed={manual===i} onClick={()=>setManual(i)}>{a}</button>)}</div>{spiderIdentity&&<div className="room-activity-options sanctuary-appearance" role="group" aria-label={`${character.name} appearance`}><span className="room-activity-label">LOOK</span><button aria-pressed={appearance==='masked'} onClick={()=>chooseAppearance('masked')}>Masked</button><button aria-pressed={appearance==='unmasked'} onClick={()=>chooseAppearance('unmasked')}>Unmasked</button></div>}</div>
 <footer className="queens-footer"><div><span className="queens-kicker">{character.name.split(' ')[0].toUpperCase()} // ACTIVITY</span><p aria-live="polite">{activityLabel+'.'}</p></div><nav className="room-shortcuts" aria-label="Sanctuary tools"><button onClick={onMusic}><Headphones size={14}/>Music</button><button onClick={onNotes}><NotebookPen size={14}/>Notes</button><button onClick={onTasks}><ListTodo size={14}/>Tasks</button></nav></footer>
 </section>;
}
