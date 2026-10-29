'use strict';

(() => {
  const data = window.STUDIO_DATA;
  const app = document.getElementById('app');
  const dialog = document.getElementById('project-dialog');
  const dialogContent = document.getElementById('dialog-content');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const toast = document.getElementById('toast');

  const translations = window.STUDIO_I18N || {de:{},en:{}};
  const langKey = 'thundr-studios-lang-v6';
  const themeKey = 'thundr-studios-theme-v6';
  function getStored(key) { try {return localStorage.getItem(key)} catch (_) {return null} }
  function savePref(key,val) { try {localStorage.setItem(key,val)} catch (_) {/* storage optional */} }
  let language = getStored(langKey) === 'en' ? 'en' : 'de';
  let theme = getStored(themeKey);
  if (theme !== 'light' && theme !== 'dark') theme = 'dark';
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const t = value => (translations[language]?.[String(value)] ?? String(value));
  const pText = (p, field) => language === 'en' ? (p.en?.[field] ?? p[`${field}_en`] ?? p[field]) : p[field];
  const profileText = field => language === 'en' ? (data[`${field}_en`] ?? data[field]) : data[field];
  function translateDom(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (n.parentElement?.closest('script,style,code,pre,[translate="no"]')) continue;
      const from = originalText.has(n) ? originalText.get(n) : n.nodeValue;
      originalText.set(n,from);
      const clean = from.trim();
      if (!clean) continue;
      const output = t(clean);
      if (output !== clean || n.nodeValue !== from) n.nodeValue = from.replace(clean,output);
    }
    const elements = [root,...root.querySelectorAll('*')];
    for (const el of elements) {
      let original = originalAttributes.get(el);
      if (!original) {
        original = {};
        for (const attr of ['aria-label','placeholder','title']) if (el.hasAttribute(attr)) original[attr] = el.getAttribute(attr);
        originalAttributes.set(el,original);
      }
      for (const [attr,value] of Object.entries(original)) {
        let translation = t(value);
        // Dynamic project aria labels: translate the fixed prefix but keep the title intact.
        if (attr==='aria-label' && value.includes(': ')) {
          const colon=value.indexOf(': ');
          translation=t(value.slice(0,colon))+value.slice(colon);
        }
        el.setAttribute(attr,translation);
      }
    }
  }
  function applyPreferences() {
    document.documentElement.lang=language;
    document.documentElement.dataset.theme=theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='light'?'#f5f3ec':'#08090d');
    document.querySelector('meta[name="description"]')?.setAttribute('content',language==='en'?'ThundR_Studios — games, websites, Minecraft mods, servers and creative projects by ThundR_G4ming.':'ThundR_Studios – Games, Websites, Minecraft Mods, Minecraft Server und kreative Projekte von ThundR_G4ming.');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',language==='en'?'Games. Websites. Mods. Servers. Explore the projects of ThundR_Studios.':'Games. Websites. Mods. Server. Entdecke die Projekte hinter ThundR_Studios.');
    document.querySelectorAll('[data-set-lang]').forEach(button=>{
      const active=button.dataset.setLang===language;
      button.classList.toggle('selected',active);
      button.setAttribute('aria-pressed',String(active));
    });
    const themeButton=document.getElementById('theme-toggle');
    if (themeButton) {
      const light=theme==='light';
      themeButton.setAttribute('aria-label',light ? (language==='de'?'Dunkelmodus aktivieren':'Enable dark mode') : (language==='de'?'Hellmodus aktivieren':'Enable light mode'));
      themeButton.setAttribute('title',themeButton.getAttribute('aria-label'));
      themeButton.setAttribute('aria-pressed',String(light));
      themeButton.querySelector('.theme-icon').textContent=light?'☾':'☀';
    }
  }
  function updateLanguage(newLanguage) {
    if (newLanguage !== 'de' && newLanguage !== 'en') return;
    language = newLanguage;
    savePref(langKey,language);
    applyPreferences();
    // Preserve project dialog, including gated content, while switching languages.
    const openId=dialog.open ? dialog.dataset.projectId : null;
    render(true);
    if (openId) openProject(openId);
  }
  function updateTheme() {
    theme=theme==='light'?'dark':'light';
    savePref(themeKey,theme);
    applyPreferences();
  }

  const titles = {home:'Willkommen',projects:'Alle Projekte',games:'My Games',websites:'My Sites','minecraft-mods':'Minecraft Mods','minecraft-server':'Minecraft Server',socials:'Socials',about:'Über mich'};
  const categoryNames = {games:'GAMES',websites:'WEBSITES','minecraft-mods':'MINECRAFT MODS','minecraft-server':'MINECRAFT SERVER'};
  const categoryRoutes = ['games','websites','minecraft-mods','minecraft-server'];
  const icons = {
    arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
    upRight:'<path d="M7 17 17 7M7 7h10v10"/>',
    play:'<path d="m8 5 12 7-12 7V5Z"/>',
    game:'<path d="M6 12h4m-2-2v4m7-2h.01M18 10h.01M6 6h12a4 4 0 0 1 3.9 3.1l1 5A4 4 0 0 1 19 19h-1.5L15 16H9l-2.5 3H5a4 4 0 0 1-3.9-4.9l1-5A4 4 0 0 1 6 6Z"/>',
    code:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16"/>',
    cube:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V7m-9 5v10"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    swords:'<path d="m14.5 17.5 3-3L6 3H3v3l11.5 11.5ZM13 19l2 2 6-6-2-2M9.5 17.5l-3-3L18 3h3v3L9.5 17.5ZM11 19l-2 2-6-6 2-2"/>',
    hammer:'<path d="m15 5 4 4m-1-6 3 3-7 7-3-3 7-7ZM6 21l9-9m-12-1 5-5m-3 0 3 3"/>',
    sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Zm7 13 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16ZM4 2l.9 2.1L7 5l-2.1.9L4 8l-.9-2.1L1 5l2.1-.9L4 2Z"/>',
    map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-18.9a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>',
    cpu:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zm0-7v3m6-3v3m-6 14v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
    smartphone:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>',
    boxes:'<path d="m12 2 7 4-7 4-7-4 7-4ZM5 6v8l7 4 7-4V6m-7 4v8m-6-1-4 2 7 4 4-2m9-4 4 2-7 4-4-2"/>',
    orbit:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(35 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-35 12 12)"/>',
    twitch:'<path d="M4 3h17v12l-5 5h-4l-3 3v-3H4V3Zm3 3v11h4v2l2-2h3l3-3V5H7Zm4 1h2v6h-2V7Zm5 0h2v6h-2V7Z" stroke="none" fill="currentColor"/>',
    youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>',
    tiktok:'<path d="M14 3v12a4 4 0 1 1-4-4m4-8c0 4 3 6 7 6"/>',
    discord:'<path d="M8 7c3-1 5-1 8 0l1-2c2 .4 3.5 1.2 4 2l1 11c-2 2-4 3-6 3l-1-2M8 7 7 5C5 5.4 3.5 6.2 3 7L2 18c2 2 4 3 6 3l1-2M8 18c3 1 5 1 8 0M8.5 13h.01M15.5 13h.01"/>',
    github:'<path d="M9 19c-4 1-4-2-6-2m12 4v-3.5c0-1 .2-1.5.5-2 3.5-.4 5.5-2 5.5-5.5a5 5 0 0 0-1.5-3.5 5 5 0 0 0-.1-3.5s-1.4-.5-3.9 1.5a14 14 0 0 0-7 0C6 2.5 4.6 3 4.6 3a5 5 0 0 0-.1 3.5A5 5 0 0 0 3 10c0 3.5 2 5.1 5.5 5.5.3.5.5 1 .5 2V21"/>',
    close:'<path d="M18 6 6 18M6 6l12 12"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7V2Z"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
    unlock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h7M11 17.5h7"/>',
    copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'
  };
  const icon = (name,cls='') => `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.bolt}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = s => { try {const u = new URL(s); return ['https:','http:'].includes(u.protocol) ? u.href : '';} catch{return '';} };
  // Nur Pfade zu lokalen Projektseiten erlauben. Keine externen Redirects und kein ../
  // Relative Pfade funktionieren sowohl unter username.github.io als auch unter /REPOSITORY/.
  function projectPage(p) {
    const value = String(p.page || '').trim();
    return /^projects\/[a-zA-Z0-9_-]+\/(?:[a-zA-Z0-9_-]+\/)*(?:index\.html)?$/.test(value) ? value : '';
  }
  // Bilder stammen ausschließlich aus dem lokalen assets/-Verzeichnis.
  const safeProjectImage = p => /^assets\/[a-zA-Z0-9_\-/.]+\.(?:png|jpe?g|webp|avif)$/i.test(String(p.image || '')) && !String(p.image).includes('..') ? String(p.image) : '';
  function projectIcon(p) {
    const image = safeProjectImage(p);
    return image ? `<img src="${esc(image)}" alt="${esc(p.title)} Projektlogo" loading="lazy" decoding="async" />` : icon(p.icon);
  }
  function projectCardPage(p) {
    const page = projectPage(p);
    if (!page || !isProjectUnlocked(p)) return '';
    return `<a class="project-page-shortcut" href="${esc(page)}" data-project-page="${esc(p.id)}" aria-label="${esc(t('Projektseite öffnen'))}: ${esc(p.title)}">${icon('upRight')} <span>${esc(t('Projektseite öffnen'))}</span></a>`;
  }
  const arrow = () => icon('upRight');
  const routeHref = r => `#/` + r;
  const stat = (num,label) => `<div class="stat-item"><strong>${esc(num)}</strong><span>${esc(label)}</span></div>`;
  const eyebrow = txt => `<span class="eyebrow"><span class="eyebrow-line"></span>${txt}</span>`;
  const categoryCount = category => data.projects.filter(p => p.category === category).length;
  let selectedProjectFilter = 'all';
  let projectSearch = '';
  let lastRoute = null;
  let observer = null;
  let toastTimer = null;
  // Zugriff wird pro Projekt statt pro Tab verwaltet. Diese Prüfung ist NUR eine UI-Sperre.
  // Daten und Codes in data.js sind bei GitHub Pages weiterhin öffentlich einsehbar.
  const storageKey = 'thundr-studios-project-access-v5';
  let projectAccess = {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) projectAccess = saved;
  } catch (_) { /* Browser-Speicher optional */ }
  const isProjectLocked = p => p?.locked === true || String(p?.locked ?? 'no').trim().toLowerCase() === 'yes';
  // Nicht-kryptografischer Fingerprint, damit ein geänderter Code alte Freischaltungen zurücksetzt.
  function accessFingerprint(p) {
    const value = `${p.id}::${String(p.code ?? '')}`;
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return String(hash >>> 0);
  }
  function isProjectUnlocked(p) { return !isProjectLocked(p) || (Boolean(String(p.code || '').trim()) && projectAccess[p.id] === accessFingerprint(p)); }
  function persistProjectAccess() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(projectAccess)); } catch (_) { /* optional */ }
  }
  function lockProject(id) {
    const p = data.projects.find(p => p.id === id);
    if (!p || !isProjectLocked(p)) return;
    delete projectAccess[id];
    persistProjectAccess();
    render();
    openProject(id);
    showToast(`${p.title} ${t('wurde wieder gesperrt.')}`);
  }
  function projectGate(p) {
    return `<div class="dialog-cover theme-${esc(p.theme)} ${safeProjectImage(p) ? 'dialog-cover-image' : ''}">
      <span class="dialog-kicker">${esc(categoryNames[p.category])} / PROJECT ACCESS</span>
      <div class="dialog-icon ${safeProjectImage(p) ? 'dialog-icon-image' : ''}">${projectIcon(p)}</div>
    </div>
    <div class="dialog-body project-locked-dialog">
      <div class="project-security-label">${icon('lock')} PASSWORTGESCHÜTZTES PROJEKT</div>
      <h2 id="dialog-title">${esc(p.title)}</h2>
      <p class="dialog-subtitle">${esc(pText(p,'subtitle'))}</p>
      <p class="lock-explanation">Für dieses Projekt ist ein eigener Zugangscode erforderlich. Gib den Code ein, um die Projektinformationen und gegebenenfalls die eigene Projektseite anzuzeigen.</p>
      <form id="project-access-form" data-project-id="${esc(p.id)}" autocomplete="off">
        <label for="project-access-code">PROJEKTCODE</label>
        <div class="access-input-wrap"><input id="project-access-code" type="password" required maxlength="120" placeholder="Code eingeben …" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="project-access-error" />
        <button id="toggle-project-code" class="access-reveal-code" type="button" aria-label="Code anzeigen" aria-pressed="false">${icon('eye')}</button></div>
        <p id="project-access-error" class="access-error" role="status" aria-live="polite"></p>
        <button class="btn btn-primary access-submit" type="submit">${icon('unlock')} Projekt freischalten ${icon('arrow')}</button>
      </form>
      <p class="project-lock-hint">Geschützte Projektkarten sind öffentlich sichtbar. Bei GitHub Pages ist dies nur eine Sperre innerhalb der Benutzeroberfläche.</p>
    </div>`;
  }
  function submitProjectAccess(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.projectId;
    const p = data.projects.find(p => p.id === id);
    if (!p || !isProjectLocked(p)) return;
    const input = form.querySelector('#project-access-code');
    const message = form.querySelector('#project-access-error');
    const entered = input.value.trim().normalize('NFKC').toUpperCase();
    const expected = String(p.code ?? '').trim().normalize('NFKC').toUpperCase();
    if (!expected) { message.textContent = t('Für dieses Projekt wurde in data.js noch kein Code hinterlegt.'); return; }
    if (entered !== expected) {
      message.textContent = t('Falscher Projektcode. Bitte erneut versuchen.');
      input.value = '';
      input.focus();
      form.classList.remove('access-shake'); void form.offsetWidth; form.classList.add('access-shake');
      return;
    }
    projectAccess[p.id] = accessFingerprint(p);
    persistProjectAccess();
    render(); // aktualisiert Schloss-Badge / Kopier-Button auf der Projektkarte
    openProject(id);
    showToast(`${p.title} ${t('wurde freigeschaltet.')}`);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3400);
  }

  function socialHref(platform) { return safeUrl(data.socials[platform]); }
  function socialLink(platform,label,classes='') {
    const url = socialHref(platform);
    return url
      ? `<a class="${classes}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${icon(platform)}<span>${label}</span>${arrow()}</a>`
      : `<button class="${classes} missing-social" type="button" data-missing="${platform}">${icon(platform)}<span>${label}</span>${icon('upRight')}</button>`;
  }

  function projectCard(p,index=0) {
    const gated = !isProjectUnlocked(p);
    return `<article class="project-card reveal theme-${esc(p.theme)} ${gated?'project-is-locked':''}" style="--index:${index}" tabindex="0" role="button" aria-label="${gated?'Projekt freischalten':'Details ansehen'}: ${esc(p.title)}" data-project="${esc(p.id)}">
      <div class="project-cover">
        <div class="cover-grid"></div><span class="cover-halo"></span><span class="cover-orbit"></span>
        <span class="cover-mini-label">${esc(categoryNames[p.category])} / ${String(index+1).padStart(2,'0')}</span>
        <div class="cover-icon ${safeProjectImage(p)?'cover-icon-image':''}">${projectIcon(p)}</div>
        <span class="cover-word">${esc(p.title.split(' ')[0]).toUpperCase()}</span>
        <span class="cover-corner">${icon(gated?'lock':'upRight')}</span>
      </div>
      <div class="project-info">
        <div class="project-line"><span class="project-type">${esc(pText(p,'type'))}</span><span class="project-status"><span class="status-dot"></span>${esc(pText(p,'status'))}</span></div>
        <h3>${esc(p.title)}</h3><p class="project-subtitle">${esc(pText(p,'subtitle'))}</p>
        ${gated?`<span class="project-lock-badge">${icon('lock')} CODE ERFORDERLICH</span>`:(isProjectLocked(p)?`<span class="project-unlocked-badge">${icon('unlock')} FREIGESCHALTET</span>`:'')}

        ${projectCardPage(p)}
        <div class="project-bottom"><div class="tag-list">${p.tags.slice(0,3).map(t => `<span>${esc(t)}</span>`).join('')}</div><span class="card-circle">${icon(gated?'lock':'arrow')}</span></div>
      </div>
    </article>`;
  }

  function sectionHead(kicker,title,description,action='') {
    return `<div class="section-head reveal"><div>${eyebrow(kicker)}<h2>${title}</h2><p>${description}</p></div>${action}</div>`;
  }

  function categoryTeaser(route,num,label,sub,iconName,theme) {
    return `<a href="#/${route}" class="category-tile category-${theme} reveal"><span class="cat-top">${icon(iconName)}<span class="cat-number">0${num} ${icon('arrow')}</span></span><span class="cat-label">${label} <span class="cat-arrow">↗</span></span><span class="cat-sub">${sub}</span><span class="cat-giant" aria-hidden="true">0${num}</span></a>`;
  }

  function homePage() {
    const featured = data.projects.filter(p=>p.featured).filter((p,i,items)=>items.findIndex(x=>x.category===p.category)===i).slice(0,3);
    return `<section class="home-hero container">
      <div class="hero-copy reveal">
        <div class="hero-hello"><span class="hero-live-dot"></span><span>WELCOME TO MY CREATIVE WORKSPACE</span><span class="hello-rule"></span><span>DESIGN • CODE • PLAY</span></div>
        <div class="hero-kicker">${t('HEY, ICH BIN')} ${esc(data.ownerName).toUpperCase()} <span class="kicker-line">//</span> THUNDR_G4MING</div>
        <h1>CREATE <span class="hero-line2">BEYOND<span class="hero-period">.</span></span><span class="hero-outline">LIMITS<span class="hero-period">.</span></span></h1>
        <p class="hero-description">${t('Willkommen bei')} <strong>ThundR_Studios</strong>${t(' – meinem kreativen Space für Games, Websites, Minecraft Mods, Minecraft Server und alles, was mit Code möglich ist.')}</p>
        <div class="hero-buttons"><a href="#/projects" class="btn btn-primary">Projekte entdecken ${icon('arrow')}</a><a href="#/about" class="btn btn-ghost">Mehr über mich ${icon('upRight')}</a></div>
        <div class="hero-minor"><span class="minor-line"></span><span>SCROLL TO EXPLORE</span><span class="scroll-mark">↓</span></div>
      </div>
      <div class="hero-visual reveal" aria-label="Animierte digitale Arbeitsumgebung von ThundR Studios">
        <div class="workspace-window">
          <div class="workspace-titlebar"><div class="window-lights" aria-hidden="true"><i></i><i></i><i></i></div><span>${icon('code')} thundr_studios / workspace</span><span class="window-version">v5.0 <b>●</b> LIVE</span></div>
          <div class="workspace-layout">
            <aside class="workspace-rail" aria-hidden="true">${icon('code')}${icon('boxes')}${icon('game')}${icon('cube')}<span class="workspace-rail-bottom">${icon('cpu')}</span></aside>
            <div class="workspace-stage">
              <div class="stage-dots" aria-hidden="true"></div><div class="stage-ring stage-ring-one" aria-hidden="true"></div><div class="stage-ring stage-ring-two" aria-hidden="true"></div>
              <div class="stage-topline"><span>● SYSTEM / ONLINE</span><span>001 — STUDIO</span></div>
              <div class="stage-logo"><img class="hero-logo" src="assets/logo.png" alt="Modernisiertes transparentes Blitzlogo von ThundR_Studios" /></div>
              <div class="stage-bottomline"><span>ENGINEERING DIGITAL WORLDS</span><span>ϟ</span></div>
            </div>
          </div>
          <div class="workspace-terminal"><span class="terminal-prompt">❯</span><span><b>thundr@studio</b> ~ %</span><code>npm run create<span class="terminal-caret">▍</span></code><span class="terminal-success">● READY</span></div>
        </div>
        <div class="workspace-float workspace-float-left"><span class="float-label">EXPLORER</span><span class="float-file">▾ thundr_studios/</span><span>├─ <b>games/</b></span><span>├─ <b>sites/</b></span><span>├─ <b>minecraft_mods/</b></span><span>└─ <b>servers/</b></span></div>
        <div class="workspace-float workspace-float-right"><span class="float-label">BUILD STATUS</span><strong><span>●</span> ALL SYSTEMS GO</strong><small>CREATIVE MODE ENABLED</small></div>
      </div>
      <div class="hero-scroll-label">CRAFTED WITH PASSION <span>—</span> BUILT WITH CODE</div>
    </section>
    <div class="container workspace-command-strip reveal" aria-label="Workspace Schnellzugriff">
      <div class="command-strip-head"><span>THUNDR_OS <b>///</b> QUICK ACCESS</span><span class="command-strip-live"><i></i> WORKSPACE ACTIVE</span></div>
      <div class="command-strip-links"><a href="#/games"><span>01</span>${icon('game')}<strong>game_dev</strong>${icon('upRight')}</a><a href="#/websites"><span>02</span>${icon('code')}<strong>web_projects</strong>${icon('upRight')}</a><a href="#/minecraft-mods"><span>03</span>${icon('cube')}<strong>minecraft_mods</strong>${icon('upRight')}</a><a href="#/minecraft-server"><span>04</span>${icon('server')}<strong>minecraft_servers</strong>${icon('upRight')}</a></div>
    </div>
    <div class="ticker" aria-hidden="true"><div class="ticker-track">${Array.from({length:4},()=>'<span>GAME DEV</span><i>✳</i><span>CREATIVE CODE</span><i>✳</i><span>WEB PROJECTS</span><i>✳</i><span>MINECRAFT MODDING</span><i>✳</i>').join('')}</div></div>
    <section class="overview-section container section-space" id="overview">
      ${sectionHead('01 // THE UNIVERSE','Vier Welten. <em>Unendlich Ideen.</em>','Hier entstehen Projekte, die Gaming, Design und Development miteinander verbinden.')}
      <div class="category-grid">
        ${categoryTeaser('games',1,'MY GAMES',`${categoryCount('games')} ${t('Projekte')} · ${t('Gameplay & Welten')}`,'game','purple')}
        ${categoryTeaser('websites',2,'MY SITES',`${categoryCount('websites')} ${t('Projekte')} · ${t('Design & Code')}`,'code','blue')}
        ${categoryTeaser('minecraft-mods',3,'MINECRAFT MODS',`${categoryCount('minecraft-mods')} ${t('Projekte')} · Mods & Add-ons`,'cube','amber')}
        ${categoryTeaser('minecraft-server',4,'MINECRAFT SERVER',`${categoryCount('minecraft-server')} ${t('Projekte')} · Multiplayer`,'server','blue')}
      </div>
    </section>
    <section class="featured-section container section-space">
      ${sectionHead('02 // SELECTED WORK','Featured <em>Projects.</em>','Eine Auswahl aus meinem kreativen Universum.',`<a class="text-link" href="#/projects">Alle Projekte ansehen ${icon('arrow')}</a>`)}
      <div class="project-grid">${featured.map((p,i)=>projectCard(p,i)).join('')}</div>
    </section>
    <section class="about-banner-wrap container section-space"><div class="about-banner reveal"><div class="banner-noise"></div><div class="banner-copy">${eyebrow('03 // A LITTLE ABOUT ME')}<h2>CODE. CREATE.<br/><span>REPEAT.</span></h2><p>${t('Ich bin')} ${esc(data.ownerName)}. ${t('Ich entwickle, gestalte und experimentiere – am liebsten an Ideen, die es so noch nicht gibt.')}</p><a href="#/about" class="btn btn-light">Meet the creator ${icon('arrow')}</a></div><span class="banner-watermark">ϟ</span><span class="banner-footnote">THUNDR STUDIOS / THE CREATOR</span></div></section>
    ${communityBand()}`;
  }

  function communityBand() {
    const discord = socialHref('discord');
    const cta = discord ? `<a href="${esc(discord)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">${icon('discord')} Discord beitreten ${icon('upRight')}</a>` : `<button class="btn btn-primary missing-social" data-missing="discord">${icon('discord')} Discord beitreten ${icon('upRight')}</button>`;
    return `<section class="community-section container section-space"><div class="community-box reveal"><div class="community-bolt" aria-hidden="true">ϟ</div><div class="community-content">${eyebrow('04 // JOIN THE COMMUNITY')}<h2>CONNECT WITH<br/><span>THE STORM.</span></h2><p>Neue Projekte, Updates und Content – bleib dabei und werde Teil der Community.</p><div class="community-actions">${cta}<a href="#/socials" class="btn btn-ghost">Alle Socials ${icon('arrow')}</a></div></div><div class="community-decoration">THUNDR / CONNECT / CREATE / REPEAT</div></div></section>`;
  }

  function headingPage(badge,top,bottom,descr) {
    return `<section class="page-hero container reveal">${eyebrow(badge)}<div class="page-hero-grid"><div><h1>${top}<br/><span>${bottom}</span></h1><p>${descr}</p></div><span class="page-hero-index" aria-hidden="true">ϟ</span></div></section>`;
  }

  function projectsPage(route, preserveFilters=false) {
    const category = categoryRoutes.includes(route) ? route : 'all';
    const heading = {
      projects:['01 // PROJECT ARCHIVE','THE PROJECT','ARCHIVE.','Entdecke Games, Websites, Minecraft Mods und Server. Einzelne Projekte können mit einem individuellen Code geschützt sein.'],
      games:['01 // GAME DEVELOPMENT','PLAY MY','WORLDS.','Spielmechaniken, Erkundung und neue Welten – hier sammle ich meine Game-Development-Projekte.'],
      websites:['02 // WEB DEVELOPMENT','DIGITAL','EXPERIENCES.','Websites und Web-Apps, in denen Design und technische Ideen zusammenkommen.'],
      'minecraft-mods':['03 // MINECRAFT MODDING','MOD THE','WORLD.','Eigene Minecraft Mods, Create-Addons und Modpacks – neue Möglichkeiten für Minecraft.'],
      'minecraft-server':['04 // MINECRAFT SERVER','PLAY','TOGETHER.','Server-Ideen, Multiplayer-Projekte, Community-Welten und spätere Serverinformationen.']
    }[route];
    if (!preserveFilters) { selectedProjectFilter = category; projectSearch = ''; }
    return `${headingPage(...heading)}
      <section class="container archive-section section-space-sm">
        <div class="archive-tools reveal"><div class="filter-tabs" role="group" aria-label="Projekte filtern">
          ${[['all','Alle Projekte'],['games','My Games'],['websites','My Sites'],['minecraft-mods','Minecraft Mods'],['minecraft-server','Minecraft Server']].map(([key,label])=>`<button type="button" class="filter-btn ${category===key?'selected':''}" data-filter="${key}" aria-pressed="${category===key}">${label}</button>`).join('')}
          </div><label class="search-box">${icon('search')}<span class="sr-only">Projekte durchsuchen</span><input id="project-search" type="search" placeholder="Projekt suchen ..." autocomplete="off" /></label></div>
        <div class="archive-count" id="archive-count" aria-live="polite"></div><div class="project-grid archive-grid" id="archive-grid"></div>
      </section>${communityBand()}`;
  }

  function updateArchive() {
    const grid = document.getElementById('archive-grid');
    if (!grid) return;
    const query = projectSearch.trim().toLocaleLowerCase(language);
    const matching = data.projects.filter(p => (selectedProjectFilter==='all' || p.category===selectedProjectFilter) && (!query || [p.title,p.subtitle,p.description,p.type,pText(p,'subtitle'),pText(p,'description'),pText(p,'type'),...p.tags].join(' ').toLocaleLowerCase(language).includes(query)));
    grid.innerHTML = matching.map((p,i) => projectCard(p,i)).join('') || `<div class="empty-state">${icon('search')}<h3>Keine Projekte gefunden</h3><p>Versuche einen anderen Suchbegriff oder wähle einen anderen Filter.</p><button type="button" class="btn btn-ghost" id="reset-filters">Filter zurücksetzen ${icon('arrow')}</button></div>`;
    const gatedCount = matching.filter(p => !isProjectUnlocked(p)).length;
    document.getElementById('archive-count').innerHTML = `<span>${String(matching.length).padStart(2,'0')} / ${String(data.projects.length).padStart(2,'0')}</span> ${t('PROJEKTE ANGEZEIGT')}${gatedCount ? ` · ${gatedCount} ${t('MIT CODESPERRE')}` : ''}`;
    document.querySelectorAll('[data-filter]').forEach(btn => {const active=btn.dataset.filter===selectedProjectFilter; btn.classList.toggle('selected',active);btn.setAttribute('aria-pressed', String(active));});
    translateDom(grid);
    translateDom(document.getElementById('archive-count'));
    observeReveals();
  }

  function socialsPage() {
    const cards = [
      ['twitch','Twitch','LIVE & LET’S PLAY','Gaming, Streams und gemeinsame Sessions.','PURPLE'],
      ['youtube','YouTube','VIDEOS & PROJECTS','Gaming-Content, Updates und Einblicke.','RED'],
      ['tiktok','TikTok','SHORT-FORM CONTENT','Clips, kurze Updates und kreative Momente.','TEAL'],
      ['discord','Discord','JOIN THE COMMUNITY','Der Platz für Austausch und Community.','BLURPLE'],
    ];
    return `${headingPage('04 // FIND ME ONLINE','LET’S GET','CONNECTED.','Du willst mehr sehen? Hier findest du meine Social-Media-Kanäle und die Community.')}
      <section class="container socials-section section-space-sm"><div class="social-grid">${cards.map(([key,title,subtitle,description,color],i)=>{
        const href = socialHref(key);
        const tag = href ? 'a' : 'button';
        const linkProps = href ? `href="${esc(href)}" target="_blank" rel="noopener noreferrer"` : `type="button" data-missing="${key}"`;
        return `<${tag} class="social-card social-${key} reveal ${!href?'missing-social':''}" ${linkProps}><span class="social-label">0${i+1} / ${color}</span><span class="social-big-icon">${icon(key)}</span><strong>${title}</strong><span class="social-subtitle">${subtitle}</span><p>${description}</p><span class="social-open">${href?'PROFIL ÖFFNEN':'LINK FOLGT'} ${icon('upRight')}</span></${tag}>`;
      }).join('')}</div><div class="social-note reveal"><span class="pulse-dot"></span> Socials unter dem Namen <strong>${esc(data.creatorName)}</strong> · Alle externen Profile öffnen in einem neuen Tab.</div></section>`;
  }

  function aboutPage() {
    return `${headingPage('05 // THE PERSON BEHIND THE CODE','MEET THE','CREATOR.','Ein kleiner Einblick in die Person und die Ideen hinter ThundR_Studios.')}
      <section class="container about-section section-space-sm"><div class="about-layout">
        <div class="about-profile reveal"><div class="profile-rings"></div><img src="assets/logo.png" alt="ThundR_Studios Logo"/><div class="profile-footer"><span>THUNDR_G4MING</span><span>DEVELOPER / CREATOR</span></div></div>
        <div class="about-body reveal">${eyebrow('HEY THERE / 001')}<h2>HI, I’M <span>${esc(data.ownerName).toUpperCase()}.</span></h2><p class="about-lead">${esc(profileText('bio'))}</p><p>${esc(profileText('aboutText'))}</p><div class="about-facts"><div>${icon('code')}<span>CODE IS MY CREATIVE SPACE.</span></div><div>${icon('game')}<span>GAMES, WEBSITES & MODS.</span></div><div>${icon('bolt')}<span>ALWAYS BUILDING SOMETHING NEW.</span></div></div><a href="#/projects" class="btn btn-primary">Meine Arbeiten ansehen ${icon('arrow')}</a></div>
      </div><div class="skills-panel reveal">${eyebrow('TOOLS & INTERESTS')}<h3>WHAT I WORK WITH<span>.</span></h3><div class="skills-list">${data.skills.map(skill=>`<span>${icon('check')} ${esc(skill)}</span>`).join('')}</div></div>
      </section>${communityBand()}`;
  }

  function openProject(id) {
    const p = data.projects.find(x=>x.id===id);
    if (!p) return;
    if (!isProjectUnlocked(p)) {
      dialogContent.innerHTML = projectGate(p);
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('dialog-open');
      dialog.dataset.projectId=id;
      translateDom(dialogContent);
      dialogContent.querySelector('#project-access-code')?.focus();
      return;
    }
    const page = projectPage(p);
    const action = page
      ? `<div class="project-page-panel"><div class="project-page-label">${icon('code')} ${esc(t('EIGENE PROJEKTSEITE'))}</div><p>${esc(t('Dieses Projekt besitzt eine eigenständige Website innerhalb von ThundR_Studios.'))}</p><a class="btn btn-primary" href="${esc(page)}">${esc(t('Projektseite öffnen'))} ${icon('upRight')}</a></div>`
      : `<p class="dialog-coming">${esc(t('Für dieses Projekt wurde noch keine eigene Unterseite angelegt.'))}</p>`;
    dialogContent.innerHTML = `<div class="dialog-cover theme-${esc(p.theme)} ${safeProjectImage(p)?'dialog-cover-image':''}"><span class="dialog-kicker">${esc(categoryNames[p.category])} / THUNDR_STUDIOS</span><div class="dialog-icon ${safeProjectImage(p)?'dialog-icon-image':''}">${projectIcon(p)}</div></div><div class="dialog-body"><div class="project-line"><span class="project-type">${esc(pText(p,'type'))}</span><span class="project-status"><span class="status-dot"></span>${esc(pText(p,'status'))}</span></div><h2 id="dialog-title">${esc(p.title)}</h2><p class="dialog-subtitle">${esc(pText(p,'subtitle'))}</p><p class="dialog-description">${esc(pText(p,'description'))}</p><div class="tag-list">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>${action}${isProjectLocked(p) ? `<button class="project-relock" type="button" data-project-relock="${esc(p.id)}">${icon('lock')} Projekt wieder sperren</button>` : ''}</div>`;
    dialog.dataset.projectId=id;
    translateDom(dialogContent);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
  }

  function closeDialog() {if (dialog.open) dialog.close();}
  function observeReveals() {
    if (observer) observer.disconnect();
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {nodes.forEach(n=>n.classList.add('visible'));return;}
    observer = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{rootMargin:'0px 0px -55px 0px',threshold:.06});
    nodes.forEach(el=>observer.observe(el));
  }

  function currentRoute() {
    const raw = location.hash.replace(/^#\/?/,'').split(/[?&]/)[0].replace(/\/$/,'');
    return titles[raw] ? raw : 'home';
  }
  function closeMobileMenu() { mobileNav.hidden=true; mobileToggle.setAttribute('aria-expanded','false');mobileToggle.setAttribute('aria-label',t('Menü öffnen')); }
  function render(preserveFilters=false) {
    const route = currentRoute();
    document.title=`${t(titles[route])} | ${data.studioName}`;
    applyPreferences();
    if (route==='home') app.innerHTML=homePage();
    else if (route==='about') app.innerHTML=aboutPage();
    else if (route==='socials') app.innerHTML=socialsPage();
    else app.innerHTML=projectsPage(route,preserveFilters);
    document.querySelectorAll('[data-route]').forEach(a=>{const active=a.dataset.route===route;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    closeMobileMenu();
    if (route==='projects'||categoryRoutes.includes(route)) {
      const search=document.getElementById('project-search');
      if(search) search.value=projectSearch;
      updateArchive();
    }
    translateDom(document.body);
    observeReveals();
    if (lastRoute !== route) window.scrollTo({top:0,behavior:'instant'});
    lastRoute=route;
  }

  mobileToggle.addEventListener('click',()=>{const opening=mobileNav.hidden;mobileNav.hidden=!opening;mobileToggle.setAttribute('aria-expanded',String(opening));mobileToggle.setAttribute('aria-label',t(opening?'Menü schließen':'Menü öffnen'));});
  document.getElementById('dialog-close').addEventListener('click',closeDialog);
  dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();});
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  document.addEventListener('submit',e=>{if (e.target.id==='project-access-form') submitProjectAccess(e);});
  document.addEventListener('click',e=>{
    const toggle=e.target.closest('#toggle-project-code');
    if(toggle) {const input=document.getElementById('project-access-code'); if(input) {const show=input.type==='password';input.type=show?'text':'password';toggle.setAttribute('aria-label',t(show?'Code verbergen':'Code anzeigen'));toggle.setAttribute('aria-pressed',String(show));}return;}
    const relock=e.target.closest('[data-project-relock]');
    if(relock) {lockProject(relock.dataset.projectRelock);return;}
    const missing=e.target.closest('[data-missing]');
    if(missing) {const platform=missing.dataset.missing;showToast(`${platform==='discord'?t('Discord-Einladung'):platform+t('-Link')} ${t('noch nicht eingerichtet. In data.js ergänzen.')}`);}
    if (e.target.closest('[data-project-page]')) { e.stopPropagation(); return; }
    const project=e.target.closest('[data-project]');
    if(project){openProject(project.dataset.project);}
    const filter=e.target.closest('[data-filter]');
    if(filter){selectedProjectFilter=filter.dataset.filter;updateArchive();}
    if(e.target.closest('#reset-filters')){selectedProjectFilter='all';projectSearch='';const search=document.getElementById('project-search');if(search)search.value='';updateArchive();}
    if(e.target.closest('.mobile-nav a'))closeMobileMenu();
  });
  document.addEventListener('keydown',e=>{
    if ((e.key==='Enter' || e.key===' ') && e.target.matches('[data-project]')){e.preventDefault();openProject(e.target.dataset.project);}
    if(e.key==='Escape')closeMobileMenu();
  });
  document.addEventListener('input',e=>{if(e.target.id==='project-search'){projectSearch=e.target.value;updateArchive();}});
  window.addEventListener('hashchange',render);
  document.querySelectorAll('[data-set-lang]').forEach(btn=>btn.addEventListener('click',()=>updateLanguage(btn.dataset.setLang)));
  document.getElementById('theme-toggle')?.addEventListener('click',updateTheme);
  document.getElementById('footer-year').textContent=String(new Date().getFullYear());
  if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glow=document.querySelector('.cursor-glow');
    window.addEventListener('pointermove',e=>{glow.style.setProperty('--mx',`${e.clientX}px`);glow.style.setProperty('--my',`${e.clientY}px`);},{passive:true});
    document.addEventListener('pointermove',e=>{const card=e.target.closest('.project-card,.category-tile,.social-card');if(card){const r=card.getBoundingClientRect();card.style.setProperty('--px',`${e.clientX-r.left}px`);card.style.setProperty('--py',`${e.clientY-r.top}px`);}}, {passive:true});
  }
  render();
})();
