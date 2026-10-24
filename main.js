/* ═══════════════════════════════════════════════════════════
   ABDULRAHMAN ALFEQY — PORTFOLIO JAVASCRIPT
   Quest for the Code | main.js
   Requires: portfolio-config.js loaded BEFORE this file
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════
   LIVE DATA CACHE  (fetched once per session)
══════════════════════════════════════════ */
const LIVE = {
  github:  null,   // { repos, followers, following, bio, repoList[] }
  loading: { github: false }
};

function resolveGitHubRepoDescription(repo) {
  const apiDescription = String(repo.description || '').trim();
  if (apiDescription) return apiDescription;

  const repoKey = getGitHubRepoKey(repo.url);
  const configuredProject = PORTFOLIO_CONFIG.projects.find(project =>
    getGitHubRepoKey(project.link) === repoKey
  );
  if (configuredProject?.desc?.trim()) return configuredProject.desc.trim();

  return `See the ${repo.name} README for the project overview and implementation details.`;
}

/* ══════════════════════════════════════════
   GITHUB API  — api.github.com (no auth needed)
   Pulls: followers, repo count, public repo list
══════════════════════════════════════════ */
async function fetchGitHub() {
  if (LIVE.github || LIVE.loading.github) return;
  LIVE.loading.github = true;

  const username = PORTFOLIO_CONFIG.contact.github.split('/').filter(Boolean).pop();

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    ]);

    const userData  = await userRes.json();
    const reposData = await reposRes.json();

    LIVE.github = {
      followers: userData.followers  ?? '—',
      following: userData.following  ?? '—',
      repos:     userData.public_repos ?? '—',
      bio:       userData.bio ?? '',
      repoList:  Array.isArray(reposData)
        ? reposData.map(r => ({
            name:        r.name,
            description: resolveGitHubRepoDescription({
              name: r.name,
              url: r.html_url,
              description: r.description
            }),
            stars:       r.stargazers_count,
            forks:       r.forks_count,
            language:    r.language || null,
            url:         r.html_url,
            updated:     new Date(r.updated_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
          })).sort((a, b) => b.stars - a.stars)
        : []
    };
    console.log('✅ GitHub loaded:', LIVE.github.repos, 'repos,', LIVE.github.followers, 'followers');
  } catch (err) {
    console.warn('⚠️ GitHub API failed:', err);
    LIVE.github = { followers: '—', following: '—', repos: '—', bio: '', repoList: [] };
  }

  LIVE.loading.github = false;
}

/* ══════════════════════════════════════════
   PREFETCH — kicks off immediately on load
   Data is ready by the time user clicks a zone
══════════════════════════════════════════ */
fetchGitHub();

/* ══════════════════════════════════════════
   RETRY HELPER
   Polls every 250ms until live data arrives,
   then runs the provided callback to update DOM
══════════════════════════════════════════ */
function retryWhenReady(key, callback, maxAttempts = 30) {
  let attempts = 0;
  const poll = setInterval(() => {
    attempts++;
    if (LIVE[key]) { clearInterval(poll); callback(LIVE[key]); return; }
    if (attempts >= maxAttempts) { clearInterval(poll); }
  }, 250);
}

/* ══════════════════════════════════════════
   LOADING SPINNER
══════════════════════════════════════════ */
function spinner(msg) {
  return `<div style="text-align:center; padding:36px; font-family:'Press Start 2P',monospace;
    font-size:9px; color:var(--dim); animation:blink 1s step-end infinite;">${msg || 'LOADING...'}</div>`;
}

/* ══════════════════════════════════════════
   STARFIELD
══════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   AUDIO ENGINE — Web Audio API (zero external files)
   Generates all sounds programmatically — no downloads needed
══════════════════════════════════════════════════════════════ */

const AUDIO = {
  ctx:        null,
  musicOn:    true,
  sfxOn:      true,
  musicNode:  null,   // currently playing background music source
  musicGain:  null,
  sfxGain:    null,
  started:    false,
};

function getAudioCtx() {
  if (!AUDIO.ctx) {
    AUDIO.ctx      = new (window.AudioContext || window.webkitAudioContext)();
    AUDIO.musicGain = AUDIO.ctx.createGain();
    AUDIO.sfxGain   = AUDIO.ctx.createGain();
    AUDIO.musicGain.gain.value = 0.18;
    AUDIO.sfxGain.gain.value   = 0.5;
    AUDIO.musicGain.connect(AUDIO.ctx.destination);
    AUDIO.sfxGain.connect(AUDIO.ctx.destination);
  }
  return AUDIO.ctx;
}

/* ── BACKGROUND MUSIC ─────────────────────────────────────────
   Ambient RPG dungeon atmosphere — deep pads + slow arpeggio
   Fades in/out smoothly on toggle
──────────────────────────────────────────────────────────────*/
function startBGM() {
  if (!AUDIO.musicOn) return;
  const ctx = getAudioCtx();
  if (AUDIO.musicNode) return;

  // Ambient pad chord — Cm: C3 Eb3 G3 Bb3
  const padNotes = [130.8, 155.6, 196.0, 233.1];

  // Slow arpeggio melody over the pad — pentatonic minor feel
  const arp = [
    196.0, 233.1, 261.6, 311.1,
    261.6, 233.1, 196.0, 174.6,
    174.6, 196.0, 233.1, 261.6,
    233.1, 196.0, 174.6, 130.8,
  ];
  const arpBeat = 60 / 72; // 72 BPM, slower & more atmospheric
  let t = ctx.currentTime + 0.2;

  // sustained pad oscillators — always running, fade in via gain
  padNotes.forEach(freq => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo  = ctx.createOscillator();
    const lfoG = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    // slight detune for warmth
    osc.detune.value = (Math.random() - 0.5) * 8;
    // LFO tremolo — very slow wobble
    lfo.type = 'sine';
    lfo.frequency.value = 0.25;
    lfoG.gain.value = 0.04;
    lfo.connect(lfoG);
    lfoG.connect(gain.gain);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 2.5); // fade in
    osc.connect(gain);
    gain.connect(AUDIO.musicGain);
    lfo.start();
    osc.start();
    // store refs so we can stop them
    AUDIO.padOscs = AUDIO.padOscs || [];
    AUDIO.padOscs.push({ osc, gain, lfo });
  });

  // arpeggio loop
  function scheduleArp() {
    arp.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * arpBeat);
      gain.gain.setValueAtTime(0, t + i * arpBeat);
      gain.gain.linearRampToValueAtTime(0.18, t + i * arpBeat + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * arpBeat + arpBeat * 0.9);
      osc.connect(gain);
      gain.connect(AUDIO.musicGain);
      osc.start(t + i * arpBeat);
      osc.stop(t + i * arpBeat + arpBeat);
    });
    const total = arp.length * arpBeat;
    AUDIO.musicNode = setTimeout(() => {
      t = ctx.currentTime + 0.05;
      if (AUDIO.musicOn) scheduleArp();
      else AUDIO.musicNode = null;
    }, (total - 0.3) * 1000);
  }
  scheduleArp();
}

function stopBGM() {
  // immediately ramp down pads smoothly
  if (AUDIO.padOscs && AUDIO.padOscs.length) {
    const ctx = getAudioCtx();
    AUDIO.padOscs.forEach(({ osc, gain, lfo }) => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => { try { osc.stop(); lfo.stop(); } catch(e){} }, 500);
    });
    AUDIO.padOscs = [];
  }
  if (AUDIO.musicNode) {
    clearTimeout(AUDIO.musicNode);
    AUDIO.musicNode = null;
  }
}

/* ── SOUND EFFECTS ────────────────────────────────────────────*/

function playClick() {
  if (!AUDIO.sfxOn) return;
  const ctx = getAudioCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.6, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(AUDIO.sfxGain);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

function playZoneEnter() {
  if (!AUDIO.sfxOn) return;
  const ctx   = getAudioCtx();
  const notes = [523.3, 659.3, 783.9];
  notes.forEach((freq, i) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + i * 0.08 + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.08 + 0.15);
    osc.connect(gain);
    gain.connect(AUDIO.sfxGain);
    osc.start(ctx.currentTime + i * 0.08);
    osc.stop(ctx.currentTime + i * 0.08 + 0.2);
  });
}

function playXPGain() {
  if (!AUDIO.sfxOn) return;
  const ctx  = getAudioCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(AUDIO.sfxGain);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

function playPressStart() {
  if (!AUDIO.sfxOn) return;
  const ctx   = getAudioCtx();
  const notes = [261.6, 329.6, 392.0, 523.3, 392.0, 523.3, 659.3, 784.0];
  notes.forEach((freq, i) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i % 2 === 0 ? 'square' : 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.07);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + i * 0.07 + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.07 + 0.12);
    osc.connect(gain);
    gain.connect(AUDIO.sfxGain);
    osc.start(ctx.currentTime + i * 0.07);
    osc.stop(ctx.currentTime + i * 0.07 + 0.15);
  });
}

function playBackToMap() {
  if (!AUDIO.sfxOn) return;
  const ctx  = getAudioCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(523.3, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(261.6, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(AUDIO.sfxGain);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

/* ── TOGGLE CONTROLS ──────────────────────────────────────────*/
function toggleMusic() {
  AUDIO.musicOn = !AUDIO.musicOn;
  const btn = document.getElementById('btn-music');
  if (AUDIO.musicOn) {
    btn.classList.add('active');
    btn.querySelector('.audio-icon').textContent = '♪';
    btn.querySelector('.audio-label').textContent = 'ANTHEM';
    startBGM();
  } else {
    btn.classList.remove('active');
    btn.querySelector('.audio-icon').textContent = '—';
    btn.querySelector('.audio-label').textContent = 'ANTHEM';
    stopBGM(); // fades out smoothly via gain ramp
  }
  playClick();
}

function toggleSFX() {
  AUDIO.sfxOn = !AUDIO.sfxOn;
  const btn = document.getElementById('btn-sfx');
  if (AUDIO.sfxOn) {
    btn.classList.add('active');
    btn.querySelector('.audio-icon').textContent = '▶';
    btn.querySelector('.audio-label').textContent = 'SPELL';
    playClick(); // confirm it's back on
  } else {
    btn.classList.remove('active');
    btn.querySelector('.audio-icon').textContent = '—';
    btn.querySelector('.audio-label').textContent = 'SPELL';
  }
}

/* ── INIT: start audio on first user interaction ─────────────*/
function initAudio() {
  if (AUDIO.started) return;
  AUDIO.started = true;
  getAudioCtx();
  if (AUDIO.ctx.state === 'suspended') AUDIO.ctx.resume();
  startBGM();
}

document.addEventListener('click', initAudio, { once: true });
document.addEventListener('keydown', initAudio, { once: true });

const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let stars    = [];

function initStars() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5, opacity: Math.random() });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.opacity += (Math.random() - 0.5) * 0.05;
    s.opacity  = Math.max(0.1, Math.min(1, s.opacity));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initStars);
initStars();
drawStars();

/* ══════════════════════════════════════════
   BOOT — Populate from config on page load
══════════════════════════════════════════ */
function bootFromConfig() {
  const p  = PORTFOLIO_CONFIG.profile;
  const yr = new Date().getFullYear();

  document.getElementById('t-name').textContent    = `⚔ ${p.name} ⚔`;
  document.getElementById('t-avatar').innerHTML    = `<img src="${p.avatar}" style="width: 80px; height: 80px; image-rendering: pixelated; border-radius: 8px;">`;
  document.getElementById('t-role').textContent    = p.title;
  document.getElementById('t-level').textContent   = formatLevel(p.level);
  document.getElementById('t-tagline').textContent = p.tagline;
  document.getElementById('t-context').textContent = p.heroContext;
  document.getElementById('t-resume').href         = p.resumeUrl;
  document.getElementById('t-contact').href        = `mailto:${PORTFOLIO_CONFIG.contact.email}`;
  document.getElementById('t-copy').textContent    = `© ${yr} ${p.name} — ALL RIGHTS RESERVED`;
  document.getElementById('hud-name').textContent  = `${p.avatarEmoji || '🛡️'} ${p.name.split(' ')[0].toUpperCase()}`;
  document.getElementById('hud-level').textContent = formatLevel(p.level);
  document.title = `${p.name} | ${p.title} | Quest for the Code`;

  const freelanceDesc = document.getElementById('freelance-zone-desc');
  if (freelanceDesc) freelanceDesc.textContent = `${PORTFOLIO_CONFIG.freelanceProfiles.length} profiles available`;
}

function formatLevel(level) {
  return `LVL ${Number(level)} AI ENGINEER`;
}

/* ══════════════════════════════════════════
   GAME STATE
══════════════════════════════════════════ */
let xpLevel = 74;

function gainXP(el) {
  playXPGain();
  xpLevel += 4;

  let leveledUp = false;
  while (xpLevel >= 100) {
    xpLevel -= 100;
    PORTFOLIO_CONFIG.profile.level = Number(PORTFOLIO_CONFIG.profile.level) + 1;
    leveledUp = true;
  }

  if (leveledUp) {
    const levelLabel = formatLevel(PORTFOLIO_CONFIG.profile.level);
    const hudLevel = document.getElementById('hud-level');
    if (hudLevel) {
      hudLevel.textContent = levelLabel;
      hudLevel.style.color = 'var(--accent)';
      setTimeout(() => { hudLevel.style.color = ''; }, 500);
    }

    const powerLevel = document.getElementById('power-level');
    if (powerLevel) powerLevel.textContent = `${levelLabel} 🔥`;
  }

  document.getElementById('xp-bar').style.width = xpLevel + '%';
  const rect    = el.getBoundingClientRect();
  const floater = document.createElement('div');
  floater.className   = 'xp-float';
  floater.textContent = '+XP';
  floater.style.left  = (rect.left + rect.width / 2) + 'px';
  floater.style.top   = rect.top + 'px';
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1200);
}

/* ══════════════════════════════════════════
   SCREEN NAVIGATION
══════════════════════════════════════════ */
function startGame() {
  playPressStart();
  document.getElementById('title-screen').classList.remove('active');
  document.getElementById('hud').classList.add('visible');
  document.getElementById('bottom-nav').classList.add('visible');
  document.getElementById('world-screen').classList.add('active');
  updateBottomNav('map');

  const p = PORTFOLIO_CONFIG.profile;
  setTimeout(() => {
    showDialog('SYSTEM', `Welcome, adventurer! You have entered the realm of ${p.name} — ${p.title} & Code Architect. Explore each zone to uncover the epic journey. Every zone visited grants XP!`);
  }, 600);
}

function backToMap() {
  playBackToMap();
  document.getElementById('panel-screen').classList.remove('active');
  document.getElementById('world-screen').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  updateBottomNav('map');
}

function updateBottomNav(zone) {
  const order = ['map','about','skills','experience','projects','blogs','education','achievements','contact'];
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  const idx  = order.indexOf(zone);
  const btns = document.querySelectorAll('.bnav-btn');
  if (btns[idx]) btns[idx].classList.add('active');
}

/* ══════════════════════════════════════════
   DIALOG
══════════════════════════════════════════ */
function showDialog(name, text) {
  document.getElementById('dialog-name').textContent = name;
  document.getElementById('dialog-text').textContent = text;
  document.getElementById('dialog-box').classList.add('visible');
}
function closeDialog() {
  document.getElementById('dialog-box').classList.remove('visible');
}

/* ══════════════════════════════════════════
   ZONE SYSTEM
══════════════════════════════════════════ */
const ZONE_ORDER = ['about','skills','experience','projects','blogs','education','achievements','contact'];

const ZONE_NAMES = {
  about:        '👤 CHARACTER',
  skills:       '⚡ SKILLS FORGE',
  experience:   '💼 BATTLE LOG',
  projects:     '🏗 ARTIFACT HALL',
  blogs:        '💼 FREELANCE',
  education:    '🎓 ACADEMY',
  achievements: '🏆 TROPHY VAULT',
  contact:      '📡 SIGNAL TOWER'
};

function showZone(zone) {
  playZoneEnter();
  document.getElementById('world-screen').classList.remove('active');
  document.getElementById('panel-screen').classList.add('active');
  document.getElementById('panel-screen').scrollTop = 0;
  updateBottomNav(zone);

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('.nav-btn');
  const idx  = ZONE_ORDER.indexOf(zone);
  if (btns[idx]) btns[idx].classList.add('active');

  const content = document.getElementById('panel-content');
  content.innerHTML = '';

  // Back + Prev/Next bar
  const zIdx    = ZONE_ORDER.indexOf(zone);
  const backBar = document.createElement('div');
  backBar.className = 'back-bar';
  backBar.innerHTML = `
    <button class="back-btn" onclick="backToMap()">◀ BACK TO MAP</button>
    <div class="zone-breadcrumb">WORLD MAP → <span>${ZONE_NAMES[zone] || zone.toUpperCase()}</span></div>
    <div style="margin-left:auto; display:flex; gap:7px;">
      ${zIdx > 0 ? `<button class="back-btn" style="border-color:var(--dim);color:var(--dim);" onclick="showZone('${ZONE_ORDER[zIdx-1]}')">◀ PREV</button>` : ''}
      ${zIdx < ZONE_ORDER.length - 1 ? `<button class="back-btn" style="border-color:var(--green);color:var(--green);" onclick="showZone('${ZONE_ORDER[zIdx+1]}')">NEXT ▶</button>` : ''}
    </div>
  `;
  content.appendChild(backBar);

  const inner = document.createElement('div');
  content.appendChild(inner);

  const renderers = {
    about:        renderAbout,
    skills:       renderSkills,
    experience:   renderExperience,
    projects:     renderProjects,
    blogs:        renderFreelanceProfiles,
    education:    renderEducation,
    achievements: renderAchievements,
    contact:      renderContact,
  };
  if (renderers[zone]) renderers[zone](inner);

}

/* ══════════════════════════════════════════
   ZONE RENDERERS
══════════════════════════════════════════ */

/* ── ABOUT ─────────────────────────────── */
function renderAbout(el) {
  const p  = PORTFOLIO_CONFIG.profile;
  const gh = LIVE.github;

  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">👤</span>
      <div class="panel-title">CHARACTER PROFILE</div>
    </div>
    <div style="display:flex; gap:22px; flex-wrap:wrap; margin-bottom:22px;">
      <div style="flex-shrink:0;"><img src="${p.avatar}" style="width: 120px; height: 120px; image-rendering: pixelated; border-radius: 12px; border: 2px solid var(--purple); filter:drop-shadow(0 0 20px var(--purple));"></div>
      <div style="flex:1; min-width:200px;">
        <div style="font-family:'Orbitron',monospace; font-size:20px; color:var(--gold); margin-bottom:5px;">${p.name}</div>
        <div style="font-size:15px; color:var(--border); margin-bottom:14px;">${p.title} @ ${p.company}</div>
        <div style="font-size:15px; color:var(--text); line-height:1.8;">${p.bio}</div>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-label">CLASS</div><div class="stat-value highlight">${p.title}</div></div>
      <div class="stat-box"><div class="stat-label">GUILD</div><div class="stat-value">${p.company}</div></div>
      <div class="stat-box"><div class="stat-label">REALM</div><div class="stat-value">${p.location}</div></div>
      <div class="stat-box"><div class="stat-label">POWER LEVEL</div><div class="stat-value highlight" id="power-level">${formatLevel(p.level)} 🔥</div></div>
      <div class="stat-box">
        <div class="stat-label">🐙 GITHUB REPOS <span style="color:var(--green); font-size:10px;">LIVE</span></div>
        <div class="stat-value highlight" id="ab-repos">⏳</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">🐙 GH FOLLOWERS <span style="color:var(--green); font-size:10px;">LIVE</span></div>
        <div class="stat-value highlight" id="ab-followers">⏳</div>
      </div>
    </div>
    <div class="section-label">HERO'S CREED</div>
    <div style="border-left:3px solid var(--purple); padding-left:14px; font-size:16px; color:var(--dim); line-height:1.8; font-style:italic;">
      "${p.creed}"
    </div>
    <div class="section-label" style="margin-top:22px;">LANGUAGES</div>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      ${p.languages.map(language => `<span class="tag" style="border-color:var(--border); color:var(--border);">${language}</span>`).join('')}
    </div>
  `;

  const updateGitHubStats = (g) => {
    const r = document.getElementById('ab-repos');
    const f = document.getElementById('ab-followers');
    if (r) r.textContent = String(g.repos);
    if (f) f.textContent = String(g.followers);
  };
  if (gh) updateGitHubStats(gh);
  else retryWhenReady('github', updateGitHubStats);
}

/* ── SKILLS ─────────────────────────────── */
function renderSkills(el) {
  const groups = PORTFOLIO_CONFIG.skills;
  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">⚡</span>
      <div class="panel-title">SKILLS FORGE</div>
    </div>
    <div class="section-label">TOOLS & METHODS BY APPLIED AREA</div>
    ${groups.map(group => `
      <section class="skill-group" aria-label="${group.group}">
        <h3 class="skill-group-title">${group.group}</h3>
        <div class="skill-group-tags">
          ${group.items.map(item => `<span class="tag">${item}</span>`).join('')}
        </div>
      </section>
    `).join('')}
  `;
}

/* ── EXPERIENCE ─────────────────────────── */
function renderExperience(el) {
  const exp = PORTFOLIO_CONFIG.experience;
  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">💼</span>
      <div class="panel-title">BATTLE LOG</div>
    </div>
    <div class="section-label">PROFESSIONAL CAMPAIGNS</div>
    ${exp.map(e => `
      <div class="timeline-item">
        <div class="timeline-dot">${e.icon}</div>
        <div class="timeline-body">
          <div class="timeline-title">${e.title}</div>
          <div class="timeline-company">🏰 ${e.company}</div>
          <div class="timeline-date">📅 ${e.date}</div>
          <div class="timeline-desc">${e.desc}</div>
        </div>
      </div>
    `).join('')}
  `;
}

/* ── PROJECTS (config + live GitHub repos) ── */
function renderProjects(el) {
  const projects = PORTFOLIO_CONFIG.projects;
  const gh       = LIVE.github;
  const featuredRepoKeys = new Set(projects.map(project => getGitHubRepoKey(project.link)).filter(Boolean));

  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">🏗</span>
      <div class="panel-title">ARTIFACT HALL</div>
    </div>
    <div class="section-label">LEGENDARY CREATIONS</div>
    ${projects.map(project => {
      const cardContent = `
        <div class="project-name">${project.name}${project.link ? ' <span style="font-size:11px;color:var(--dim);">↗</span>' : ''}</div>
        <div style="font-size:15px; color:var(--text); line-height:1.6;">${project.desc}</div>
        <div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        <div class="project-access">${project.link ? '↗ Open public repository' : 'No public repository or demo linked'}</div>
      `;
      return project.link
        ? `<a class="project-card project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${cardContent}</a>`
        : `<article class="project-card">${cardContent}</article>`;
    }).join('')}

    <div class="section-label" style="margin-top:26px;">
      🐙 MORE GITHUB REPOSITORIES
      <span style="color:var(--green); font-size:10px; margin-left:6px;">⚡ LIVE</span>
      <span id="gh-meta" aria-live="polite" style="font-size:12px; color:var(--dim); margin-left:6px;">⏳ fetching...</span>
    </div>
    <div id="gh-repo-list" aria-live="polite"></div>
  `;

  const updateRepoList = (g) => {
    const list = document.getElementById('gh-repo-list');
    const meta = document.getElementById('gh-meta');
    const repos = g.repoList.filter(repo => !featuredRepoKeys.has(getGitHubRepoKey(repo.url)));
    if (list) list.replaceChildren(buildRepoCards(repos));
    if (meta) meta.textContent = `${g.repos} public repos · ${g.followers} followers`;
  };
  if (gh) updateRepoList(gh);
  else {
    const list = document.getElementById('gh-repo-list');
    if (list) list.innerHTML = spinner('FETCHING GITHUB REPOS...');
    retryWhenReady('github', updateRepoList);
  }
}

function buildRepoCards(repos) {
  const fragment = document.createDocumentFragment();
  if (!repos || repos.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'repo-empty';
    empty.textContent = 'All public repositories are featured above.';
    fragment.appendChild(empty);
    return fragment;
  }

  repos.slice(0, 12).forEach(repo => {
    const card = document.createElement('article');
    card.className = 'project-card github-repo-card';

    const heading = document.createElement('div');
    heading.className = 'repo-card-heading';
    const repoUrl = getGitHubRepoUrl(repo.url);
    const name = document.createElement(repoUrl ? 'a' : 'span');
    name.className = 'project-name repo-name';
    name.textContent = `🐙 ${repo.name}${repoUrl ? ' ↗' : ''}`;
    if (repoUrl) {
      name.href = repoUrl;
      name.target = '_blank';
      name.rel = 'noopener noreferrer';
    }
    heading.appendChild(name);

    const stats = document.createElement('div');
    stats.className = 'repo-stats';
    const stars = document.createElement('span');
    stars.textContent = `⭐ ${Number(repo.stars) || 0}`;
    stars.setAttribute('aria-label', `Stars: ${Number(repo.stars) || 0}`);
    const forks = document.createElement('span');
    forks.textContent = `🍴 ${Number(repo.forks) || 0}`;
    forks.setAttribute('aria-label', `Forks: ${Number(repo.forks) || 0}`);
    stats.append(stars, forks);
    heading.appendChild(stats);

    const description = document.createElement('p');
    description.className = 'repo-description';
    description.textContent = resolveGitHubRepoDescription(repo);

    const details = document.createElement('div');
    details.className = 'repo-details';
    if (repo.language) {
      const language = document.createElement('span');
      language.className = 'tag repo-language';
      language.textContent = repo.language;
      details.appendChild(language);
    }
    const updated = document.createElement('span');
    updated.className = 'repo-updated';
    updated.textContent = `Updated ${repo.updated || 'date unavailable'}`;
    details.appendChild(updated);

    card.append(heading, description, details);
    fragment.appendChild(card);
  });
  return fragment;
}

function getGitHubRepoUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : null;
  } catch {
    return null;
  }
}

function getGitHubRepoKey(value) {
  const url = getGitHubRepoUrl(value);
  return url ? new URL(url).pathname.replace(/\/$/, '').toLowerCase() : '';
}

/* ── FREELANCE PROFILES ─────── */
function renderFreelanceProfiles(el) {
  const profiles = PORTFOLIO_CONFIG.freelanceProfiles;
  const count = profiles.length;

  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">✍️</span>
      <div class="panel-title">FREELANCE PROFILES</div>
    </div>
    <div style="font-size:15px; color:var(--dim); margin-bottom:16px;">
      Active across <span style="color:var(--green);">${count} freelance platforms</span>
    </div>
    <div class="section-label">ACTIVE FREELANCE PLATFORMS</div>
    <div id="freelance-profile-list">
      ${buildFreelanceProfileCards(profiles)}
    </div>
  `;

  const zoneDesc = document.getElementById('freelance-zone-desc');
  if (zoneDesc) zoneDesc.textContent = `${count} freelance profiles`;
}

function buildFreelanceProfileCards(profiles) {
  if (!profiles || profiles.length === 0) return `<div style="color:var(--dim);font-size:15px;padding:12px;">No freelance profiles listed.</div>`;
  return profiles.map((profile, i) => `
    <a class="blog-card" href="${profile.link}" target="_blank" rel="noopener noreferrer">
      <span class="blog-num">#${String(i + 1).padStart(2, '0')}</span>
      <div class="blog-body">
        <div class="blog-title">${profile.title}</div>
        <div class="blog-desc">${profile.desc}</div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:4px;">
          <div class="blog-date">● ${profile.date}</div>
          ${(profile.tags || []).map(tag => `<span style="font-size:11px;color:var(--purple);border:1px solid var(--purple);padding:1px 6px;">${tag}</span>`).join('')}
        </div>
      </div>
      <span aria-hidden="true" style="color:var(--green); font-size:18px; flex-shrink:0;">↗</span>
    </a>
  `).join('');
}

/* ── EDUCATION ──────────────────────────── */
function renderEducation(el) {
  const edu   = PORTFOLIO_CONFIG.education;
  const specs = PORTFOLIO_CONFIG.specializations;
  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">🎓</span>
      <div class="panel-title">ACADEMY RECORDS</div>
    </div>
    <div class="section-label">KNOWLEDGE SCROLLS</div>
    ${edu.map(e => `
      <div class="timeline-item">
        <div class="timeline-dot">${e.icon}</div>
        <div class="timeline-body">
          <div class="timeline-title">${e.degree}</div>
          <div class="timeline-company">🎓 ${e.school}</div>
          <div class="timeline-date">📅 ${e.year}</div>
          <div class="timeline-desc">${e.desc}</div>
        </div>
      </div>
    `).join('')}
    <div class="section-label" style="margin-top:26px;">SPECIALIZATIONS</div>
    <div class="badges-grid">
      ${specs.map(s => `
        <div class="badge">
          <span class="badge-icon">${s.icon}</span>
          <div class="badge-name">${s.name}</div>
          <div class="badge-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ── ACHIEVEMENTS (live stats) ─────────── */
function renderAchievements(el) {
  const badges = PORTFOLIO_CONFIG.achievements;
  const p      = PORTFOLIO_CONFIG.profile;
  const gh     = LIVE.github;

  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">🏆</span>
      <div class="panel-title">TROPHY VAULT</div>
    </div>
    <div class="section-label">LEGENDARY ACHIEVEMENTS</div>
    <div class="badges-grid">
      ${badges.map(b => `
        <div class="badge">
          <span class="badge-icon">${b.icon}</span>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
        </div>
      `).join('')}
    </div>
    <div class="section-label" style="margin-top:26px;">
      HERO STATS
      <span style="color:var(--green); font-size:10px; margin-left:6px;">⚡ LIVE</span>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-label">CAREER START</div><div class="stat-value highlight">${p.careerStart}</div></div>
      <div class="stat-box"><div class="stat-label">PROJECTS SHIPPED</div><div class="stat-value highlight">${p.projectsShipped}</div></div>
      <div class="stat-box"><div class="stat-label">TECH STACK</div><div class="stat-value highlight">${p.techStackSize}</div></div>
      <div class="stat-box">
        <div class="stat-label">🐙 GITHUB REPOS</div>
        <div class="stat-value highlight" id="ac-repos">⏳</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">🐙 GH FOLLOWERS</div>
        <div class="stat-value highlight" id="ac-followers">⏳</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">💼 FREELANCE PROFILES</div>
        <div class="stat-value highlight" id="ac-freelance-profiles">${PORTFOLIO_CONFIG.freelanceProfiles.length}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">🤝 CLIENT RATING</div>
        <div class="stat-value highlight">${p.clientRating}</div>
      </div>
      <div class="stat-box"><div class="stat-label">BOSS DIFFICULTY</div><div class="stat-value highlight">LEGENDARY 🔥</div></div>
    </div>
  `;

  const updateGitHubStats = (g) => {
    const r = document.getElementById('ac-repos');
    const f = document.getElementById('ac-followers');
    if (r) r.textContent = String(g.repos);
    if (f) f.textContent = String(g.followers);
  };
  if (gh) updateGitHubStats(gh);
  else retryWhenReady('github', updateGitHubStats);

}

/* ── CONTACT ────────────────────────────── */
function renderContact(el) {
  const c  = PORTFOLIO_CONFIG.contact;
  const p  = PORTFOLIO_CONFIG.profile;
  const gh = LIVE.github;
  const freelanceCount = PORTFOLIO_CONFIG.freelanceProfiles.length;
  const phoneHref = c.phone.replace(/[^\d+]/g, '');

  const links = [
    c.linkedin      ? { href: c.linkedin,                 icon: '💼', label: 'LinkedIn',          value: c.linkedin.split('/in/').pop().replace(/\/$/, ''), external: true } : null,
    c.github        ? { href: c.github,                   icon: '🐙', label: 'GitHub',            value: `@${c.github.split('/').filter(Boolean).pop()}`, id: 'ct-github', external: true } : null,
    c.credly        ? { href: c.credly,                   icon: '🏅', label: 'Credly',            value: 'View badges & credentials', external: true } : null,
    c.email         ? { href: `mailto:${c.email}`,        icon: '📧', label: 'Email',             value: c.email } : null,
    c.academicEmail ? { href: `mailto:${c.academicEmail}`,icon: '🎓', label: 'University Email', value: c.academicEmail } : null,
    c.phone         ? { href: `tel:${phoneHref}`,         icon: '📱', label: 'Phone',             value: c.phone } : null,
    c.kafiil        ? { href: c.kafiil,                   icon: '📝', label: 'Freelance',         value: `${freelanceCount} active platform profiles`, external: true } : null,
  ].filter(Boolean);

  el.innerHTML = `
    <div class="panel-header">
      <span class="panel-icon">📡</span>
      <div class="panel-title">SIGNAL TOWER</div>
    </div>
    <div class="section-label">REACH THE HERO</div>
    <div class="contact-grid">
      ${links.map(l => `
        <a class="contact-item" href="${l.href}" ${l.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          <span class="contact-icon">${l.icon}</span>
          <div style="min-width:0;">
            <div class="contact-label">${l.label}</div>
            <div class="contact-value" ${l.id ? `id="${l.id}"` : ''}>${l.value}</div>
          </div>
        </a>
      `).join('')}
    </div>
    <div class="section-label" style="margin-top:26px;">STATUS</div>
    <div style="display:flex; align-items:center; gap:10px; font-size:16px; margin-bottom:22px;">
      <span style="color:var(--green); font-size:20px;">●</span>
      <span style="color:var(--text);">${p.status} — Reach out to begin the quest together!</span>
    </div>
    <div style="background:var(--panel); border:1px solid var(--dim); padding:18px;">
      <div class="section-label" style="margin-top:0">SEND A MESSAGE BY EMAIL</div>
      <div style="font-size:15px; color:var(--dim); line-height:1.6; margin-bottom:12px;">Your email app will open with a new message addressed directly to me.</div>
      <a href="mailto:${c.email}?subject=Portfolio%20Inquiry" class="back-btn" style="display:inline-block;border-color:var(--green);color:var(--green);text-decoration:none;font-family:'Press Start 2P',monospace;font-size:8px;padding:10px 14px;">✉ EMAIL ABDULRAHMAN</a>
    </div>
  `;

  const updateGitHubContact = (g) => {
    const el = document.getElementById('ct-github');
    if (el) el.textContent = `@Abdulrahman-Alfeqy · ${g.repos} repos · ${g.followers} followers`;
  };
  if (gh) updateGitHubContact(gh);
  else retryWhenReady('github', updateGitHubContact);

}

/* ══════════════════════════════════════════
   BOOT
══════════════════════════════════════════ */
bootFromConfig();
