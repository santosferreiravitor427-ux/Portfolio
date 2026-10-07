import * as esbuild from 'esbuild';
import {mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
mkdirSync('dist',{recursive:true});
await esbuild.build({entryPoints:['entry.tsx'],bundle:true,outfile:'dist/app.js',minify:true,jsx:'automatic',alias:{'@':process.cwd()}});
execFileSync('npx',['@tailwindcss/cli','-i','app/globals.css','-o','dist/style.css','--minify'],{stdio:'inherit'});
