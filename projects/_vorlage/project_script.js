/* CREATE: QUASARPHYSICS — SECTION ENGINE
 * Du bearbeitest Inhalte ausschließlich in project_data.js.
 * Neue Sections werden anhand des Feldes `type` automatisch generiert.
 * Unterstützte Typen: cards, story, timeline, connect, faq, text, gallery.
 */
(()=>{
  'use strict';
  const cfg=window.PROJECT_DATA;
  if(!cfg){document.getElementById('sections').textContent='Project configuration missing.';return;}
  const langKey='thundr-studios-lang-v6',themeKey='thundr-studios-theme-v6';
  const get=k=>{try{return localStorage.getItem(k)}catch(_){return null}};
  const put=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
  let lang=get(langKey)==='en'?'en':'de';
  let theme=get(themeKey)==='light'?'light':'dark';
  let toastTimer;
  const msg={
    de:{skip:'Zum Inhalt springen',studio:'Studio',eyebrow:'CREATE MOD · PHYSICS · MULTIPLAYER',edition:'A NEW UNIVERSE OF ENGINEERING',hero1:'BUILD THE',hero2:'IMPOSSIBLE.',heroText:'Dein Space für Create, Physik, kreative Maschinen und große Ideen. Entdecke das QuasarPhysics-Projekt.',explore:'Universum erkunden',connect:'Serveradresse',by:'EIN THUNDR_STUDIOS PROJEKT',top:'Zurück nach oben ↑',disclaimer:'Unabhängiges Minecraft-Fanprojekt. Nicht mit Mojang oder Microsoft verbunden.',copy:'Serveradresse kopieren',copied:'Serveradresse kopiert!',copyFail:'Kopieren nicht möglich. Bitte Adresse markieren und manuell kopieren.',address:'SERVERADRESSE / JAVA EDITION',notice:'Die Adresse ist keine Website-URL.',version:'Minecraft-Version',notSet:'Noch nicht bestätigt',menu:'Menü öffnen',close:'Menü schließen',light:'Light Mode aktivieren',dark:'Dark Mode aktivieren',planned:'GEPLANT',current:'IN ARBEIT',noAddress:'Keine Serveradresse eingetragen'},
    en:{skip:'Skip to content',studio:'Studio',eyebrow:'CREATE MOD · PHYSICS · MULTIPLAYER',edition:'A NEW UNIVERSE OF ENGINEERING',hero1:'BUILD THE',hero2:'IMPOSSIBLE.',heroText:'Your space for Create, physics, inventive machinery and ambitious ideas. Discover the QuasarPhysics project.',explore:'Explore the universe',connect:'Server address',by:'A THUNDR_STUDIOS PROJECT',top:'Back to top ↑',disclaimer:'Independent Minecraft fan project. Not affiliated with Mojang or Microsoft.',copy:'Copy server address',copied:'Server address copied!',copyFail:'Could not copy. Select the address and copy it manually.',address:'SERVER ADDRESS / JAVA EDITION',notice:'This address is not a website URL.',version:'Minecraft version',notSet:'Not confirmed yet',menu:'Open menu',close:'Close menu',light:'Enable light mode',dark:'Enable dark mode',planned:'PLANNED',current:'IN PROGRESS',noAddress:'No server address configured'}
  };
  const t=k=>msg[lang][k] || msg.de[k] || k;
  const tr=v=> typeof v==='string'?v:(v&&typeof v==='object'?(v[lang]??v.de??v.en??''):'');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Limited formatting in trusted section titles: <br> and <em> only.
  const heading=v=>esc(tr(v)).replace(/&lt;br\s*\/?&gt;/gi,'<br>').replace(/&lt;em&gt;/gi,'<em>').replace(/&lt;\/em&gt;/gi,'</em>');
  const allowedImage=v=>{const s=String(v||'');return /^(?:images|\.\.\/\.\.\/assets)\/[a-zA-Z0-9_\-./]+\.(?:png|jpe?g|webp|avif)$/i.test(s)&&!s.includes('..')?s:''};
  const element=(id)=>document.getElementById(id);
  const root=element('sections'),nav=element('main-nav');
  const enabled=()=>cfg.sections.filter(s=>s&&s.enabled!==false&&/^[a-z0-9-]+$/.test(s.id)&&['cards','story','timeline','faq','connect','gallery','text'].includes(s.type));
  const sectionHead=s=>`<div class="section-header"><div class="section-label">${esc(tr(s.label)||s.id.toUpperCase())}</div><h2 class="section-title">${heading(s.title)}</h2>${s.intro?`<p class="section-intro">${esc(tr(s.intro))}</p>`:''}</div>`;
  const cards=s=>`<div class="feature-grid">${(s.items||[]).map((it,i)=>`<article class="feature-card reveal"><div class="feature-card-top"><span class="feature-number">// ${esc(it.number||String(i+1).padStart(2,'0'))}</span><span class="feature-number">↗</span></div><div class="feature-icon" aria-hidden="true">${esc(it.icon||'✳')}</div><h3>${esc(tr(it.title))}</h3><p>${esc(tr(it.text))}</p><span class="feature-tag">${esc(it.tag||'QUASAR')}</span></article>`).join('')}</div>`;
  const story=s=>`<div class="story-grid"><div class="reveal">${sectionHead(s)}${s.quote?`<div class="story-quote">“${esc(tr(s.quote))}”</div>`:''}<div class="story-chips">${(s.chips||[]).map(tag=>`<span class="chip">${esc(tag)}</span>`).join('')}</div></div><div class="story-terminal reveal"><div class="terminal-head"><i></i><i></i><i></i><span>QUASAR / CORE_SIMULATION</span></div><div class="terminal-ring"><img src="../../assets/logo.png" alt=""></div><div class="terminal-bottom"><span>ENGINEERING / 001</span><span>◉ SYSTEM ACTIVE</span></div></div></div>`;
  const timeline=s=>`<div class="timeline-grid">${(s.items||[]).map(it=>`<article class="timeline-card reveal"><div class="timeline-top"><span class="timeline-phase">// ${esc(it.phase)}</span><span class="timeline-state ${it.state==='current'?'current':''}">${it.state==='current'?t('current'):t('planned')}</span></div><h3>${esc(tr(it.title))}</h3><p>${esc(tr(it.text))}</p></article>`).join('')}</div>`;
  const connect=s=>`<div class="connect-panel reveal"><div>${sectionHead(s)}<div class="version-chip"><span>${t('version')}:</span><strong>${esc(cfg.minecraftVersion||t('notSet'))}</strong></div></div><div class="address-terminal"><div class="address-top"><span>✳ &nbsp; QUASAR NETWORK</span></div><div class="address-label">${t('address')}</div><code class="address-value" id="server-address">${esc(cfg.serverAddress||'—')}</code><button type="button" class="button button-primary copy-address" data-copy-server ${!cfg.serverAddress?'disabled':''}><span>⧉</span>${t('copy')}</button><p class="connect-help">${t('notice')}</p></div></div>`;
  const faq=s=>`<div class="faq-list">${(s.items||[]).map(it=>`<details class="faq-item reveal"><summary>${esc(tr(it.question))}</summary><div class="faq-answer">${esc(tr(it.answer))}</div></details>`).join('')}</div>`;
  const gallery=s=>`<div class="gallery-grid">${(s.items||[]).map(it=>{const src=allowedImage(it.image);return src?`<figure class="gallery-card reveal"><img src="${esc(src)}" loading="lazy" alt="${esc(tr(it.caption)||'Project screenshot')}"><p>${esc(tr(it.caption))}</p></figure>`:''}).join('')}</div>`;
  const textSection=s=>`<div class="text-panel reveal"><p>${esc(tr(s.intro)||tr(s.text)||'')}</p></div>`;
  function render(){
    document.documentElement.lang=lang;document.documentElement.dataset.theme=theme;
    document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='dark'?'#070c1a':'#f1f6ff');
    document.querySelectorAll('[data-ui]').forEach(el=>el.textContent=t(el.dataset.ui));
    document.querySelectorAll('[data-lang]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.lang===lang)));
    element('theme-toggle').textContent=theme==='dark'?'☼':'☾';
    element('theme-toggle').setAttribute('aria-label',t(theme==='dark'?'light':'dark'));
    element('theme-toggle').title=t(theme==='dark'?'light':'dark');
    const sections=enabled();
    nav.innerHTML=sections.map(s=>`<a href="#${esc(s.id)}">${esc(tr(s.nav)||tr(s.label)?.replace(/^\d+\s*\/\s*/, '')||s.id)}</a>`).join('');
    root.innerHTML=sections.map(s=>{
      if(s.type==='story')return `<section class="section container" id="${s.id}">${story(s)}</section>`;
      if(s.type==='connect')return `<section class="section container" id="${s.id}">${connect(s)}</section>`;
      const content={cards,timeline,faq,gallery,text:textSection}[s.type](s);
      return `<section class="section container" id="${s.id}">${sectionHead(s)}${content}</section>`;
    }).join('');
    element('highlights').innerHTML=(cfg.highlights||[]).map(item=>`<div class="signal-stat"><span class="big-value">${esc(item.value)}</span><span class="stat-label">${esc(tr(item.label))}</span></div>`).join('');
    nav.classList.remove('open');element('menu-toggle').setAttribute('aria-expanded','false');
    refreshReveal();
  }
  let observer;
  function refreshReveal(){
    observer?.disconnect();
    if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));return;}
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }
  function toast(message){const el=element('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2800)}
  async function copy(){
    const addr=String(cfg.serverAddress||'').trim();if(!addr){toast(t('noAddress'));return;}
    try{
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(addr);
      else {const area=document.createElement('textarea');area.value=addr;area.style='position:fixed;left:-9999px';document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();if(!ok)throw Error('clipboard');}
      toast(t('copied'));
    }catch(_){toast(t('copyFail'));}
  }
  document.addEventListener('click',ev=>{
    if(ev.target.closest('[data-copy-server]'))void copy();
    if(ev.target.closest('#main-nav a')){nav.classList.remove('open');element('menu-toggle').setAttribute('aria-expanded','false')}
  });
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>{lang=btn.dataset.lang;put(langKey,lang);render()}));
  element('theme-toggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';put(themeKey,theme);render()});
  element('menu-toggle').addEventListener('click',()=>{const open=nav.classList.toggle('open');element('menu-toggle').setAttribute('aria-expanded',String(open));element('menu-toggle').setAttribute('aria-label',t(open?'close':'menu'))});
  element('year').textContent=String(new Date().getFullYear());
  render();

  // Lightweight animated starfield; stops when the tab is hidden and respects reduced motion.
  const canvas=element('starfield'),ctx=canvas.getContext('2d');
  if(ctx){
    let stars=[],w=0,h=0,last=0,raf=0;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function resize(){const dpr=Math.min(window.devicePixelRatio||1,2);w=window.innerWidth;h=window.innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);let seed=1701;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};stars=Array.from({length:Math.min(145,Math.round(w*h/8800))},()=>({x:rand()*w,y:rand()*h,r:.5+rand()*1.35,a:.24+rand()*.7,v:.3+rand()*.8,phase:rand()*7}));draw(0)}
    function draw(time){ctx.clearRect(0,0,w,h);for(const s of stars){const a=s.a*(reduced?1:(.74+.26*Math.sin(time*.0012*s.v+s.phase)));ctx.beginPath();ctx.fillStyle=`rgba(140,210,255,${Math.max(.06,a)})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}}
    function tick(time){if(time-last>33){draw(time);last=time}raf=requestAnimationFrame(tick)}
    function start(){if(raf)cancelAnimationFrame(raf);raf=0;if(!reduced&&!document.hidden)raf=requestAnimationFrame(tick);else draw(0)}
    window.addEventListener('resize',()=>{resize();start()},{passive:true});document.addEventListener('visibilitychange',start);
    resize();start();
  }
})();
