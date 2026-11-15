import {useEffect,useRef,useState} from 'react';
export type RigPoint = [number,number];

/** Brief joint interpolation on pose changes. Idle motion stays in CSS; there
 * is no perpetual render loop, and feet are never part of the moving points. */
export function useArticulatedPose(target:RigPoint[], poseKey:string, enabled:boolean):RigPoint[] {
 const [points,setPoints]=useState<RigPoint[]>(target);
 const current=useRef(points);
 useEffect(()=>{
  if(!enabled||target.every((p,i)=>p[0]===current.current[i][0]&&p[1]===current.current[i][1]))return;
  const start=current.current.map(p=>[...p] as RigPoint);
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,began:number|undefined;
  const commit=(next:RigPoint[])=>{current.current=next;setPoints(next);};
  const settle=()=>{if(document.hidden||motion.matches){cancelAnimationFrame(frame);commit(target);}};
  const tick=(now:number)=>{
   began??=now;
   const progress=Math.min(1,(now-began)/1100),ease=progress*progress*(3-2*progress);
   commit(start.map((p,i)=>[p[0]+(target[i][0]-p[0])*ease,p[1]+(target[i][1]-p[1])*ease]));
   if(progress<1)frame=requestAnimationFrame(tick);
  };
  if(!document.hidden&&!motion.matches)frame=requestAnimationFrame(tick);else commit(target);
  document.addEventListener('visibilitychange',settle);motion.addEventListener('change',settle);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',settle);motion.removeEventListener('change',settle);};
  // Targets are fixed by the semantic pose key, not by a newly allocated array.
 },[poseKey,enabled]);
 return points;
}
