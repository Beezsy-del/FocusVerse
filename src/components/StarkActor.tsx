import React from 'react';
import {IllustratedActor} from './IllustratedActor';
import {SANCTUARIES} from '../data/sanctuaries';
import {CompanionPhase} from '../hooks/useCompanionPerformance';
type Activity = 'reactor' | 'diagnostics';
// Same room-space scale as Peter: head y=270, desktop y=455, planted feet y=577.
// Body is behind the bench; articulated arms and tools are above its surface.
export function StarkActor({layer,activity,phase='action',variation=0}:{layer:'body'|'hands';activity:Activity;frame:number;phase?:CompanionPhase;variation?:number}){
 return <g data-stark-layer={layer} className="refined-stark"><IllustratedActor id="tony-stark" d={SANCTUARIES['tony-stark']} tool={activity} layer={layer} phase={phase} variation={variation}/></g>;
}
