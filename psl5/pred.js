// ═══════════════════════════════════════════════════════════════
// PSL5 PREDICTIONS — predictions.js
// Backend: JSONBin.io
// ═══════════════════════════════════════════════════════════════

const BIN_ID  = ‘69e010c736566621a8b9d178’;
const API_KEY = ‘$2a$10$MDPz1uTuJ6DzEmG2caFFLuw1VMFMdCGG9TBFj7yP6rj5lU6h7nQCS’;
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const ADMIN_USER = ‘thanos’;

const PSL5_PLAYERS = [
‘Dimitris Gavalas’,‘Thanos Chatziiordanou’,‘Giannis Akridas’,‘Giorgos Filippou’,
‘Iordanis Aslanis’,‘Spyros Koskinas’,‘Michalis Lerogiannis’,‘Nikolas Moschonas’,
‘Iasonas Miliaras’,‘Petros Papaspyropoulos’,‘Vasilis Tziovanis’,‘Giorgos Zacharopoulos’,
‘Stefanos Mavrogiannis’,‘Tzannis Mermigas’,‘Nikos Kalisperis’,‘Stavros Stavropoulos’,
‘Alexandros Kalofolias’,‘Other / Unknown’
];

// ── JSONBin HELPERS ───────────────────────────────────────────

let _cache = null;

async function dbGet() {
if (_cache) return _cache;
const r = await fetch(`${BIN_URL}/latest`, {
headers: { ‘X-Master-Key’: API_KEY }
});
const j = await r.json();
_cache = j.record;
return _cache;
}

async function dbSet(data) {
_cache = data;
await fetch(BIN_URL, {
method: ‘PUT’,
headers: { ‘Content-Type’: ‘application/json’, ‘X-Master-Key’: API_KEY },
body: JSON.stringify(data)
});
}

async function dbUpdate(fn) {
const data = await dbGet();
const updated = fn(data);
await dbSet(updated);
return updated;
}

// ── SIMPLE HASH ───────────────────────────────────────────────

async function hashPass(pass) {
const buf = await crypto.subtle.digest(‘SHA-256’, new TextEncoder().encode(pass + ‘psl5salt’));
return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,‘0’)).join(’’);
}

// ── SESSION ───────────────────────────────────────────────────

let currentUser = null;

function loadSession() {
const s = localStorage.getItem(‘psl5pred_session’);
return s ? JSON.parse(s) : null;
}
function saveSession(u) { localStorage.setItem(‘psl5pred_session’, JSON.stringify(u)); }
function clearSession()  { localStorage.removeItem(‘psl5pred_session’); }

// ── TOAST ─────────────────────────────────────────────────────

function toast(msg, type=‘info’) {
const el = document.getElementById(‘toast’);
el.textContent = msg;
el.className = `toast t-${type} show`;
setTimeout(() => el.classList.remove(‘show’), 3200);
}

// ── SCREEN / TAB ──────────────────────────────────────────────

function showAuthTab(tab) {
document.getElementById(‘auth-login’).classList.toggle(‘hidden’, tab !== ‘login’);
document.getElementById(‘auth-register’).classList.toggle(‘hidden’, tab !== ‘register’);
document.getElementById(‘li-err’).classList.add(‘hidden’);
document.getElementById(‘rg-err’).classList.add(‘hidden’);
}

function showApp() {
document.getElementById(‘screen-auth’).classList.add(‘hidden’);
document.getElementById(‘screen-app’).classList.remove(‘hidden’);
document.getElementById(‘tn-user-label’).innerHTML = `Signed in as <strong>${currentUser.username}</strong>`;
if (currentUser.isAdmin) document.getElementById(‘btn-tab-admin’).style.display = ‘’;
showTab(‘predict’);
}

function showTab(id) {
document.querySelectorAll(’.tab-pane’).forEach(p => p.classList.add(‘hidden’));
document.querySelectorAll(’.tn-tab’).forEach(t => t.classList.remove(‘active’));
document.getElementById(‘tab-’ + id).classList.remove(‘hidden’);
const btn = document.querySelector(`[data-tab="${id}"]`);
if (btn) btn.classList.add(‘active’);
if (id === ‘predict’)     loadPredictTab();
if (id === ‘leaderboard’) loadLeaderboard();
if (id === ‘my-picks’)    loadMyPicks();
if (id === ‘admin’)       loadAdmin();
}

// ── AUTH ──────────────────────────────────────────────────────

async function doLogin() {
const raw  = document.getElementById(‘li-user’).value.trim();
const pass = document.getElementById(‘li-pass’).value;
const errEl = document.getElementById(‘li-err’);
errEl.classList.add(‘hidden’);

if (!raw || !pass) { errEl.textContent = ‘Please fill in all fields.’; errEl.classList.remove(‘hidden’); return; }

setLoading(‘li-btn’, true);
try {
const db = await dbGet();
const users = db.users || {};
const user = Object.values(users).find(u =>
u.username.toLowerCase() === raw.toLowerCase() ||
u.email.toLowerCase() === raw.toLowerCase()
);
if (!user) { errEl.textContent = ‘Account not found.’; errEl.classList.remove(‘hidden’); return; }
const hash = await hashPass(pass);
if (hash !== user.passHash) { errEl.textContent = ‘Incorrect password.’; errEl.classList.remove(‘hidden’); return; }

```
currentUser = { username: user.username, email: user.email, isAdmin: user.username.toLowerCase() === ADMIN_USER.toLowerCase() };
saveSession(currentUser);
showApp();
```

} catch(e) {
errEl.textContent = ‘Connection error. Try again.’; errEl.classList.remove(‘hidden’);
} finally {
setLoading(‘li-btn’, false);
}
}

async function doRegister() {
const username = document.getElementById(‘rg-user’).value.trim();
const email    = document.getElementById(‘rg-email’).value.trim().toLowerCase();
const pass     = document.getElementById(‘rg-pass’).value;
const errEl    = document.getElementById(‘rg-err’);
errEl.classList.add(‘hidden’);

if (!username || !email || !pass) { errEl.textContent = ‘Please fill in all fields.’; errEl.classList.remove(‘hidden’); return; }
if (username.length < 2)          { errEl.textContent = ‘Username must be at least 2 characters.’; errEl.classList.remove(‘hidden’); return; }
if (pass.length < 6)              { errEl.textContent = ‘Password must be at least 6 characters.’; errEl.classList.remove(‘hidden’); return; }
if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) { errEl.textContent = ‘Enter a valid email.’; errEl.classList.remove(‘hidden’); return; }

setLoading(‘rg-btn’, true);
try {
const db = await dbGet();
const users = db.users || {};
if (users[username.toLowerCase()]) { errEl.textContent = ‘Username already taken.’; errEl.classList.remove(‘hidden’); return; }
if (Object.values(users).find(u => u.email === email)) { errEl.textContent = ‘Email already registered.’; errEl.classList.remove(‘hidden’); return; }

```
const passHash = await hashPass(pass);
users[username.toLowerCase()] = { username, email, passHash, joined: new Date().toISOString() };
await dbSet({ ...db, users });

currentUser = { username, email, isAdmin: username.toLowerCase() === ADMIN_USER.toLowerCase() };
saveSession(currentUser);
showApp();
toast(`Welcome, ${username}! 🎉`, 'ok');
```

} catch(e) {
errEl.textContent = ‘Connection error. Try again.’; errEl.classList.remove(‘hidden’);
} finally {
setLoading(‘rg-btn’, false);
}
}

function doLogout() {
clearSession();
_cache = null;
currentUser = null;
document.getElementById(‘screen-auth’).classList.remove(‘hidden’);
document.getElementById(‘screen-app’).classList.add(‘hidden’);
document.getElementById(‘btn-tab-admin’).style.display = ‘none’;
showAuthTab(‘login’);
}

function setLoading(btnId, loading) {
const btn = document.getElementById(btnId);
if (!btn) return;
btn.disabled = loading;
btn.textContent = loading ? ‘Please wait…’ : btn.dataset.label;
}

// ── PREDICT TAB ───────────────────────────────────────────────

async function loadPredictTab() {
const el = document.getElementById(‘predict-content’);
el.innerHTML = loadingHtml();
try {
const db = await dbGet();
const matchdays = db.matchdays || [];
const allPreds  = db.predictions || {};
const myPreds   = allPreds[currentUser.username.toLowerCase()] || {};
const open   = matchdays.filter(md => md.status === ‘open’);
const scored = matchdays.filter(md => md.status === ‘scored’);

```
if (!open.length && !scored.length) {
  el.innerHTML = emptyHtml('⏳', 'No open matchdays', "Predictions aren't open yet. Check back soon!");
  return;
}

let html = '';
if (open.length) {
  html += `<div class="card-title mb8">🟢 Open for predictions</div>`;
  open.forEach(md => { html += renderPredictMatchday(md, myPreds[md.id]||{}, false) + '<div class="mb16"></div>'; });
}
if (scored.length) {
  html += `<div class="card-title mb8 mt8">✅ Results in</div>`;
  scored.slice().reverse().forEach(md => { html += renderPredictMatchday(md, myPreds[md.id]||{}, true) + '<div class="mb16"></div>'; });
}
el.innerHTML = html;
```

} catch(e) {
el.innerHTML = errorHtml();
}
}

function renderPredictMatchday(md, myPreds, isScored) {
const predicted = Object.keys(myPreds).length;
const statusBadge = isScored
? `<span class="badge bg-green">Scored</span>`
: `<span class="badge bg-blue">Open · ${predicted}/${md.matches.length} submitted</span>`;

const matchesHtml = md.matches.map(m =>
isScored ? renderScoredMatch(m, myPreds[m.id]||{}) : renderPredictMatch(m, myPreds[m.id]||{}, md.id)
).join(’’);

const submitBtn = !isScored
? `<div style="padding:12px 16px;border-top:1px solid var(--border);"> <button class="btn btn-primary" onclick="submitPredictions('${md.id}')">💾 Save Predictions</button> <span class="tm fs11" style="margin-left:10px;">Saves all picks for this matchday</span> </div>` : ‘’;

return `<div class="md-card">
<div class="md-header">
<div><div class="md-title">${md.title}</div><div class="tm fs11 mt8">${md.matches.length} matches</div></div>
${statusBadge}
</div>
<div class="md-body">${matchesHtml}</div>
${submitBtn}

  </div>`;
}

function renderPredictMatch(m, pred, mdId) {
const mvpOpts = PSL5_PLAYERS.map(p => `<option value="${p}" ${pred.mvp===p?'selected':''}>${p}</option>`).join(’’);
return `<div class="pred-match">
<div class="pred-teams">
<span class="pred-team right">${m.home}</span>
<span class="pred-vs">vs</span>
<span class="pred-team">${m.away}</span>
</div>
<div class="pred-inputs">
<input type="number" class="score-input" min="0" max="20" placeholder="—"
id="pred-hs-${m.id}" value="${pred.hs !== undefined ? pred.hs : ''}">
<span class="pred-dash">–</span>
<input type="number" class="score-input" min="0" max="20" placeholder="—"
id="pred-as-${m.id}" value="${pred.as !== undefined ? pred.as : ''}">
</div>
<div class="pred-mvp">
<select id="pred-mvp-${m.id}">
<option value="">— Pick MVP —</option>
${mvpOpts}
</select>
</div>

  </div>`;
}

function renderScoredMatch(m, pred) {
if (pred.hs === undefined) {
return `<div class="pred-match"> <div class="pred-teams"> <span class="pred-team right">${m.home}</span><span class="pred-vs">vs</span><span class="pred-team">${m.away}</span> </div> <div class="pred-result mt8"> <span class="badge bg-muted">No prediction</span> <span class="actual-score">Result: ${m.hs}–${m.as}${m.mvp?` · MVP: ${m.mvp}`:''}</span> </div> </div>`;
}
const pts = calcPoints(pred, m);
const ptsCls = pts >= 3 ? ‘pts-3’ : pts >= 1 ? ‘pts-1’ : ‘pts-0’;
const breakdown = [];
if (pred.hs == m.hs && pred.as == m.as) breakdown.push(‘exact score ✓’);
else if (resultMatch(pred, m)) breakdown.push(‘correct result ✓’);
if (pred.mvp && m.mvp && pred.mvp === m.mvp) breakdown.push(‘MVP ✓’);

return `<div class="pred-match"> <div class="pred-teams"> <span class="pred-team right">${m.home}</span><span class="pred-vs">vs</span><span class="pred-team">${m.away}</span> </div> <div class="pred-result mt8"> <span class="pts-earned ${ptsCls}">+${pts} pts</span> <span class="actual-score">Your pick: ${pred.hs}–${pred.as}${pred.mvp?` · ${pred.mvp}`:''}</span> <span class="actual-score">Result: ${m.hs}–${m.as}${m.mvp?` · MVP: ${m.mvp}`:''}</span> </div> ${breakdown.length ? `<div class="fs11 ta mt8">${breakdown.join(’ · ’)}</div>` : ‘’}

  </div>`;
}

function calcPoints(pred, match) {
let pts = 0;
if (pred.hs == match.hs && pred.as == match.as) pts += 3;
else if (resultMatch(pred, match)) pts += 1;
if (pred.mvp && match.mvp && pred.mvp === match.mvp) pts += 1;
return pts;
}

function resultMatch(pred, match) {
const pr = pred.hs > pred.as ? ‘h’ : pred.hs < pred.as ? ‘a’ : ‘d’;
const mr = match.hs > match.as ? ‘h’ : match.hs < match.as ? ‘a’ : ‘d’;
return pr === mr;
}

async function submitPredictions(mdId) {
const db = await dbGet();
const md = (db.matchdays||[]).find(m => m.id === mdId);
if (!md) return;

const uKey = currentUser.username.toLowerCase();
const allPreds = db.predictions || {};
if (!allPreds[uKey]) allPreds[uKey] = {};
if (!allPreds[uKey][mdId]) allPreds[uKey][mdId] = {};

md.matches.forEach(m => {
const hs  = document.getElementById(`pred-hs-${m.id}`)?.value;
const as  = document.getElementById(`pred-as-${m.id}`)?.value;
const mvp = document.getElementById(`pred-mvp-${m.id}`)?.value;
allPreds[uKey][mdId][m.id] = {
hs:  hs  !== ‘’ ? parseInt(hs)  : undefined,
as:  as  !== ‘’ ? parseInt(as)  : undefined,
mvp: mvp || undefined,
};
});

await dbSet({ …db, predictions: allPreds });
_cache = null;
toast(‘Predictions saved! ✅’, ‘ok’);
}

// ── LEADERBOARD ───────────────────────────────────────────────

async function loadLeaderboard() {
const lbEl = document.getElementById(‘lb-list’);
const myEl = document.getElementById(‘lb-my-stats’);
lbEl.innerHTML = loadingHtml();

try {
const db = await dbGet();
const scores = computeAllScores(db);
const sorted = Object.values(scores).sort((a,b) => b.total - a.total);

```
if (!sorted.length) {
  lbEl.innerHTML = `<div class="tc tm" style="padding:2rem;font-size:13px;">No scores yet — predictions are still open!</div>`;
  myEl.style.display = 'none';
  return;
}

const myScore = scores[currentUser.username.toLowerCase()];
if (myScore) {
  const myPos = sorted.findIndex(s => s.username.toLowerCase() === currentUser.username.toLowerCase()) + 1;
  myEl.style.display = '';
  myEl.innerHTML = `<div class="card-title mb12">Your Stats</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
      ${[{v:`#${myPos}`,l:'Rank'},{v:myScore.total,l:'Points'},{v:myScore.exact,l:'Exact'},{v:myScore.mvp,l:'MVPs'}]
        .map(x=>`<div style="text-align:center;background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 6px;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:var(--text);">${x.v}</div>
          <div class="tm fs11">${x.l}</div>
        </div>`).join('')}
    </div>`;
} else { myEl.style.display = 'none'; }

const rankIcon = i => i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
const rankCls  = i => i===0?'gold':i===1?'silver':i===2?'bronze':'';

lbEl.innerHTML = `<div class="card-title mb12">Season Standings</div>` +
  sorted.map((s,i) => {
    const isMe = s.username.toLowerCase() === currentUser.username.toLowerCase();
    return `<div class="lb-row">
      <div class="lb-rank ${rankCls(i)}">${rankIcon(i)||i+1}</div>
      <div class="f1">
        <div class="lb-name ${isMe?'me':''}">${s.username}${isMe?' ★':''}</div>
        <div class="lb-breakdown">${s.exact} exact · ${s.result} results · ${s.mvp} MVPs</div>
      </div>
      <div class="lb-pts">${s.total}<span class="tm" style="font-size:11px;"> pts</span></div>
    </div>`;
  }).join('');
```

} catch(e) {
lbEl.innerHTML = errorHtml();
}
}

function computeAllScores(db) {
const matchdays = db.matchdays || [];
const allPreds  = db.predictions || {};
const users     = db.users || {};
const scored    = matchdays.filter(md => md.status === ‘scored’);
const scores    = {};

for (const [uKey, userPreds] of Object.entries(allPreds)) {
let total=0, exact=0, result=0, mvp=0;
for (const md of scored) {
const mdPreds = userPreds[md.id] || {};
for (const m of md.matches) {
const pred = mdPreds[m.id];
if (!pred || pred.hs === undefined) continue;
const pts = calcPoints(pred, m);
total += pts;
if (pred.hs == m.hs && pred.as == m.as) exact++;
else if (resultMatch(pred, m)) result++;
if (pred.mvp && m.mvp && pred.mvp === m.mvp) mvp++;
}
}
const uData = users[uKey];
scores[uKey] = { username: uData?.username || uKey, total, exact, result, mvp };
}
return scores;
}

// ── MY PICKS ──────────────────────────────────────────────────

async function loadMyPicks() {
const el = document.getElementById(‘my-picks-content’);
el.innerHTML = loadingHtml();
try {
const db = await dbGet();
const matchdays = db.matchdays || [];
const allPreds  = db.predictions || {};
const myPreds   = allPreds[currentUser.username.toLowerCase()] || {};

```
if (!Object.keys(myPreds).length) {
  el.innerHTML = emptyHtml('🎯', 'No predictions yet', 'Head to the Predict tab to make your picks!');
  return;
}

let html = '';
let grandTotal = 0;

matchdays.slice().reverse().forEach(md => {
  const mdPreds = myPreds[md.id];
  if (!mdPreds) return;
  const isScored = md.status === 'scored';
  let mdPts = 0;

  const rows = md.matches.map(m => {
    const pred = mdPreds[m.id];
    if (!pred || pred.hs === undefined) return `<div class="stat-row-mini"><span class="tm fs12">${m.home} vs ${m.away}</span><span class="badge bg-muted">Skipped</span></div>`;
    if (isScored) {
      const pts = calcPoints(pred, m);
      mdPts += pts; grandTotal += pts;
      const bc = pts >= 3 ? 'bg-green' : pts >= 1 ? 'bg-gold' : 'bg-muted';
      return `<div class="stat-row-mini">
        <div>
          <div class="fs12 fw6">${m.home} vs ${m.away}</div>
          <div class="tm" style="font-size:11px;">Pick: ${pred.hs}–${pred.as}${pred.mvp?` · ${pred.mvp}`:''} · Result: ${m.hs}–${m.as}</div>
        </div>
        <span class="badge ${bc}">${pts>0?'+':''}${pts} pts</span>
      </div>`;
    } else {
      return `<div class="stat-row-mini">
        <div class="fs12 fw6">${m.home} vs ${m.away}</div>
        <span class="tm fs11">${pred.hs}–${pred.as}${pred.mvp?` · MVP: ${pred.mvp}`:''}</span>
      </div>`;
    }
  }).join('');

  const badge = isScored ? `<span class="badge bg-green">+${mdPts} pts</span>` : `<span class="badge bg-blue">Pending</span>`;
  html += `<div class="card mb12">
    <div class="flex jb ac mb12">
      <div class="card-title" style="margin:0;">${md.title}</div>${badge}
    </div>${rows}
  </div>`;
});

el.innerHTML = `<div class="card mb16 tc" style="padding:1.25rem;">
  <div style="font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--gold);">${grandTotal}</div>
  <div class="tm fs12">Total Points Earned</div>
</div>${html}`;
```

} catch(e) { el.innerHTML = errorHtml(); }
}

// ── ADMIN ─────────────────────────────────────────────────────

async function loadAdmin() {
if (!currentUser.isAdmin) return;
const el = document.getElementById(‘admin-content’);
el.innerHTML = loadingHtml();
try {
const db = await dbGet();
const matchdays = db.matchdays || [];

```
if (!matchdays.length) {
  el.innerHTML = `<div class="card tc tm" style="padding:2rem;font-size:13px;">No matchdays yet. Click "+ New Matchday" to create one.</div>`;
  return;
}

let html = '';
matchdays.slice().reverse().forEach(md => {
  const sbCls = md.status==='open'?'bg-blue':md.status==='scored'?'bg-green':'bg-muted';
  const sbLbl = md.status==='open'?'Open':md.status==='scored'?'Scored':'Closed';

  const matchRows = md.matches.map(m => {
    const inputs = md.status !== 'scored'
      ? `<div class="admin-score-inputs">
          <input type="number" min="0" max="30" placeholder="—" id="res-hs-${m.id}" value="${m.hs!==null?m.hs:''}" style="width:48px!important;text-align:center;padding:6px 4px!important;">
          <span class="tm">–</span>
          <input type="number" min="0" max="30" placeholder="—" id="res-as-${m.id}" value="${m.as!==null?m.as:''}" style="width:48px!important;text-align:center;padding:6px 4px!important;">
          <select id="res-mvp-${m.id}" style="flex:1;min-width:120px;font-size:12px;padding:5px 8px;">
            <option value="">— MVP —</option>
            ${PSL5_PLAYERS.map(p=>`<option value="${p}" ${m.mvp===p?'selected':''}>${p}</option>`).join('')}
          </select>
        </div>`
      : `<span class="score-pill">${m.hs}–${m.as}</span><span class="tm fs11" style="margin-left:8px;">${m.mvp||'No MVP'}</span>`;
    return `<div class="admin-match-row"><div class="admin-teams">${m.home} <span class="tm">vs</span> ${m.away}</div>${inputs}</div>`;
  }).join('');

  const actions = md.status==='scored'
    ? `<span class="tm fs12">Scoring complete ✅</span>`
    : `${md.status==='closed'
        ?`<button class="btn btn-primary btn-sm" onclick="adminSetStatus('${md.id}','open')">Open Predictions</button>`
        :`<button class="btn btn-danger btn-sm" onclick="adminSetStatus('${md.id}','closed')">Close Predictions</button>`}
       <button class="btn btn-outline btn-sm" onclick="adminEnterResults('${md.id}')">Enter Results & Score</button>`;

  html += `<div class="card mb16">
    <div class="flex jb ac mb12">
      <div><div style="font-size:15px;font-weight:600;">${md.title}</div><div class="tm fs11 mt8">${md.matches.length} matches</div></div>
      <div class="flex gap8 ac" style="flex-wrap:wrap;">
        <span class="badge ${sbCls}">${sbLbl}</span>
        <button class="btn btn-danger btn-sm" onclick="adminDeleteMatchday('${md.id}')">Delete</button>
      </div>
    </div>
    <div style="margin-bottom:12px;">${matchRows}</div>
    <div class="flex gap8" style="flex-wrap:wrap;">${actions}</div>
  </div>`;
});
el.innerHTML = html;
```

} catch(e) { el.innerHTML = errorHtml(); }
}

async function adminCreateMatchday() {
const title = prompt(‘Matchday title (e.g. “Matchday 3”):’);
if (!title) return;
const numMatches = parseInt(prompt(‘How many matches?’, ‘5’));
if (!numMatches || numMatches < 1) return;

const matches = [];
for (let i = 0; i < numMatches; i++) {
const home = prompt(`Match ${i+1} — Home team:`);
if (!home) return;
const away = prompt(`Match ${i+1} — Away team:`);
if (!away) return;
matches.push({ id: `m${Date.now()}_${i}`, home: home.trim(), away: away.trim(), hs: null, as: null, mvp: null });
}

const db = await dbGet();
const matchdays = db.matchdays || [];
matchdays.push({ id: `md_${Date.now()}`, title: title.trim(), status: ‘closed’, matches });
await dbSet({ …db, matchdays });
_cache = null;
toast(‘Matchday created!’, ‘ok’);
loadAdmin();
}

async function adminSetStatus(mdId, status) {
const db = await dbGet();
const md = (db.matchdays||[]).find(m => m.id === mdId);
if (!md) return;
md.status = status;
await dbSet(db);
_cache = null;
toast(`Matchday is now ${status}.`, ‘ok’);
loadAdmin();
}

async function adminEnterResults(mdId) {
const db = await dbGet();
const md = (db.matchdays||[]).find(m => m.id === mdId);
if (!md) return;

let allFilled = true;
md.matches.forEach(m => {
const hs  = document.getElementById(`res-hs-${m.id}`)?.value;
const as  = document.getElementById(`res-as-${m.id}`)?.value;
const mvp = document.getElementById(`res-mvp-${m.id}`)?.value;
if (hs === ‘’ || as === ‘’) { allFilled = false; return; }
m.hs = parseInt(hs); m.as = parseInt(as); m.mvp = mvp || null;
});

if (!allFilled) { toast(‘Please fill in all scores first.’, ‘err’); return; }
md.status = ‘scored’;
await dbSet(db);
_cache = null;
toast(‘Results saved and matchday scored! ✅’, ‘ok’);
loadAdmin();
}

async function adminDeleteMatchday(mdId) {
if (!confirm(‘Delete this matchday? This cannot be undone.’)) return;
const db = await dbGet();
db.matchdays = (db.matchdays||[]).filter(m => m.id !== mdId);
await dbSet(db);
_cache = null;
toast(‘Matchday deleted.’, ‘info’);
loadAdmin();
}

// ── UI HELPERS ────────────────────────────────────────────────

function loadingHtml() {
return `<div class="loading"><div class="spinner"></div><br>Loading...</div>`;
}
function errorHtml() {
return `<div class="card tc tm" style="padding:2rem;">Connection error. Please refresh and try again.</div>`;
}
function emptyHtml(icon, title, sub) {
return `<div class="card tc" style="padding:3rem;">
<div style="font-size:2rem;margin-bottom:12px;">${icon}</div>
<div style="font-size:15px;font-weight:600;margin-bottom:6px;">${title}</div>
<div class="tm fs12">${sub}</div>

  </div>`;
}

// ── BOOT ──────────────────────────────────────────────────────

(async function init() {
// Set button labels for loading state
document.getElementById(‘li-btn’).dataset.label  = ‘Sign In’;
document.getElementById(‘rg-btn’).dataset.label  = ‘Create Account’;

const session = loadSession();
if (session) {
try {
const db = await dbGet();
const users = db.users || {};
const uData = users[session.username.toLowerCase()];
if (uData) {
currentUser = { username: uData.username, email: uData.email, isAdmin: uData.username.toLowerCase() === ADMIN_USER.toLowerCase() };
showApp();
return;
}
} catch(e) {}
clearSession();
}
showAuthTab(‘login’);
})();