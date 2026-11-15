import React from 'react';

export type HandGesture = 'rest' | 'grip' | 'palm' | 'keys' | 'ear' | 'support';

/** Palm and fingers share a wrist anchor. Foreground fingers are drawn after
 * the prop so a held object sits inside the grip instead of covering the hand. */
export function IllustratedHand({gesture, fill, crease, foreground = false}: {
  gesture: HandGesture; fill: string; crease: string; foreground?: boolean;
}) {
  if (foreground) {
    if (gesture !== 'grip') return null;
    return <g strokeWidth=".7" stroke={crease}>
      <path d="M-5-2Q-2-5 1-3L5 0Q6 3 3 3L-1 1L-4 3Q-7 3-7 1Z" fill={fill}/>
      <path d="M-5 5Q0 7 4 5M-4 8Q0 9 3 7" fill="none"/>
    </g>;
  }
  const outlines: Record<HandGesture,string> = {
    rest:'M-5-4Q-6 0-7 3L-7 10Q-7 14-5 13L-4 7L-3 17Q-1 19 0 16L0 8L2 16Q4 18 5 14L4 7L6 11Q9 12 8 8L5 1L4-4Z',
    grip:'M-5-4Q-9-2-9 3L-7 9Q-4 13 1 11L6 8Q9 4 6 0L3-3L0-2L-1-5Z',
    palm:'M-5-3L-6 1L-13-3Q-17-3-14 1L-7 7Q0 12 7 5L16-3Q18-6 15-6L6 0L13-10Q13-13 10-11L2-3L6-14Q5-17 3-14L-2-5L-2-12Q-4-15-5-11Z',
    keys:'M-5-4L-8 0L-12 4Q-13 7-10 6L-5 4L-6 9Q-5 12-3 9L0 4L1 10Q3 12 4 9L4 3L7 8Q10 9 9 5L6-2L4-4Z',
    ear:'M-5 3Q-8-1-7-7L-8-13Q-7-16-5-13L-3-7L-5-16Q-4-19-2-16L0-7L-1-16Q1-18 2-15L3-6L4-12Q6-14 7-11L6-2L8-5Q11-5 10-1L5 7Z',
    support:'M-5-4L-10 0L-14 3Q-16 6-12 6L-6 4L-5 9Q1 14 9 9L15 5Q16 2 12 3L6 5L0 3L4 1Q6-2 3-3L-1-1Z',
  };
  return <g data-hand-gesture={gesture} transform={gesture==='palm'?'scale(.82)':undefined}>
    <path d={outlines[gesture]} fill={fill}/>
    <path d={gesture==='ear'?'M-3-7L-2 0M0-7L1 0M3-6L3 1':gesture==='palm'?'M-4 3Q0 6 5 2':gesture==='support'?'M-5 6Q2 10 10 5':gesture==='keys'?'M-5 2L-2 0M1 1L4 0':'M-4 3Q0 0 4 3M-2 7L-1 10'} stroke={crease} strokeWidth=".65" fill="none"/>
  </g>;
}
