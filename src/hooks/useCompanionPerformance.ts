import {useEffect,useState} from 'react';
export type CompanionPhase='idle'|'observe'|'action'|'settle';
/** A bounded semantic scheduler. No animation frame loop or timer-state writes. */
export function useCompanionPerformance(id:string,manual:number|null,resting:boolean,baseDwell=26000){
 const [state,setState]=useState<{phase:CompanionPhase;activity:number;variation:number}>({phase:'idle',activity:0,variation:0});
 const [suspended,setSuspended]=useState(()=>typeof document!=='undefined'&&(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches));
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>setSuspended(document.hidden||media.matches);
  document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);sync();
  return()=>{document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync)};
 },[]);
 useEffect(()=>{
  setState({phase:manual===null?'idle':'action',activity:manual??0,variation:0});
  if(suspended||resting)return;
  let handle:ReturnType<typeof setTimeout>,cycle=0;
  const queue=(phase:CompanionPhase)=>{
   const duration=phase==='action'?5200:phase==='settle'?1400:phase==='observe'?2400:baseDwell*(.62+Math.random()*.46);
   handle=setTimeout(()=>{
    const next=phase==='idle'?'observe':phase==='observe'?'action':phase==='action'?'settle':'idle';
    if(next==='idle')cycle++;
    setState({phase:next,activity:manual??cycle%2,variation:cycle%3});queue(next);
   },duration);
  };
  queue(manual===null?'idle':'action');
  return()=>clearTimeout(handle);
 },[id,manual,resting,suspended,baseDwell]);
 return {...state,phase:resting?'idle':suspended?(manual===null?'idle':'action'):state.phase,activity:manual??state.activity,suspended:suspended||resting};
}
