// ═══════════════════════════════════════════════════════════════
// PSL5 PREDICTIONS — predictions.js
// ═══════════════════════════════════════════════════════════════
// Storage keys:
//   users           → { [username]: {username, email, passHash, isAdmin, joined} }
//   matchdays       → [ {id, title, status:‘open’|‘closed’|‘scored’, matches:[…]} ]
//   predictions     → { [username]: { [matchdayId]: { [matchId]: {hs,as,mvp} } } }
//   scores          → { [username]: {total, exact, result, mvp, breakdown:[]} }
// ═══════════════════════════════════════════════════════════════

const ADMIN_USER = ‘thanos’; // username that gets admin access

// PSL5 teams & players for MVP dropdown
const PSL5_TEAMS = [
‘BADiles’,‘Y&Y’,‘R1’,‘Basement Boys’,‘Volos Drummers’,‘Warriors’,
‘Midi Kidz’,‘Babiniotes’,‘Spasmena Mila’,‘Phoenix’,‘Snipers’,
‘Team Till Death’,‘A/C’,‘Fintani’,‘Axtarmades’,‘Chewbacca’,‘Hoopers’
];

const PSL5_PLAYERS = [
‘Dimitris Gavalas’,‘Thanos Chatziiordanou’,‘Giannis Akridas’,‘Giorgos Filippou’,
‘Iordanis Aslanis’,‘Spyros Koskinas’,‘Michalis Lerogiannis’,‘Nikolas Moschonas’,
‘Iasonas Miliaras’,‘Petros Papaspyropoulos’,‘Vasilis Tziovanis’,‘Giorgos Zacharopoulos’,
‘Stefanos Mavrogiannis’,‘Tzannis Mermigas’,‘Nikos Kalisperis’,‘Stavros Stavropoulos’,
‘Aleksandros Kalofolias’,‘Other / Unknown’
];

// ── STORAGE HELPERS ───────────────────────────────────────────

async function sGet(key) {
try {
const r = await window.storage.get(key, true);
return r ? JSON.parse(r.value) : null;
} catch { return null; }
}

async function sSet(key, val) {
try {
await window.storage.set(key, JSON.stringify(val), true);
return true;
} catch { return false; }
}

// ── SIMPLE HASH ────────────────────────────────────────────────

async function hashPass(pass) {
const buf = await crypto.subtle.digest(‘SHA-256’, new TextEncoder().encode(pass + ‘psl5salt’));
return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,‘0’)).join(’’);
}

// ── STATE ─────────────────────────────────────────────────────

let currentUser = null; // { username, email, isAdmin }

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
if (currentUser.isAdmin) document.getElementById(‘tab-admin’).style.display = ‘’;
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
const raw = document.getElementById(‘li-user’).value.trim();
const pass = document.getElementById(‘li-pass’).value;
const errEl = document.getElementById(‘li-err’);
errEl.classList.add(‘hidden’);

if (!raw || !pass) { errEl.textContent = ‘Please fill in all fields.’; errEl.classList.remove(‘hidden’); return; }

const users = await sGet(‘users’) || {};
// Find by username or email
const user = Object.values(users).find(u => u.username.toLowerCase() === raw.toLowerCase() || u.email.toLowerCase() === raw.toLowerCase());
if (!user) { errEl.textContent = ‘Account not found.’; errEl.classList.remove(‘hidden’); return; }

const hash = await hashPass(pass);
if (hash !== user.passHash) { errEl.textContent = ‘Incorrect password.’; errEl.classList.remove(‘hidden’); return; }

currentUser = { username: user.username, email: user.email, isAdmin: user.username.toLowerCase() === ADMIN_USER.toLowerCase() };
saveSession(currentUser);
showApp();
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
if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) { errEl.textContent = ‘Please enter a valid email.’; errEl.classList.remove(‘hidden’); return; }

const users = await sGet(‘users’) || {};
if (users[username.toLowerCase()]) { errEl.textContent = ‘Username already taken.’; errEl.classList.remove(‘hidden’); return; }
if (Object.values(users).find(u => u.email === email)) { errEl.textContent = ‘Email already registered.’; errEl.classList.remove(‘hidden’); return; }

const passHash = await hashPass(pass);
users[username.toLowerCase()] = { username, email, passHash, joined: new Date().toISOString() };
await sSet(‘users’, users);

currentUser = { username, email, isAdmin: username.toLowerCase() === ADMIN_USER.toLowerCase() };
saveSession(currentUser);
showApp();
toast(`Welcome, ${username}! 🎉`, ‘ok’);
}

async function doLogout() {
clearSession();
currentUser = null;
document.getElementById(‘screen-auth’).classList.remove(‘hidden’);
document.getElementById(‘screen-app’).classList.add(‘hidden’);
showAuthTab(‘login’);
}

// ── PREDICT TAB ───────────────────────────────────────────────

async function loadPredictTab() {
const el = document.getElementById(‘predict-content’);
el.innerHTML = ‘<div class="loading"><div class="spinner"></div><br>Loading matchdays…</div>’;

const matchdays = await sGet(‘matchdays’) || [];
const open = matchdays.filter(md => md.status === ‘open’);
const scored = matchdays.filter(md => md.status === ‘scored’);

if (!open.length && !scored.length) {
el.innerHTML = `<div class="card tc" style="padding:3rem;"> <div style="font-size:2rem;margin-bottom:12px;">⏳</div> <div style="font-size:15px;font-weight:600;margin-bottom:6px;">No open matchdays</div> <div class="tm fs12">Predictions aren't open yet. Check back soon!</div> </div>`;
return;
}

const allPreds = await sGet(‘predictions’) || {};
const myPreds = allPreds[currentUser.username.toLowerCase()] || {};

let html = ‘’;

// Open matchdays
if (open.length) {
html += `<div class="card-title" style="margin-bottom:8px;">🟢 Open for predictions</div>`;
open.forEach(md => {
const mdPreds = myPreds[md.id] || {};
const predicted = Object.keys(mdPreds).length;
const total = md.matches.length;
html += renderPredictMatchday(md, mdPreds, false);
html += `<div style="margin-bottom:1.5rem;"></div>`;
});
}

// Recently scored
if (scored.length) {
html += `<div class="card-title" style="margin-bottom:8px;margin-top:8px;">✅ Results in</div>`;
scored.slice().reverse().forEach(md => {
const mdPreds = myPreds[md.id] || {};
html += renderPredictMatchday(md, mdPreds, true);
html += `<div style="margin-bottom:1.5rem;"></div>`;
});
}

el.innerHTML = html;
}

function renderPredictMatchday(md, myPreds, isScored) {
const predicted = Object.keys(myPreds).length;
const total = md.matches.length;
const statusBadge = isScored
? `<span class="badge bg-green">Scored</span>`
: `<span class="badge bg-blue">Open · ${predicted}/${total} submitted</span>`;

let matchesHtml = md.matches.map(m => {
const pred = myPreds[m.id] || {};
if (isScored) {
return renderScoredMatch(m, pred, md);
}
return renderPredictMatch(m, pred, md.id);
}).join(’’);

const submitBtn = !isScored
? `<div style="padding:12px 16px;border-top:1px solid var(--border);"> <button class="btn btn-primary" onclick="submitPredictions('${md.id}')">Save Predictions</button> <span class="tm fs11" style="margin-left:10px;">Auto-saved as you type</span> </div>` : ‘’;

return `<div class="md-card">
<div class="md-header">
<div>
<div class="md-title">${md.title}</div>
<div class="tm fs11 mt8">${md.matches.length} matches</div>
</div>
${statusBadge}
</div>
<div class="md-body">${matchesHtml}</div>
${submitBtn}

  </div>`;
}

function renderPredictMatch(m, pred, mdId) {
const mvpOptions = PSL5_PLAYERS.map(p => `<option value="${p}" ${pred.mvp===p?'selected':''}>${p}</option>`).join(’’);
return `<div class="pred-match">
<div class="pred-teams">
<span class="pred-team right">${m.home}</span>
<span class="pred-vs">vs</span>
<span class="pred-team">${m.away}</span>
</div>
<div class="pred-inputs">
<input type="number" class="score-input" min="0" max="20" placeholder="—"
id="pred-hs-${m.id}" value="${pred.hs !== undefined ? pred.hs : ''}"
onchange="autosavePred('${mdId}','${m.id}')">
<span class="pred-dash">–</span>
<input type="number" class="score-input" min="0" max="20" placeholder="—"
id="pred-as-${m.id}" value="${pred.as !== undefined ? pred.as : ''}"
onchange="autosavePred('${mdId}','${m.id}')">
<span class="tm fs11" style="margin-left:6px;">MVP:</span>
<select id="pred-mvp-${m.id}" style="flex:1;font-size:12px;padding:6px 8px;"
onchange="autosavePred('${mdId}','${m.id}')">
<option value="">— Pick MVP —</option>
${mvpOptions}
</select>
</div>

  </div>`;
}

function renderScoredMatch(m, pred, md) {
if (!pred || pred.hs === undefined) {
return `<div class="pred-match"> <div class="pred-teams"> <span class="pred-team right">${m.home}</span> <span class="pred-vs">vs</span> <span class="pred-team">${m.away}</span> </div> <div class="pred-result mt8"> <span class="badge bg-muted">No prediction</span> <span class="actual-score">Result: ${m.hs}–${m.as}</span> </div> </div>`;
}

const pts = calcPoints(pred, m);
const ptsCls = pts >= 3 ? ‘pts-3’ : pts >= 1 ? ‘pts-1’ : ‘pts-0’;
const ptsLabel = pts === 0 ? ‘0 pts’ : `+${pts} pts`;
const breakdown = [];
if (pred.hs == m.hs && pred.as == m.as) breakdown.push(‘exact score ✓’);
else if (resultMatch(pred, m)) breakdown.push(‘correct result ✓’);
if (pred.mvp && m.mvp && pred.mvp === m.mvp) breakdown.push(‘MVP ✓’);

return `<div class="pred-match"> <div class="pred-teams"> <span class="pred-team right">${m.home}</span> <span class="pred-vs">vs</span> <span class="pred-team">${m.away}</span> </div> <div class="pred-result mt8"> <span class="pts-earned ${ptsCls}">${ptsLabel}</span> <span class="actual-score">Your pick: ${pred.hs}–${pred.as}${pred.mvp ? ` · MVP: ${pred.mvp}`: ''}</span> <span class="actual-score">Result: ${m.hs}–${m.as}${m.mvp ?` · MVP: ${m.mvp}`: ''}</span> </div> ${breakdown.length ?`<div class="fs11 ta mt8">${breakdown.join(’ · ’)}</div>` : ‘’}

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

async function autosavePred(mdId, matchId) {
const hs  = document.getElementById(`pred-hs-${matchId}`)?.value;
const as  = document.getElementById(`pred-as-${matchId}`)?.value;
const mvp = document.getElementById(`pred-mvp-${matchId}`)?.value;

const allPreds = await sGet(‘predictions’) || {};
const uKey = currentUser.username.toLowerCase();
if (!allPreds[uKey]) allPreds[uKey] = {};
if (!allPreds[uKey][mdId]) allPreds[uKey][mdId] = {};
allPreds[uKey][mdId][matchId] = {
hs: hs !== ‘’ ? parseInt(hs) : undefined,
as: as !== ‘’ ? parseInt(as) : undefined,
mvp: mvp || undefined,
};
await sSet(‘predictions’, allPreds);
}

async function submitPredictions(mdId) {
// Trigger save on all inputs for this matchday
const matchdays = await sGet(‘matchdays’) || [];
const md = matchdays.find(m => m.id === mdId);
if (!md) return;
for (const m of md.matches) {
await autosavePred(mdId, m.id);
}
toast(‘Predictions saved! ✅’, ‘ok’);
}

// ── LEADERBOARD ───────────────────────────────────────────────

async function loadLeaderboard() {
const lbEl = document.getElementById(‘lb-list’);
const myEl = document.getElementById(‘lb-my-stats’);

const scores = await computeAllScores();
const sorted = Object.values(scores).sort((a,b) => b.total - a.total);

if (!sorted.length) {
lbEl.innerHTML = `<div class="tc tm" style="padding:2rem;font-size:13px;">No scores yet. Predictions are still open!</div>`;
myEl.style.display = ‘none’;
return;
}

// My stats card
const myScore = scores[currentUser.username.toLowerCase()];
if (myScore) {
const myPos = sorted.findIndex(s => s.username.toLowerCase() === currentUser.username.toLowerCase()) + 1;
myEl.style.display = ‘’;
myEl.innerHTML = `<div class="card-title mb12">Your Stats</div> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;"> ${[{v:`#${myPos}`,l:'Rank'},{v:myScore.total,l:'Points'},{v:myScore.exact,l:'Exact'},{v:myScore.mvp,l:'MVPs'}] .map(x=>`<div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:8px;padding:10px 6px;">
<div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--text);">${x.v}</div>
<div class="tm fs11">${x.l}</div>
</div>`).join('')} </div>`;
} else {
myEl.style.display = ‘none’;
}

// Leaderboard list
const rankIcon = i => i===0?‘🥇’:i===1?‘🥈’:i===2?‘🥉’:’’;
const rankCls  = i => i===0?‘gold’:i===1?‘silver’:i===2?‘bronze’:’’;

lbEl.innerHTML = `<div class="card-title mb12">Season Standings</div>` +
sorted.map((s,i) => {
const isMe = s.username.toLowerCase() === currentUser.username.toLowerCase();
return `<div class="lb-row"> <div class="lb-rank ${rankCls(i)}">${rankIcon(i)||i+1}</div> <div class="f1"> <div class="lb-name ${isMe?'me':''}">${s.username}${isMe?' (you)':''}</div> <div class="lb-breakdown">${s.exact} exact · ${s.result} results · ${s.mvp} MVPs</div> </div> <div class="lb-pts">${s.total}<span class="tm" style="font-size:11px;"> pts</span></div> </div>`;
}).join(’’);
}

async function computeAllScores() {
const matchdays  = await sGet(‘matchdays’) || [];
const allPreds   = await sGet(‘predictions’) || {};
const scored     = matchdays.filter(md => md.status === ‘scored’);
const scores     = {};

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
// Get display username
const users = await sGet(‘users’) || {};
const uData = users[uKey];
scores[uKey] = { username: uData?.username || uKey, total, exact, result, mvp };
}
return scores;
}

// ── MY PICKS ──────────────────────────────────────────────────

async function loadMyPicks() {
const el = document.getElementById(‘my-picks-content’);
const matchdays = await sGet(‘matchdays’) || [];
const allPreds  = await sGet(‘predictions’) || {};
const myPreds   = allPreds[currentUser.username.toLowerCase()] || {};
const scored    = matchdays.filter(md => md.status === ‘scored’);
const open      = matchdays.filter(md => md.status === ‘open’);

if (!Object.keys(myPreds).length) {
el.innerHTML = `<div class="card tc" style="padding:3rem;"> <div style="font-size:2rem;margin-bottom:12px;">🎯</div> <div style="font-size:15px;font-weight:600;margin-bottom:6px;">No predictions yet</div> <div class="tm fs12">Head to the Predict tab to make your picks!</div> </div>`;
return;
}

let html = ‘’;
let grandTotal = 0;

// Scored matchdays
scored.forEach(md => {
const mdPreds = myPreds[md.id];
if (!mdPreds) return;
let mdPts = 0;
let rows = md.matches.map(m => {
const pred = mdPreds[m.id];
if (!pred || pred.hs === undefined) return `<div class="stat-row-mini"><span class="tm fs12">${m.home} vs ${m.away}</span><span class="badge bg-muted">Skipped</span></div>`;
const pts = calcPoints(pred, m);
mdPts += pts;
grandTotal += pts;
const ptsCls = pts >= 3 ? ‘bg-green’ : pts >= 1 ? ‘bg-gold’ : ‘bg-muted’;
return `<div class="stat-row-mini"> <div> <div class="fs12 fw6">${m.home} vs ${m.away}</div> <div class="tm" style="font-size:11px;">Your pick: ${pred.hs}–${pred.as}${pred.mvp?` · ${pred.mvp}`:''} · Result: ${m.hs}–${m.as}</div> </div> <span class="badge ${ptsCls}">${pts>0?'+':''}${pts} pts</span> </div>`;
}).join(’’);
html += `<div class="card mb12"> <div class="flex jb ac mb12"> <div class="card-title" style="margin:0;">${md.title}</div> <span class="badge bg-green">+${mdPts} pts</span> </div> ${rows} </div>`;
});

// Open matchdays with predictions
open.forEach(md => {
const mdPreds = myPreds[md.id];
if (!mdPreds) return;
const rows = md.matches.map(m => {
const pred = mdPreds[m.id];
if (!pred || pred.hs === undefined) return `<div class="stat-row-mini"><span class="tm fs12">${m.home} vs ${m.away}</span><span class="tm fs11">No pick yet</span></div>`;
return `<div class="stat-row-mini"> <div class="fs12 fw6">${m.home} vs ${m.away}</div> <span class="tm fs11">${pred.hs}–${pred.as}${pred.mvp?` · MVP: ${pred.mvp}`:''}</span> </div>`;
}).join(’’);
html += `<div class="card mb12"> <div class="flex jb ac mb12"> <div class="card-title" style="margin:0;">${md.title}</div> <span class="badge bg-blue">Awaiting result</span> </div> ${rows} </div>`;
});

el.innerHTML = `<div class="card mb16" style="text-align:center;padding:1.25rem;">
<div style="font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--gold);">${grandTotal}</div>
<div class="tm fs12">Total Points Earned</div>

  </div>${html}`;
}

// ── ADMIN ─────────────────────────────────────────────────────

async function loadAdmin() {
if (!currentUser.isAdmin) return;
const el = document.getElementById(‘admin-content’);
const matchdays = await sGet(‘matchdays’) || [];

if (!matchdays.length) {
el.innerHTML = `<div class="card tc tm" style="padding:2rem;font-size:13px;">No matchdays yet. Click "+ New Matchday" to create one.</div>`;
return;
}

let html = ‘’;
matchdays.slice().reverse().forEach(md => {
const statusBadge = md.status === ‘open’ ? ‘bg-blue’ : md.status === ‘scored’ ? ‘bg-green’ : ‘bg-muted’;
const statusLabel = md.status === ‘open’ ? ‘Open’ : md.status === ‘scored’ ? ‘Scored’ : ‘Closed’;

```
let matchRows = md.matches.map(m => {
  const resultInputs = md.status !== 'scored'
    ? `<div class="admin-score-inputs">
        <input type="number" min="0" max="30" placeholder="—" id="res-hs-${m.id}" value="${m.hs !== null ? m.hs : ''}" style="width:48px!important;text-align:center;padding:6px 4px!important;">
        <span class="tm">–</span>
        <input type="number" min="0" max="30" placeholder="—" id="res-as-${m.id}" value="${m.as !== null ? m.as : ''}" style="width:48px!important;text-align:center;padding:6px 4px!important;">
        <select id="res-mvp-${m.id}" style="flex:1;min-width:120px;font-size:12px;padding:5px 8px;">
          <option value="">— MVP —</option>
          ${PSL5_PLAYERS.map(p=>`<option value="${p}" ${m.mvp===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>`
    : `<span class="score-pill">${m.hs}–${m.as}</span><span class="tm fs11" style="margin-left:8px;">${m.mvp||''}</span>`;

  return `<div class="admin-match-row">
    <div class="admin-teams">${m.home} <span class="tm">vs</span> ${m.away}</div>
    ${resultInputs}
  </div>`;
}).join('');

const actionBtns = md.status === 'closed'
  ? `<button class="btn btn-primary btn-sm" onclick="adminSetStatus('${md.id}','open')">Open Predictions</button>
     <button class="btn btn-outline btn-sm" onclick="adminEnterResults('${md.id}')">Enter Results & Score</button>`
  : md.status === 'open'
  ? `<button class="btn btn-danger btn-sm" onclick="adminSetStatus('${md.id}','closed')">Close Predictions</button>
     <button class="btn btn-outline btn-sm" onclick="adminEnterResults('${md.id}')">Enter Results & Score</button>`
  : `<span class="tm fs12">Scoring complete</span>`;

html += `<div class="card mb16">
  <div class="flex jb ac mb12">
    <div>
      <div style="font-size:15px;font-weight:600;">${md.title}</div>
      <div class="tm fs11 mt8">${md.matches.length} matches</div>
    </div>
    <div class="flex gap8 ac flex-wrap">
      <span class="badge ${statusBadge}">${statusLabel}</span>
      <button class="btn btn-danger btn-sm" onclick="adminDeleteMatchday('${md.id}')">Delete</button>
    </div>
  </div>
  <div class="admin-section">${matchRows}</div>
  <div class="flex gap8" style="flex-wrap:wrap;">${actionBtns}</div>
</div>`;
```

});

el.innerHTML = html;
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

const matchdays = await sGet(‘matchdays’) || [];
matchdays.push({ id: `md_${Date.now()}`, title: title.trim(), status: ‘closed’, matches });
await sSet(‘matchdays’, matchdays);
toast(‘Matchday created!’, ‘ok’);
loadAdmin();
}

async function adminSetStatus(mdId, status) {
const matchdays = await sGet(‘matchdays’) || [];
const md = matchdays.find(m => m.id === mdId);
if (!md) return;
md.status = status;
await sSet(‘matchdays’, matchdays);
toast(`Matchday is now ${status}.`, ‘ok’);
loadAdmin();
}

async function adminEnterResults(mdId) {
const matchdays = await sGet(‘matchdays’) || [];
const md = matchdays.find(m => m.id === mdId);
if (!md) return;

let allFilled = true;
md.matches.forEach(m => {
const hs  = document.getElementById(`res-hs-${m.id}`)?.value;
const as  = document.getElementById(`res-as-${m.id}`)?.value;
const mvp = document.getElementById(`res-mvp-${m.id}`)?.value;
if (hs === ‘’ || as === ‘’) { allFilled = false; return; }
m.hs  = parseInt(hs);
m.as  = parseInt(as);
m.mvp = mvp || null;
});

if (!allFilled) { toast(‘Please fill in all scores first.’, ‘err’); return; }

md.status = ‘scored’;
await sSet(‘matchdays’, matchdays);
toast(‘Results saved and matchday scored! ✅’, ‘ok’);
loadAdmin();
// Refresh leaderboard if visible
const lbTab = document.getElementById(‘tab-leaderboard’);
if (!lbTab.classList.contains(‘hidden’)) loadLeaderboard();
}

async function adminDeleteMatchday(mdId) {
if (!confirm(‘Delete this matchday? This cannot be undone.’)) return;
let matchdays = await sGet(‘matchdays’) || [];
matchdays = matchdays.filter(m => m.id !== mdId);
await sSet(‘matchdays’, matchdays);
toast(‘Matchday deleted.’, ‘info’);
loadAdmin();
}

// ── BOOT ──────────────────────────────────────────────────────

(async function init() {
const session = loadSession();
if (session) {
// Verify account still exists
const users = await sGet(‘users’) || {};
const uData = users[session.username.toLowerCase()];
if (uData) {
currentUser = {
username: uData.username,
email: uData.email,
isAdmin: uData.username.toLowerCase() === ADMIN_USER.toLowerCase()
};
showApp();
return;
}
}
showAuthTab(‘login’);
})();