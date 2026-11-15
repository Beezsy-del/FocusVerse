import React from 'react';
import {IllustratedActor} from './IllustratedActor';
import {IllustratedPetActor} from './IllustratedPetActor';
import {ILLUSTRATED_RIGS,ILLUSTRATED_PETS} from '../data/illustratedActorRigs';
import {CompanionPhase} from '../hooks/useCompanionPerformance';
import {ROSTER_RIGS} from '../data/rosterActorRigs';
import {RosterSanctuaryActor} from './RosterSanctuaryActor';
import {RosterPetActor} from './RosterPetActor';
import {ReferenceSanctuaryActor} from './ReferenceSanctuaryActor';
import {SanctuaryDesign} from '../data/sanctuaries';

// Peter and Tony have dedicated room rigs. Every other roster member is routed
// to its authored pose configuration; no low-detail recolored actor fallback.
export function SanctuaryActor({id,design,tool,layer,phase,variation,appearance}:{id:string;design:SanctuaryDesign;tool:string;frame:number;layer:'body'|'hands';phase?:CompanionPhase;variation?:number;appearance?:'masked'|'unmasked'}) {
 if(id==='bruce-wayne'||id==='naruto-uzumaki')return <ReferenceSanctuaryActor id={id} tool={tool} layer={layer}/>;
 if(ILLUSTRATED_PETS[id])return <IllustratedPetActor id={id} tool={tool} layer={layer} phase={phase}/>;
 if(ILLUSTRATED_RIGS[id])return <IllustratedActor id={id} d={design} tool={tool} layer={layer} phase={phase} variation={variation} appearance={appearance}/>;
 const rig=ROSTER_RIGS[id];
 if(!rig)return null;
 if(rig.stance==='pet')return <RosterPetActor id={id} d={design} tool={tool} layer={layer}/>;
 return <RosterSanctuaryActor id={id} d={design} tool={tool} layer={layer}/>;
}
