import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {IllustratedActor} from '../src/components/IllustratedActor';
import {IllustratedPetActor} from '../src/components/IllustratedPetActor';
import {ILLUSTRATED_PLACEMENTS} from '../src/data/illustratedActorRigs';
import {SANCTUARIES} from '../src/data/sanctuaries';
const root='public/assets/characters/illustrated-study-rigs';mkdirSync(root,{recursive:true});
const styles=readFileSync('src/components/IllustratedActor.css','utf8')+'\n*{animation:none!important}';
const inventory=[];
for(const [id,rig] of Object.entries(ILLUSTRATED_PLACEMENTS)){
 const d={...SANCTUARIES[id],...rig};
 const pet=rig.stance==='pet',Actor=pet?IllustratedPetActor:IllustratedActor;
 const tools=id==='tony-stark'?['reactor','diagnostics']:d.tools;
 for(const appearance of (['miles-morales','gwen-stacy'].includes(id)?['masked','unmasked']:['masked']) as ('masked'|'unmasked')[])for(const pose of ['idle','observe','action-0','action-1']){
  const phase=pose.startsWith('action')?'action':pose as 'idle'|'observe';
  const tool=tools[pose==='action-1'?1:0];
  const viewBox=pet?`${rig.x-200} ${rig.y-70} 400 240`:`${rig.x-195} ${rig.y-85} 390 455`;
  const path=`${root}/${id}-${pose}${appearance==='unmasked'?'-unmasked':''}.svg`;
  writeFileSync(path,renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={pet?800:780} height={pet?480:910}><style>{styles}</style><Actor id={id} d={d} tool={tool} layer="body" phase={phase} appearance={appearance}/><Actor id={id} d={d} tool={tool} layer="hands" phase={phase} appearance={appearance}/></svg>));
  inventory.push({id,pose,appearance,tool,path,viewBox,anchor:[rig.x,rig.y],scale:rig.scale,stance:rig.stance,ground:rig.ground});
 }
}
writeFileSync(`${root}/manifest.json`,JSON.stringify(inventory,null,2));
console.log(`Exported ${inventory.length} transparent key poses from the live illustrated source.`);
