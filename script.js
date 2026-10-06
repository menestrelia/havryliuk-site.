'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Відкрити меню');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const filters=[...document.querySelectorAll('.filter')];
const cases=[...document.querySelectorAll('.case')];
const subfilters=document.querySelector('#subfilters');
let zone='all',operation='all';
const suboptions={all:[['all','Усі результати']],breast:[['all','Усі результати']],body:[['all','Усі результати']],face:[['all','Усі результати']]};
function renderCases(){let count=0;cases.forEach(card=>{const show=(zone==='all'||card.dataset.zone===zone)&&(operation==='all'||card.dataset.operation===operation);card.hidden=!show;if(show)count++;});document.querySelector('#empty-results').hidden=count>0;}
function renderSubfilters(){subfilters.replaceChildren();suboptions[zone].forEach(([value,label])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.classList.toggle('active',value===operation);b.setAttribute('aria-pressed',String(value===operation));b.addEventListener('click',()=>{operation=value;renderSubfilters();renderCases();});subfilters.append(b);});}
filters.forEach(b=>b.addEventListener('click',()=>{zone=b.dataset.zone;operation='all';filters.forEach(f=>{const active=f===b;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active));});renderSubfilters();renderCases();}));renderSubfilters();
const interest=document.querySelector('#interest');
document.querySelectorAll('[data-interest]').forEach(item=>item.addEventListener('click',()=>{interest.value=item.dataset.interest;if(item.tagName==='BUTTON'){document.querySelector('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});} }));
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#message').value=b.dataset.question;document.querySelector('#message').focus({preventScroll:false});}));
document.querySelector('#consultation-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const result=document.querySelector('#form-result');result.textContent=`Попередній перегляд — дані не надіслано.\n\n${data.get('name')}\n${data.get('phone')}\n${data.get('interest')}\n${data.get('message')||''}\n\nДля запису: +38 068 44 22 103 (реєстратура MEDHOUSE).`;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});});

const lightbox=document.querySelector('.gallery-dialog');let galleryTrigger;
document.querySelectorAll('.case-image').forEach(button=>button.addEventListener('click',()=>{galleryTrigger=button;const img=button.querySelector('img');lightbox.querySelector('img').src=img.src;lightbox.querySelector('img').alt=img.alt;lightbox.querySelector('p').textContent=img.alt;lightbox.showModal();}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});lightbox.addEventListener('close',()=>galleryTrigger?.focus());
