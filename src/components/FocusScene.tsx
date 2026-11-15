import React, {memo} from 'react';
import { CharacterSanctuary } from './CharacterSanctuary';
import { SpiderStudyRoom } from './SpiderStudyRoom';
import { focusCharacter, FocusCompanion } from '../data/focusRooms';
const noop=()=>{};
export const FocusScene=memo(function FocusScene({id,status}:{id:FocusCompanion;status:'running'|'paused'|'complete'|'ready'}){
 const action=status==='running'?'FOCUSING':status==='complete'?'COMPLETED':status==='paused'?'BREAK':'IDLE';
 return <div className="focus-scene">{id==='peter-parker'?<SpiderStudyRoom action={action} completion={0} onMusic={noop} onNotes={noop} onTasks={noop}/>:<CharacterSanctuary character={focusCharacter(id)} action={action} onCompanionClick={noop} onMusic={noop} onNotes={noop} onTasks={noop}/>}</div>;
});
