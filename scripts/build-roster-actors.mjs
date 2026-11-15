import {buildSync} from 'esbuild';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
const temp=mkdtempSync(join(tmpdir(),'focusverse-actors-'));
try {
 const outfile=join(temp,'export.cjs');
 buildSync({entryPoints:['scripts/export-roster-actors.tsx'],bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile});
 execFileSync(process.execPath,[outfile],{stdio:'inherit'});
} finally {rmSync(temp,{recursive:true,force:true})}
