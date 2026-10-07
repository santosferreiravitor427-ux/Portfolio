import {progressDb} from '@/lib/progress-db';
export async function GET(){
 try{const r=await progressDb().prepare('SELECT key,value FROM progress').all();return Response.json(Object.fromEntries(r.results.map((x:any)=>[x.key,JSON.parse(x.value)])),{headers:{'Cache-Control':'no-store'}})}
 catch(e){console.error(e);return Response.json({error:'Não foi possível carregar seu progresso. Tente novamente.'},{status:503})}
}
export async function POST(req:Request){
 if(req.headers.get('sec-fetch-site')==='cross-site')return new Response('Forbidden',{status:403});
 try{
  const raw=await req.text();if(raw.length>35000)return new Response('Payload too large',{status:413});
  let body:any;try{body=JSON.parse(raw)}catch{return Response.json({error:'JSON inválido'},{status:400})}
  if(!body||typeof body!=='object')return new Response('Invalid body',{status:400});
  const {key,value}=body;const encoded=JSON.stringify(value);
  if(typeof key!=='string'||!/^((task|review|note|attempt|taf)-[a-zA-Z0-9_-]+|settings)$/.test(key)||encoded===undefined||encoded.length>30000)return Response.json({error:'Dados inválidos'},{status:400});
  await progressDb().prepare('INSERT INTO progress (key,value,updated_at) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at').bind(key,encoded,new Date().toISOString()).run();return Response.json({ok:true});
 }catch(e){console.error(e);return Response.json({error:'Não foi possível salvar. Tente novamente.'},{status:503})}
}
