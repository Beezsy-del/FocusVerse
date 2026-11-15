import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {mkdirSync,writeFileSync} from 'node:fs';
import {SeatedSpiderMan, StudyPose} from '../src/components/SeatedSpiderMan';
import {ReferenceSanctuaryActor} from '../src/components/ReferenceSanctuaryActor';
const output='public/assets/characters/reference-study-rigs';mkdirSync(output,{recursive:true});
for(const [id,tools] of [['bruce-wayne',['scanner','wrench']],['naruto-uzumaki',['brush','orb']]] as const) {
 for(const tool of tools) {
  const svg=renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox="450 230 230 355" width="460" height="710" aria-label={`${id} ${tool}`}><ReferenceSanctuaryActor id={id} tool={tool} layer="body"/><ReferenceSanctuaryActor id={id} tool={tool} layer="hands"/></svg>);
  writeFileSync(`${output}/${id}-${tool}.svg`,svg);
 }
}
const spiderOutput='public/assets/characters/spiderman/study-rig';mkdirSync(spiderOutput,{recursive:true});
for(const pose of ['idle','repairing','designing','typing','reading','thinking','writing','complete'] as StudyPose[]) {
 writeFileSync(`${spiderOutput}/${pose}.svg`,renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox="400 245 256 350" width="256" height="350"><SeatedSpiderMan pose={pose}/><SeatedSpiderMan pose={pose} layer="hands"/></svg>));
}
console.log('Exported 12 transparent reference character poses.');
