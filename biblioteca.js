/* Biblioteca SST - camada colaborativa. Os documentos continuam nos endereços dos respectivos autores. */
(() => {
 'use strict';
 const entries = Array.isArray(window.SST_BIBLIOTECA) ? window.SST_BIBLIOTECA : [];
 const $ = (selector, root = document) => root.querySelector(selector);
 const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const categories = {
  normas: {label:'Normas',tone:['#154e73','#0d324b'],icon:'NR'},
  fundamentos: {label:'Fundamentos',tone:['#0b8272','#07554e'],icon:'SST'},
  riscos: {label:'Riscos ocupacionais',tone:['#b46d37','#754028'],icon:'⚠'},
  ergonomia: {label:'Ergonomia',tone:['#7562a5','#423872'],icon:'E'},
  pgr: {label:'GRO / PGR',tone:['#1f7968','#104f46'],icon:'GRO'},
  esocial: {label:'eSocial',tone:['#375f9b','#263e70'],icon:'e'},
  bibliotecas: {label:'Acervos e bibliotecas',tone:['#805e4b','#513c38'],icon:'+'}
 };
 let filter = 'todos';
 let q = '';
 let savedOnly = false;
 const savedKey = 'sst-biblioteca-salvos-v1';
 let saved = new Set();
 try { const raw=JSON.parse(localStorage.getItem(savedKey)||'[]'); if(Array.isArray(raw)) saved=new Set(raw.filter(v=>typeof v==='string')); } catch { /* localStorage pode estar bloqueado */ }
 const grid=$('#bib-grid'); const count=$('#bib-results'); const empty=$('#bib-empty');
 const dialog=$('#bib-dialog'); const frame=$('#bib-frame'); const external=$('#bib-dialog-external');
 $('#bib-total-hero').textContent = String(entries.length);
 function urlSafe(value) { try { const u=new URL(value); return u.protocol==='https:' ? u.href : ''; } catch { return ''; } }
 function cardFor(e) {
  const c=categories[e.category]||categories.fundamentos;
  const url=urlSafe(e.url);
  const isSaved=saved.has(e.id);
  const article=document.createElement('article');
  article.className='bib-card';article.dataset.id=e.id;
  article.innerHTML=`<div class="bib-card-top"><div class="bib-bookcover" role="img" aria-label="Capa ilustrativa de ${esc(e.short)}" style="--cover-start:${c.tone[0]};--cover-end:${c.tone[1]}"><span class="bib-cover-icon" aria-hidden="true">${esc(c.icon)}</span><strong class="bib-cover-title">${esc(e.short)}</strong><span class="bib-cover-publisher">${esc(e.source)}</span></div><small class="bib-cover-note">Capa ilustrativa</small></div><div class="bib-card-body"><div class="bib-card-type"><span>${e.pdf?'▤':'▣'}</span> ${esc(e.kind)} · ${esc(c.label)}</div><h3>${esc(e.title)}</h3><p class="bib-meta">${esc(e.author)} · ${esc(e.year)}</p><p class="bib-description">${esc(e.description)}</p>${e.note?`<p class="bib-note">${esc(e.note)}</p>`:''}</div><div class="bib-card-actions">${e.pdf?`<button type="button" class="bib-read-btn" data-read="${esc(e.id)}" aria-label="Ler ${esc(e.title)} na página">📖 Ler aqui</button>`:''}<a class="bib-source-btn" href="${esc(url)}" rel="noopener noreferrer" target="_blank" aria-label="Abrir ${esc(e.title)} no site da instituição">${e.pdf?'Abrir PDF ↗':'Abrir fonte ↗'}</a><button class="bib-save-btn" type="button" data-save="${esc(e.id)}" aria-pressed="${isSaved}" aria-label="${isSaved?'Remover dos salvos':'Salvar na lista'}: ${esc(e.title)}">${isSaved?'★ Salvo':'☆ Salvar'}</button></div>`;
  return article;
 }
 function render() {
  const found=entries.filter(e=> (filter==='todos'||e.category===filter)&&(!savedOnly||saved.has(e.id))&&norm([e.title,e.short,e.author,e.category,e.description,e.source,e.kind].join(' ')).includes(norm(q)));
  grid.replaceChildren(...found.map(cardFor));
  empty.hidden=found.length!==0;
  count.textContent=`${found.length} ${found.length===1?'material encontrado':'materiais encontrados'} · ${entries.length} no acervo`;
 }
 function clearFilters(){ filter='todos';q='';savedOnly=false;$('#bib-search').value='';$('#bib-only-saved').checked=false;$('#bib-filters').querySelectorAll('button').forEach(btn=>{const active=btn.dataset.filter==='todos';btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});render();}
 $('#bib-search').addEventListener('input',e=>{q=e.target.value;render();});
 $('#bib-only-saved').addEventListener('change',e=>{savedOnly=e.target.checked;render();});
 $('#bib-filters').addEventListener('click',e=>{const btn=e.target.closest('button[data-filter]');if(!btn)return;filter=btn.dataset.filter;$('#bib-filters').querySelectorAll('button').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();});
 $('#bib-clear').addEventListener('click',clearFilters);$('#bib-reset').addEventListener('click',clearFilters);
 function save(id){if(saved.has(id))saved.delete(id);else saved.add(id);try {localStorage.setItem(savedKey,JSON.stringify([...saved]));}catch{ /* uso sem armazenamento */ }render();}
 function stopReader(){frame.removeAttribute('src');if(dialog.open)dialog.close();}
 function read(id){
  const entry=entries.find(x=>x.id===id && x.pdf);if(!entry)return;
  const url=urlSafe(entry.url);if(!url)return;
  $('#bib-dialog-title').textContent=entry.title;
  $('#bib-dialog-author').textContent=entry.author;
  external.href=url;
  frame.title=`Leitor de PDF: ${entry.title}`;
  // PDF depende de o servidor permitir incorporação em iframe.
  frame.src=url+'#toolbar=1&navpanes=0';
  if(typeof dialog.showModal==='function')dialog.showModal();else window.open(url,'_blank','noopener,noreferrer');
 }
 grid.addEventListener('click',e=>{const saveBtn=e.target.closest('[data-save]');if(saveBtn){save(saveBtn.dataset.save);return;}const readBtn=e.target.closest('[data-read]');if(readBtn)read(readBtn.dataset.read);});
 $('#bib-dialog-close').addEventListener('click',stopReader);$('#bib-dialog-done').addEventListener('click',stopReader);
 dialog.addEventListener('close',()=>frame.removeAttribute('src'));
 dialog.addEventListener('click',e=>{if(e.target===dialog)stopReader();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open)stopReader();});
 render();
})();
