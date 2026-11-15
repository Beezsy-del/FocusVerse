import { CHARACTERS } from './characters';
export const FOCUS_ROOMS = [
  {id:'peter-parker',name:'Peter',title:'After hours in Queens',description:'A warm workbench above a city that never sleeps.'},
  {id:'gwen-stacy',name:'Gwen',title:'A room of your own',description:'Soft city light and a little creative company.'},
  {id:'naruto-uzumaki',name:'Naruto',title:'An evening in the Leaf',description:'A quiet desk, a mountain view, and steady determination.'},
  {id:'purring-window-cat',name:'Window cat',title:'The quiet window',description:'Rain outside. A cat nearby. Nothing else to keep up with.'},
] as const;
export type FocusCompanion = typeof FOCUS_ROOMS[number]['id'];
export const isFocusCompanion = (id: unknown): id is FocusCompanion => FOCUS_ROOMS.some(room=>room.id===id);
export const focusCharacter = (id: FocusCompanion) => CHARACTERS.find(character=>character.id===id)!;

export const focusCompanionName = (id:string) => FOCUS_ROOMS.find(room=>room.id===id)?.name || CHARACTERS.find(character=>character.id===id)?.name.split(' (')[0] || 'a companion';
