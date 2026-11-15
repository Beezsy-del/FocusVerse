import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {RosterSanctuaryActor} from '../src/components/RosterSanctuaryActor';
import {RosterPetActor} from '../src/components/RosterPetActor';
import {StarkActor} from '../src/components/StarkActor';
import {ROSTER_RIGS} from '../src/data/rosterActorRigs';
import {SANCTUARIES} from '../src/data/sanctuaries';
const root='public/assets/characters/roster-study-rigs';mkdirSync(root,{recursive:true});
const styles=readFileSync('src/components/RosterSanctuaryActor.css','utf8')+'\n*{animation:none!important}';
const inventory=[];
for(const [id,rig] of Object.entries(ROSTER_RIGS)){
 const d={...SANCTUARIES[id],...rig};
 const Actor=rig.stance==='pet'?RosterPetActor:RosterSanctuaryActor;
 for(const tool of d.tools){
  const viewBox=rig.stance==='pet'?`${rig.x-135} ${rig.y-50} 270 195`:`${rig.x-150} ${rig.y-50} 330 350`;
  const path=`${root}/${id}-${tool}.svg`;
  writeFileSync(path,renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={rig.stance==='pet'?540:660} height={rig.stance==='pet'?390:700}><style>{styles}</style><Actor id={id} d={d} tool={tool} layer="body"/><Actor id={id} d={d} tool={tool} layer="hands"/></svg>));
  inventory.push({id,tool,path,viewBox,anchor:[rig.x,rig.y],scale:rig.scale,stance:rig.stance});
 }
}
for(const activity of ['reactor','diagnostics'] as const){
 const path=`${root}/tony-stark-${activity}.svg`;
 writeFileSync(path,renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox="420 255 230 330" width="460" height="660"><StarkActor layer="body" activity={activity} frame={0}/><StarkActor layer="hands" activity={activity} frame={0}/></svg>));
 inventory.push({id:'tony-stark',tool:activity,path,viewBox:'420 255 230 330',anchor:[480,262],scale:3,stance:'seated'});
}
writeFileSync(`${root}/manifest.json`,JSON.stringify(inventory,null,2));
console.log(`Exported ${inventory.length} transparent poses from live vector source.`);
