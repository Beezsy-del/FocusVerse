import {RigPoint} from '../hooks/useArticulatedPose';
export interface RosterRig {x:number;y:number;scale:number;stance:'standing'|'seated'|'crouch'|'gown'|'pet';shoulders:[number,number];near:Record<string,[RigPoint,RigPoint]>;far?:Record<string,[RigPoint,RigPoint]>;breath:number;dwell:number;}
export const ROSTER_RIGS:Record<string,RosterRig>={
 'miles-morales':{x:565,y:278,scale:1.16,stance:'standing',shoulders:[-29,29],near:{spray:[[45,108],[27,139]],spark:[[47,106],[40,119]]},breath:6.3,dwell:27000},
 'gwen-stacy':{x:565,y:280,scale:1.15,stance:'seated',shoulders:[-25,25],near:{sticks:[[48,111],[3,149]],cymbal:[[67,108],[110,133]]},far:{sticks:[[-51,115],[-41,146]],cymbal:[[-52,111],[-40,146]]},breath:5.8,dwell:23000},
 'gojo-satoru':{x:565,y:269,scale:1.2,stance:'standing',shoulders:[-30,30],near:{infinity:[[46,113],[53,118]],blindfold:[[50,87],[25,23]]},breath:7.1,dwell:31000},
 'levi-ackerman':{x:565,y:293,scale:1.1,stance:'seated',shoulders:[-29,29],near:{blade:[[43,111],[-9,139]],cup:[[44,106],[5,74]]},far:{blade:[[-44,109],[-24,122]]},breath:7.7,dwell:29000},
 'l-lawliet':{x:565,y:294,scale:1.1,stance:'crouch',shoulders:[-27,27],near:{pencil:[[43,114],[-12,148]],sugar:[[41,91],[4,47]]},breath:8.3,dwell:33000},
 'elsa':{x:565,y:269,scale:1.2,stance:'gown',shoulders:[-23,23],near:{snow:[[41,104],[43,116]],ribbon:[[39,97],[34,102]]},far:{snow:[[-37,112],[-20,133]],ribbon:[[-37,108],[-13,126]]},breath:8.7,dwell:30000},
 'rapunzel':{x:565,y:286,scale:1.13,stance:'seated',shoulders:[-25,25],near:{brush:[[42,116],[-13,154]],lantern:[[44,107],[37,121]]},breath:6.7,dwell:26000},
 'moana':{x:565,y:281,scale:1.15,stance:'standing',shoulders:[-28,28],near:{compass:[[43,104],[24,117]],paddle:[[49,117],[37,139]]},far:{paddle:[[-41,107],[-9,118]],compass:[[-43,109],[-30,139]]},breath:7.3,dwell:28000},
 'hermione-granger':{x:565,y:282,scale:1.15,stance:'seated',shoulders:[-27,27],near:{quill:[[43,117],[-10,157]],wand:[[43,103],[36,121]]},breath:6.9,dwell:25000},
 'wednesday-addams':{x:610,y:283,scale:1.14,stance:'seated',shoulders:[-25,25],near:{type:[[1,117],[-67,162]],bow:[[28,113],[-35,157]]},far:{type:[[-51,118],[-92,158]],bow:[[-43,111],[-39,109]]},breath:9.1,dwell:34000},
 'officer-k':{x:565,y:280,scale:1.15,stance:'seated',shoulders:[-30,30],near:{scanner:[[46,108],[25,126]],horse:[[43,104],[16,122]]},far:{horse:[[-42,111],[-6,129]]},breath:8.1,dwell:32000},
 'neo':{x:565,y:280,scale:1.15,stance:'seated',shoulders:[-28,28],near:{type:[[40,119],[-10,155]],spoon:[[43,105],[30,114]]},far:{type:[[-45,122],[-43,155]]},breath:8.9,dwell:35000},
 'cozy-study-girl':{x:565,y:285,scale:1.13,stance:'seated',shoulders:[-25,25],near:{pencil:[[41,118],[-13,155]],cup:[[40,107],[3,96]]},far:{cup:[[-39,109],[-7,101]]},breath:6.8,dwell:29000},
 'late-night-study-boy':{x:565,y:281,scale:1.15,stance:'seated',shoulders:[-28,28],near:{type:[[43,120],[-13,155]],headphones:[[53,76],[30,23]]},far:{type:[[-48,119],[-47,153]]},breath:7.4,dwell:28000},
 'purring-window-cat':{x:505,y:343,scale:1.15,stance:'pet',shoulders:[-43,0],near:{},breath:5.7,dwell:30000},
 'loyal-fireplace-dog':{x:505,y:420,scale:1.15,stance:'pet',shoulders:[-43,0],near:{},breath:6.4,dwell:31000},
};
