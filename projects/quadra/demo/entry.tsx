import React from 'react';
import {createRoot} from 'react-dom/client';
import Home from './app/page';
const KEY='vitor-demo-quadra-v1';
const nativeFetch=window.fetch.bind(window);
window.fetch=(async(input:any,options:any={})=>{if(String(input)!=='/api/state')return nativeFetch(input,options);try{let state=JSON.parse(localStorage.getItem(KEY)||'{"revision":0}');if((options.method||'GET')==='PUT'){const next=JSON.parse(options.body);if(next.revision!==state.revision)return new Response(JSON.stringify({error:'Os dados foram alterados. Recarregue a página.',revision:state.revision}),{status:409});state={data:next.data,revision:state.revision+1};localStorage.setItem(KEY,JSON.stringify(state));}return new Response(JSON.stringify(state),{status:200,headers:{'Content-Type':'application/json'}});}catch{return new Response(JSON.stringify({error:'Armazenamento indisponível neste navegador.'}),{status:500})}}) as typeof fetch;
createRoot(document.getElementById('root')!).render(<Home/>);
