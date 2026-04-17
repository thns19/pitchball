// ═══════════════════════════════════════════════════════════════
// PSL SHARED AUTH — auth.js
// Include on every page. Renders a floating account widget.
// Shares the same JSONBin as predictions.
// ═══════════════════════════════════════════════════════════════

const PSL_BIN_ID  = ‘69e085bdaaba88219704f684‘;
const PSL_API_KEY = ’$2a$10$H0dlnXhL4nHxUrqvqIuX.uWVleB8A4engDopnjE.WngFBheJW.1gu‘;
const PSL_BIN_URL = `https://api.jsonbin.io/v3/b/${PSL_BIN_ID}`;
const PSL_ADMIN   = ‘thanos’;
const REACTIONS   = [‘❤️’,‘🥎’,‘🔥’,‘😂’,‘💥’,‘😭’,‘👏’];

// ── DB cache ──────────────────────────────────────────────────
let _pslDbCache = null;
let _pslDbFetching = null;

async function pslDbGet() {
if (_pslDbCache) return _pslDbCache;
if (_pslDbFetching) return _pslDbFetching;
_pslDbFetching = fetch(`${PSL_BIN_URL}/latest`, {
headers: { ‘X-Master-Key’: PSL_API_KEY }
}).then(r => r.json()).then(j => {
_pslDbCache = j.record;
_pslDbFetching = null;
return _pslDbCache;
});
return _pslDbFetching;
}

async function pslDbSet(data) {
_pslDbCache = data;
await fetch(PSL_BIN_URL, {
method: ‘PUT’,
headers: { ‘Content-Type’: ‘application/json’, ‘X-Master-Key’: PSL_API_KEY },
body: JSON.stringify(data)
});
}

function pslDbInvalidate() { _pslDbCache = null; }

// ── Session ───────────────────────────────────────────────────
let pslCurrentUser = null;

function pslLoadSession() {
const s = localStorage.getItem(‘psl_session’);
return s ? JSON.parse(s) : null;
}
function pslSaveSession(u) { localStorage.setItem(‘psl_session’, JSON.stringify(u)); }
function pslClearSession() { localStorage.removeItem(‘psl_session’); }

async function pslHashPass(pass) {
const buf = await crypto.subtle.digest(‘SHA-256’, new TextEncoder().encode(pass + ‘psl5salt’));
return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,‘0’)).join(’’);
}

// ── Auth widget styles ────────────────────────────────────────
function injectAuthStyles() {
if (document.getElementById(‘psl-auth-styles’)) return;
const s = document.createElement(‘style’);
s.id = ‘psl-auth-styles’;
s.textContent = `
#psl-auth-widget{
position:fixed;top:12px;right:14px;z-index:9999;
font-family:‘DM Sans’,system-ui,sans-serif;
}
.psl-aw-btn{
display:flex;align-items:center;gap:7px;
background:rgba(30,32,20,0.92);
border:1px solid rgba(215,219,200,0.18);
border-radius:20px;padding:6px 12px 6px 8px;
cursor:pointer;backdrop-filter:blur(8px);
transition:border-color 0.15s;
font-size:12px;color:#D7DBC8;font-weight:500;
}
.psl-aw-btn:hover{border-color:rgba(57,200,119,0.5);}
.psl-aw-avatar{
width:22px;height:22px;border-radius:50%;
background:#39c877;display:flex;align-items:center;
justify-content:center;font-size:11px;font-weight:700;color:#000;
flex-shrink:0;
}
.psl-aw-avatar.guest{background:rgba(215,219,200,0.2);color:#D7DBC8;font-size:13px;}

```
/* dropdown */
.psl-aw-drop{
  position:absolute;top:calc(100% + 8px);right:0;
  background:#2a3018;border:1px solid rgba(215,219,200,0.15);
  border-radius:12px;overflow:hidden;min-width:220px;
  box-shadow:0 8px 32px rgba(0,0,0,0.4);
  display:none;
}
.psl-aw-drop.open{display:block;}
.psl-aw-drop-header{
  padding:12px 14px;border-bottom:1px solid rgba(215,219,200,0.1);
  font-size:12px;color:rgba(215,219,200,0.5);
}
.psl-aw-drop-header strong{display:block;font-size:14px;color:#D7DBC8;margin-bottom:1px;}
.psl-aw-drop-item{
  display:block;width:100%;padding:11px 14px;
  font-size:13px;font-weight:500;color:#D7DBC8;
  background:none;border:none;cursor:pointer;text-align:left;
  transition:background 0.1s;font-family:inherit;text-decoration:none;
}
.psl-aw-drop-item:hover{background:rgba(215,219,200,0.06);}
.psl-aw-drop-item.danger{color:#e74c3c;}
.psl-aw-drop-item.danger:hover{background:rgba(231,76,60,0.08);}
.psl-aw-divider{border:none;border-top:1px solid rgba(215,219,200,0.08);margin:2px 0;}

/* auth modal */
.psl-modal-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.65);
  z-index:10000;display:flex;align-items:center;justify-content:center;
  padding:1rem;backdrop-filter:blur(3px);
}
.psl-modal{
  background:#2a3018;border:1px solid rgba(215,219,200,0.15);
  border-radius:16px;width:100%;max-width:380px;overflow:hidden;
}
.psl-modal-hd{
  padding:1.25rem 1.5rem;border-bottom:1px solid rgba(215,219,200,0.1);
  display:flex;align-items:center;justify-content:space-between;
}
.psl-modal-title{font-size:16px;font-weight:600;color:#D7DBC8;}
.psl-modal-close{
  background:none;border:none;color:rgba(215,219,200,0.4);
  cursor:pointer;font-size:20px;line-height:1;padding:2px;font-family:inherit;
}
.psl-modal-close:hover{color:#D7DBC8;}
.psl-modal-bd{padding:1.5rem;}
.psl-form-group{margin-bottom:14px;}
.psl-label{font-size:12px;color:rgba(215,219,200,0.5);margin-bottom:5px;display:block;font-weight:500;}
.psl-input{
  width:100%;background:rgba(215,219,200,0.06);
  border:1px solid rgba(215,219,200,0.18);color:#D7DBC8;
  border-radius:8px;padding:9px 12px;font-size:13px;
  font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;
}
.psl-input:focus{outline:none;border-color:#39c877;}
.psl-input::placeholder{color:rgba(215,219,200,0.3);}
.psl-btn-primary{
  width:100%;padding:10px;background:#39c877;color:#000;
  border:none;border-radius:8px;font-size:13px;font-weight:700;
  cursor:pointer;font-family:inherit;transition:background 0.15s;
}
.psl-btn-primary:hover{background:#2fb366;}
.psl-btn-primary:disabled{opacity:0.4;cursor:not-allowed;}
.psl-err{font-size:11px;color:#e74c3c;margin-top:6px;}
.psl-switch{font-size:12px;color:rgba(215,219,200,0.4);text-align:center;margin-top:12px;}
.psl-switch a{color:#39c877;cursor:pointer;}
.psl-tabs{display:flex;margin-bottom:1.5rem;background:rgba(215,219,200,0.06);
  border-radius:8px;padding:3px;gap:3px;}
.psl-tab{flex:1;padding:7px;border:none;background:none;border-radius:6px;
  font-size:12px;font-weight:600;color:rgba(215,219,200,0.4);cursor:pointer;font-family:inherit;transition:all 0.15s;}
.psl-tab.active{background:#39c877;color:#000;}
```

`;
document.head.appendChild(s);
}

// ── Widget HTML ───────────────────────────────────────────────
function renderWidget() {
const existing = document.getElementById(‘psl-auth-widget’);
if (existing) existing.remove();

const w = document.createElement(‘div’);
w.id = ‘psl-auth-widget’;

if (pslCurrentUser) {
const initial = pslCurrentUser.username[0].toUpperCase();
w.innerHTML = ` <div class="psl-aw-btn" onclick="pslToggleDrop()"> <div class="psl-aw-avatar">${initial}</div> <span>${pslCurrentUser.username}</span> <span style="color:rgba(215,219,200,0.35);font-size:10px;">▾</span> </div> <div class="psl-aw-drop" id="psl-aw-drop"> <div class="psl-aw-drop-header"> <strong>${pslCurrentUser.username}</strong> ${pslCurrentUser.isAdmin ? '<span style="color:#39c877;font-size:10px;">⚡ Admin</span>' : ''} ${pslCurrentUser.email} </div> <a href="/psl5/predindex.html" class="psl-aw-drop-item">🎯 Predictions</a> <hr class="psl-aw-divider"> <button class="psl-aw-drop-item danger" onclick="pslLogout()">Sign out</button> </div>`;
} else {
w.innerHTML = ` <div class="psl-aw-btn" onclick="pslOpenAuth('login')"> <div class="psl-aw-avatar guest">👤</div> <span>Sign in</span> </div>`;
}

document.body.appendChild(w);

// Close dropdown when clicking outside
document.addEventListener(‘click’, e => {
if (!w.contains(e.target)) {
const drop = document.getElementById(‘psl-aw-drop’);
if (drop) drop.classList.remove(‘open’);
}
}, { capture: true });
}

function pslToggleDrop() {
document.getElementById(‘psl-aw-drop’)?.classList.toggle(‘open’);
}

// ── Auth modal ────────────────────────────────────────────────
let _authModal = null;

function pslOpenAuth(tab=‘login’) {
if (_authModal) _authModal.remove();
const overlay = document.createElement(‘div’);
overlay.className = ‘psl-modal-overlay’;
overlay.id = ‘psl-auth-modal’;
overlay.innerHTML = `
<div class="psl-modal">
<div class="psl-modal-hd">
<div class="psl-modal-title">PSL Account</div>
<button class="psl-modal-close" onclick="pslCloseAuth()">×</button>
</div>
<div class="psl-modal-bd">
<div class="psl-tabs">
<button class="psl-tab ${tab==='login'?'active':''}" onclick="pslSwitchTab('login')">Sign In</button>
<button class="psl-tab ${tab==='register'?'active':''}" onclick="pslSwitchTab('register')">Register</button>
</div>

```
    <!-- Login -->
    <div id="psl-tab-login" ${tab!=='login'?'style="display:none"':''}>
      <div class="psl-form-group">
        <label class="psl-label">Username or Email</label>
        <input class="psl-input" id="psl-li-user" placeholder="Enter username or email" autocomplete="username">
      </div>
      <div class="psl-form-group">
        <label class="psl-label">Password</label>
        <input class="psl-input" id="psl-li-pass" type="password" placeholder="Enter password" autocomplete="current-password">
      </div>
      <div class="psl-err" id="psl-li-err" style="display:none"></div>
      <button class="psl-btn-primary" id="psl-li-btn" onclick="pslDoLogin()">Sign In</button>
    </div>

    <!-- Register -->
    <div id="psl-tab-register" ${tab!=='register'?'style="display:none"':''}>
      <div class="psl-form-group">
        <label class="psl-label">Username</label>
        <input class="psl-input" id="psl-rg-user" placeholder="Choose a username" maxlength="20" autocomplete="username">
      </div>
      <div class="psl-form-group">
        <label class="psl-label">Email</label>
        <input class="psl-input" id="psl-rg-email" type="email" placeholder="your@email.com" autocomplete="email">
      </div>
      <div class="psl-form-group">
        <label class="psl-label">Password</label>
        <input class="psl-input" id="psl-rg-pass" type="password" placeholder="Min. 6 characters" autocomplete="new-password">
      </div>
      <div class="psl-err" id="psl-rg-err" style="display:none"></div>
      <button class="psl-btn-primary" id="psl-rg-btn" onclick="pslDoRegister()">Create Account</button>
    </div>
  </div>
</div>`;
```

overlay.addEventListener(‘click’, e => { if(e.target===overlay) pslCloseAuth(); });
document.body.appendChild(overlay);
_authModal = overlay;

// Enter key support
overlay.addEventListener(‘keydown’, e => {
if(e.key===‘Enter’) {
if(document.getElementById(‘psl-tab-login’).style.display!==‘none’) pslDoLogin();
else pslDoRegister();
}
});
}

function pslCloseAuth() { _authModal?.remove(); _authModal=null; }

function pslSwitchTab(tab) {
document.getElementById(‘psl-tab-login’).style.display  = tab===‘login’?’’:‘none’;
document.getElementById(‘psl-tab-register’).style.display = tab===‘register’?’’:‘none’;
document.querySelectorAll(’.psl-tab’).forEach((b,i)=>b.classList.toggle(‘active’,i===(tab===‘login’?0:1)));
}

async function pslDoLogin() {
const raw  = document.getElementById(‘psl-li-user’).value.trim();
const pass = document.getElementById(‘psl-li-pass’).value;
const errEl = document.getElementById(‘psl-li-err’);
errEl.style.display=‘none’;
if(!raw||!pass){errEl.textContent=‘Please fill in all fields.’;errEl.style.display=‘block’;return;}
const btn=document.getElementById(‘psl-li-btn’);
btn.disabled=true;btn.textContent=‘Signing in…’;
try{
const db=await pslDbGet();
const users=db.users||{};
const user=Object.values(users).find(u=>
u.username.toLowerCase()===raw.toLowerCase()||u.email.toLowerCase()===raw.toLowerCase()
);
if(!user){errEl.textContent=‘Account not found.’;errEl.style.display=‘block’;return;}
const hash=await pslHashPass(pass);
if(hash!==user.passHash){errEl.textContent=‘Incorrect password.’;errEl.style.display=‘block’;return;}
pslCurrentUser={username:user.username,email:user.email,isAdmin:user.username.toLowerCase()===PSL_ADMIN};
pslSaveSession(pslCurrentUser);
pslCloseAuth();
renderWidget();
if(typeof onPslLogin===‘function’) onPslLogin(pslCurrentUser);
}catch(e){errEl.textContent=‘Connection error. Try again.’;errEl.style.display=‘block’;}
finally{btn.disabled=false;btn.textContent=‘Sign In’;}
}

async function pslDoRegister() {
const username = document.getElementById(‘psl-rg-user’).value.trim();
const email    = document.getElementById(‘psl-rg-email’).value.trim().toLowerCase();
const pass     = document.getElementById(‘psl-rg-pass’).value;
const errEl    = document.getElementById(‘psl-rg-err’);
errEl.style.display=‘none’;
if(!username||!email||!pass){errEl.textContent=‘Please fill in all fields.’;errEl.style.display=‘block’;return;}
if(username.length<2){errEl.textContent=‘Username must be at least 2 characters.’;errEl.style.display=‘block’;return;}
if(pass.length<6){errEl.textContent=‘Password must be at least 6 characters.’;errEl.style.display=‘block’;return;}
if(!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){errEl.textContent=‘Enter a valid email.’;errEl.style.display=‘block’;return;}
const btn=document.getElementById(‘psl-rg-btn’);
btn.disabled=true;btn.textContent=‘Creating account…’;
try{
const db=await pslDbGet();
const users=db.users||{};
if(users[username.toLowerCase()]){errEl.textContent=‘Username already taken.’;errEl.style.display=‘block’;return;}
if(Object.values(users).find(u=>u.email===email)){errEl.textContent=‘Email already registered.’;errEl.style.display=‘block’;return;}
const passHash=await pslHashPass(pass);
users[username.toLowerCase()]={username,email,passHash,joined:new Date().toISOString()};
await pslDbSet({…db,users});
pslDbInvalidate();
pslCurrentUser={username,email,isAdmin:username.toLowerCase()===PSL_ADMIN};
pslSaveSession(pslCurrentUser);
pslCloseAuth();
renderWidget();
if(typeof onPslLogin===‘function’) onPslLogin(pslCurrentUser);
}catch(e){errEl.textContent=‘Connection error. Try again.’;errEl.style.display=‘block’;}
finally{btn.disabled=false;btn.textContent=‘Create Account’;}
}

function pslLogout() {
pslClearSession();
pslCurrentUser=null;
pslDbInvalidate();
renderWidget();
if(typeof onPslLogout===‘function’) onPslLogout();
}

// ── Boot ──────────────────────────────────────────────────────
(async function pslAuthInit(){
injectAuthStyles();
const session=pslLoadSession();
if(session){
try{
const db=await pslDbGet();
const uData=(db.users||{})[session.username.toLowerCase()];
if(uData){
pslCurrentUser={username:uData.username,email:uData.email,isAdmin:uData.username.toLowerCase()===PSL_ADMIN};
pslSaveSession(pslCurrentUser);
} else { pslClearSession(); }
}catch(e){ pslCurrentUser=session; } // offline fallback
}
renderWidget();
if(pslCurrentUser&&typeof onPslLogin===‘function’) onPslLogin(pslCurrentUser);
})();