import React from 'react';
import {createRoot} from 'react-dom/client';
import Home from './app/page';
const KEY='vitor-demo-gcm-v1';
const nativeFetch=window.fetch.bind(window);
window.fetch=(async(input:any,options:any={})=>{if(String(input)!=='/api/progress')return nativeFetch(input,options);try{let data=JSON.parse(localStorage.getItem(KEY)||'{}'); if((options.method||'GET')==='POST'){const {key,value}=JSON.parse(options.body);data[key]=value;localStorage.setItem(KEY,JSON.stringify(data));}return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});}catch{return new Response(JSON.stringify({error:'Armazenamento indisponível neste navegador.'}),{status:500})}}) as typeof fetch;
createRoot(document.getElementById('root')!).render(<Home/>);
