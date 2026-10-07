export function makePDF(lines:string[]){
 const clean=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7e]/g,' ').replace(/([\\()])/g,'\\$1');
 const pages=[];for(let i=0;i<lines.length;i+=34)pages.push(lines.slice(i,i+34));
 const objs:string[]=['','<< /Type /Catalog /Pages 2 0 R >>','', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];const kids=[];
 for(const page of pages){const id=objs.length; kids.push(`${id} 0 R`);const stream=`0.08 0.17 0.15 rg 40 745 515 55 re f\nBT /F1 20 Tf 0.72 0.94 0.36 rg 56 764 Td (QUADRA / RELATORIO DE DESEMPENHO) Tj ET\nBT /F1 11 Tf 0.12 0.17 0.16 rg 56 715 Td 18 TL ${page.map((l,i)=>`${i?'T* ':''}(${clean(l)}) Tj`).join('\n')} ET`;
 objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${id+1} 0 R >>`,`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);}
 objs[2]=`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${kids.length} >>`;let out='%PDF-1.4\n',offsets=[0];for(let i=1;i<objs.length;i++){offsets.push(out.length);out+=`${i} 0 obj\n${objs[i]}\nendobj\n`;}const start=out.length;out+=`xref\n0 ${objs.length}\n0000000000 65535 f \n`+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+`trailer << /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;return new Blob([out],{type:'application/pdf'});
}
export function download(blob:Blob,name:string){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
