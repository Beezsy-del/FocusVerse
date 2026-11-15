import React, { useEffect, useState } from 'react';
import { useArticulatedPose } from '../hooks/useArticulatedPose';
import { SpiderMask, SpiderEmblem, SPIDER_PALETTE } from './SpiderManDesign';

export type StudyPose = 'idle' | 'repairing' | 'designing' | 'typing' | 'reading' | 'thinking' | 'writing' | 'complete';

// One room-space rig: hip (552,460), seat y=478, feet y=571.
// The desktop occludes the bent thighs, never a cropped standing sprite.
export const STUDY_RIG = { x: 480, y: 262, scale: 3, surface: 455 };
type Point = [number, number];
const p = SPIDER_PALETTE;
const wrists: Record<StudyPose, [Point, Point]> = {
  repairing: [[5,62],[-3,63]], designing: [[14,64],[-1,65]],
  writing: [[14,64],[-1,65]], typing: [[5,65],[-6,64]],
  reading: [[25,65],[0,65]], thinking: [[22,28],[-1,64]],
  idle: [[18,65],[0,64]], complete: [[18,65],[0,64]],
};
function Arm({ near, pose, frame, target }: { near: boolean; pose: StudyPose; frame: number; target:Point }) {
  const shoulder: Point = near ? [34,34] : [15,34];
  const elbow: Point = near ? [37,54] : [8,54];
  // Recalculate the forearm from its fixed elbow to the moving wrist. Shoulder,
  // elbow and hand stay connected; tools travel with the grip.
  const phase = Math.sin((frame + (near ? 0 : 12)) * Math.PI / 12) * .3;
  const writing = near && (pose === 'writing' || pose === 'designing');
  const wrist: Point = [target[0] + (writing ? phase : 0), target[1] +
    (pose === 'typing' || (near && pose === 'repairing') ? phase : 0)];
  const line = (a: Point, b: Point) => `M${a.join(' ')}L${b.join(' ')}`;
  return <g className={near ? 'spider-working-arm' : 'spider-far-hand'} data-hand={near ? 'near' : 'far'}>
    <path d={line(shoulder,elbow) + line(elbow,wrist)} fill="none" stroke={p.ink} strokeWidth="9" strokeLinecap="round"/>
    <path d={line(shoulder,elbow)} fill="none" stroke={near ? p.red : p.redDark} strokeWidth="7" strokeLinecap="round"/>
    <path d={`M${shoulder[0]-2} ${shoulder[1]+2}Q${elbow[0]-4} ${elbow[1]-8} ${elbow[0]-2} ${elbow[1]-2}`} fill="none" stroke={p.redDark} strokeWidth="2"/>
    <g transform={`translate(${elbow.join(' ')}) rotate(${Math.atan2(wrist[1]-elbow[1],wrist[0]-elbow[0])*180/Math.PI-90})`}>
      <path d={`M-3.5 0Q-4.3 4-2.5 ${Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1])+1}H2.5Q4.2 4 3.5 0Z`} fill={near?p.red:p.redDark}/>
      <path d={`M-1.5 2V${Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1])-3}`} fill="none" stroke={p.redLight} strokeWidth=".7"/>
      <g stroke={p.web} strokeWidth=".35" fill="none">
        {[4,8,12,16,20,24,28,32].filter(y=>y<Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1])-3).map(y=><path key={y} d={`M-3 ${y}Q0 ${y+2} 3 ${y}`}/>)}
        <path d={`M0 1V${Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1])-2}`}/>
      </g>
    </g>
    {/* Sleeve-local coordinates keep every web strand on the red fabric. */}
    <g transform={`translate(${shoulder.join(' ')}) rotate(${Math.atan2(elbow[1]-shoulder[1], elbow[0]-shoulder[0])*180/Math.PI-90})`}
      fill="none" stroke={p.web} strokeWidth=".38" strokeLinecap="round">
      <path d={`M-1.5 0V${Math.hypot(elbow[0]-shoulder[0], elbow[1]-shoulder[1])}M1.5 0V${Math.hypot(elbow[0]-shoulder[0], elbow[1]-shoulder[1])}`}/>
      {[3,7,11,15,19].map(y => <path key={y} d={`M-3.8 ${y}Q-2.5 ${y+1.5}-1.5 ${y}Q0 ${y+1.5} 1.5 ${y}Q2.5 ${y+1.5} 3.8 ${y}`}/>)}
    </g>
    <g className="spider-fingers" transform={`translate(${wrist.join(' ')})`}>
      <g transform="translate(0 -3)" strokeWidth=".45"><path d="M-4-2H3V1H-4Z" fill="#9ca9b3"/><path d="M-2-2H1V1H-2Z" fill="#455564"/><circle cx="-.5" cy="-.4" r=".6" fill="#b9e2e3"/></g>
      <path d="M-3-3Q0-4 3-2L5 0L6 3Q6 5 4 4L2 2L3 5Q2 7 0 5L-1 3L-2 5Q-4 6-5 4L-6 1Q-7-2-3-3Z" fill={p.red}/>
      <path d="M-4-1H2M-3 1H3M-1-2V3" fill="none" stroke={p.web} strokeWidth=".55"/>
      <path d="M-4-2H1" stroke={p.redLight} strokeWidth=".7"/>
      {(pose === 'writing' || pose === 'designing') && near && <path d="M0-5L3 6" stroke="#ead095" strokeWidth="1"/>}
      {pose === 'repairing' && near && <g><path d="M0-5V5" stroke="#ced7da"/><path d="M0-5V-1" stroke="#e0a45a" strokeWidth="2"/></g>}
      {near && ['repairing','writing','designing'].includes(pose) && <path d="M-3-1Q-2-3 0-2L2 0Q3 2 1 2L-1 1L-3 2Z" fill={p.redLight} stroke={p.web} strokeWidth=".45"/>}
    </g>
  </g>;
}
export function SeatedSpiderMan({ pose, layer = 'body' }: { pose: StudyPose; layer?: 'body' | 'hands' }) {
  const [frame, setFrame] = useState(0);
  const hands=useArticulatedPose(wrists[pose],pose,layer==='hands');
  useEffect(() => {
    if (layer !== 'hands') return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let id: number | undefined;
    const sync = () => {
      clearInterval(id);
      if (!document.hidden && !motion.matches && pose !== 'idle') {
        id = window.setInterval(() => setFrame(f => (f + 1) % 24), 100);
      } else setFrame(0);
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); };
  }, [layer, pose]);
  return <g className={`seated-spider pose-${pose} layer-${layer}`} data-pose={layer === 'body' ? pose : undefined} aria-label={`Spider-Man ${pose}`}>
    <g transform={`translate(${STUDY_RIG.x} ${STUDY_RIG.y}) scale(${STUDY_RIG.scale})`} shapeRendering="geometricPrecision" stroke={p.ink} strokeWidth="1" strokeLinejoin="miter">
      {layer === 'body' ? <>
        <ellipse cx="8" cy="104" rx="25" ry="3" fill="#10182b" opacity=".5" stroke="none"/>
        {/* Far thigh runs forward from the hip, then bends into a planted shin. */}
        <path data-limb="far-leg" d="M24 63H35V72L13 80L19 96L12 99L4 79V74Z" fill={p.blueDark}/>
        <path d="M12 92Q15 93 19 91L22 99Q27 101 25 105H9Q4 104 7 102L10 99Z" fill={p.redDark}/>
        {/* Near femur is nearly horizontal; knee is in front of the hip. */}
        <path data-limb="near-leg" d="M17 62H29V71L5 78L2 94H-6L-7 76L-4 72Z" fill={p.blue}/>
        <path d="M17 67L0 75L-2 88" fill="none" stroke={p.blueLight} strokeWidth="2"/>
        <path d="M-6 90Q-2 92 3 90L2 99Q2 102-2 104H-16Q-19 103-16 101L-9 98Z" fill={p.red}/>
        <path d="M-4 92L-5 100M-8 99H1M-13 102H-2M14 94L16 101M11 101H21" fill="none" stroke={p.web} strokeWidth=".6"/>
        <path d="M-16 104H-1M8 105H25" stroke={p.ink}/>
        <g className="spider-torso">
        <path d="M19 27Q23 30 28 27L34 31Q39 34 38 42L35 52L35 63Q24 69 15 63L14 51L12 39Q11 33 17 30Z" fill={SPIDER_PALETTE.red}/>
        <path d="M14 40H18V47H21V62H18V65H14ZM32 38H36V45H38V52H35V65H28V60H30V47H32Z" fill={SPIDER_PALETTE.blue}/>
        <path d="M34 47H36V58H33V63H30V60H32V51H34Z" fill={SPIDER_PALETTE.blueDark} stroke="none"/>
        <path d="M16 32H20V30H27V32H31M16 35V38M22 61H27" stroke={SPIDER_PALETTE.redLight} fill="none"/>
        <g fill="none" stroke={p.web} strokeWidth=".38" strokeLinejoin="round">
          <path d="M23.5 31V65M19 31L20.5 38L21 46L22 65M28 31L26.5 38L26 46L25 65M14 33L20.5 38L23.5 42L26.5 38L33 33M14 38L23.5 42L32 38M18 46L23.5 42L30 46"/>
          <path d="M17 33Q18 35 20 34Q23.5 36 27 34Q29 35 31 33M14 37Q17 39 20.5 38Q23.5 40 26.5 38Q29 39 32 37M18 43Q20 45 23.5 44Q27 45 30.5 43M21 49Q22 50.5 23.5 49Q25 50.5 26.5 49M21.5 54Q22.5 55.5 23.5 54Q25 55.5 26 54M22 59Q23 60.5 23.5 59Q24.5 60.5 25.5 59M22 64Q23 65 23.5 64Q24.5 65 25 64"/>
        </g>
        <path d="M16 35Q20 33 23 36Q28 33 33 36M20 48Q24 50 28 48M21 54Q24 56 27 54" fill="none" stroke={p.redDark} strokeWidth=".65"/>
        <g transform="translate(23 42) scale(.8)"><SpiderEmblem/></g>
        <g className="spider-head">
          <path d="M19.5 24H26.5V29L25 32H21L19.5 29Z" fill={SPIDER_PALETTE.redDark}/>
          <g transform="translate(23 6)"><SpiderMask/></g>
        </g>
        </g>
      </> : <><Arm pose={pose} frame={frame} target={hands[1]} near={false}/><Arm pose={pose} frame={frame} target={hands[0]} near/></>}
    </g>
  </g>;
}
