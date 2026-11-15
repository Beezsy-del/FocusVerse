import { useEffect, useState } from 'react';
import { FocusCompanion, isFocusCompanion } from '../data/focusRooms';
export const FOCUS_STORAGE_KEY = 'focusverse_focus_v1';
export interface FocusRecord {id:string;companion:string;intention:string;minutes:number;completedAt:number;reflection:string;}
export interface FocusSession {id:string;companion:FocusCompanion;intention:string;minutes:number;status:'running'|'paused'|'complete';remainingMs:number;deadline:number;}
interface FocusState {companion:FocusCompanion;intention:string;minutes:number;session:FocusSession|null;records:FocusRecord[];}
const fresh:FocusState={companion:'peter-parker',intention:'',minutes:25,session:null,records:[]};
function legacyRecords():FocusRecord[] {
  try {
    const records=JSON.parse(localStorage.getItem('focusverse_sessions')||'[]');
    if(!Array.isArray(records))return [];
    return records.filter(r=>r&&typeof r.id==='string'&&r.completed===true&&Number.isFinite(r.timestamp)&&Number.isFinite(r.durationMinutes)&&r.durationMinutes>0&&r.durationMinutes<=1440)
      .map(r=>({id:`legacy-${r.id}`,companion:typeof r.tutorId==='string'?r.tutorId:'',intention:typeof r.taskTitle==='string'&&r.taskTitle.trim()?r.taskTitle:typeof r.subject==='string'?r.subject:'Focus session',minutes:r.durationMinutes,completedAt:r.timestamp,reflection:typeof r.notes==='string'?r.notes:''}))
      .sort((a,b)=>b.completedAt-a.completedAt);
  }catch{return []}
}
function readState():FocusState {
  try {
    const saved=JSON.parse(localStorage.getItem(FOCUS_STORAGE_KEY)||'null');
    if(!saved||!isFocusCompanion(saved.companion))return {...fresh,records:legacyRecords()};
    const validSession=(s:any)=>s&&typeof s.id==='string'&&isFocusCompanion(s.companion)&&typeof s.intention==='string'&&s.intention.trim()&&[15,25,50].includes(s.minutes)&&['running','paused','complete'].includes(s.status)&&Number.isFinite(s.remainingMs)&&s.remainingMs>=0&&s.remainingMs<=s.minutes*60000&&Number.isFinite(s.deadline);
    return {companion:saved.companion,intention:typeof saved.intention==='string'?saved.intention.slice(0,160):'',minutes:[15,25,50].includes(saved.minutes)?saved.minutes:25,session:validSession(saved.session)?saved.session:null,records:Array.isArray(saved.records)?saved.records.filter((r:any)=>r&&typeof r.id==='string'&&typeof r.companion==='string'&&typeof r.intention==='string'&&typeof r.reflection==='string'&&Number.isFinite(r.completedAt)&&Number.isFinite(r.minutes)&&r.minutes>0&&r.minutes<=1440):[]};
  }catch{return {...fresh,records:legacyRecords()};}
}
export function settleFocus(state:FocusState,now:number):FocusState {
  const s=state.session;
  if(!s||s.status!=='running'||now<s.deadline)return state;
  const record:FocusRecord={id:s.id,companion:s.companion,intention:s.intention,minutes:s.minutes,completedAt:s.deadline,reflection:''};
  return {...state,session:{...s,status:'complete',remainingMs:0},records:state.records.some(r=>r.id===s.id)?state.records:[record,...state.records]};
}
export function useFocusSession() {
  const [state,setState]=useState(()=>settleFocus(readState(),Date.now()));
  const [now,setNow]=useState(Date.now);
  const [storageError,setStorageError]=useState(false);
  useEffect(()=>{try{localStorage.setItem(FOCUS_STORAGE_KEY,JSON.stringify(state));setStorageError(false)}catch{setStorageError(true)}},[state]);
  useEffect(()=>{
    const sync=()=>{const time=Date.now();setNow(time);setState(previous=>settleFocus(previous,time));};
    const timer=window.setInterval(sync,250);
    document.addEventListener('visibilitychange',sync);
    // Other tabs share a single timer rather than completing separate copies.
    const restore=(e:StorageEvent)=>{if(e.key===FOCUS_STORAGE_KEY){setState(settleFocus(readState(),Date.now()));setNow(Date.now())}};
    window.addEventListener('storage',restore);
    return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',sync);window.removeEventListener('storage',restore)};
  },[]);
  const session=state.session;
  const remaining=session?(session.status==='running'?Math.max(0,session.deadline-now):session.remainingMs):state.minutes*60000;
  return { ...state,remaining,storageError,
    choose:(companion:FocusCompanion)=>setState(s=>s.session?s:{...s,companion}),
    setIntention:(intention:string)=>setState(s=>s.session?s:{...s,intention:intention.slice(0,160)}),
    setMinutes:(minutes:number)=>setState(s=>s.session||![15,25,50].includes(minutes)?s:{...s,minutes}),
    start:()=>{const time=Date.now();setNow(time);setState(s=>s.session||!s.intention.trim()?s:{...s,session:{id:crypto.randomUUID(),companion:s.companion,intention:s.intention.trim(),minutes:s.minutes,status:'running',remainingMs:s.minutes*60000,deadline:time+s.minutes*60000}})},
    pause:()=>{const time=Date.now();setState(previous=>{const s=settleFocus(previous,time);return s.session?.status==='running'?{...s,session:{...s.session,status:'paused',remainingMs:Math.max(0,s.session.deadline-time)}}:s})},
    resume:()=>{const time=Date.now();setNow(time);setState(s=>s.session?.status==='paused'?{...s,session:{...s.session,status:'running',deadline:time+s.session.remainingMs}}:s)},
    end:()=>setState(s=>({...s,session:null})),
    reflect:(reflection:string)=>setState(s=>s.session?.status==='complete'?{...s,records:s.records.map(r=>r.id===s.session?.id?{...r,reflection:reflection.slice(0,500)}:r)}:s),
    next:()=>setState(s=>({...s,session:null,intention:''})),
  };
}
