// ═══════════════════════════════════════════════════════════════
// PSL COMMENTS — comments.js
// Requires auth.js to be loaded first.
// Usage: pslInitComments(‘matchId’, document.getElementById(‘comments-mount’))
// ═══════════════════════════════════════════════════════════════

function injectCommentStyles() {
if (document.getElementById(‘psl-comment-styles’)) return;
const s = document.createElement(‘style’);
s.id = ‘psl-comment-styles’;
s.textContent = `
.psl-comments{font-family:‘DM Sans’,system-ui,sans-serif;margin-top:2rem;}
.psl-comments-title{
font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;
color:rgba(215,219,200,0.4);margin-bottom:1rem;
padding-bottom:8px;border-bottom:1px solid rgba(215,219,200,0.1);
display:flex;align-items:center;gap:8px;
}
.psl-comments-count{
background:rgba(57,200,119,0.15);color:#39c877;
border-radius:10px;padding:1px 8px;font-size:10px;
}

```
/* compose box */
.psl-compose{
  background:rgba(215,219,200,0.04);border:1px solid rgba(215,219,200,0.12);
  border-radius:12px;padding:12px;margin-bottom:1.25rem;
}
.psl-compose-inner{display:flex;gap:10px;align-items:flex-start;}
.psl-compose-avatar{
  width:28px;height:28px;border-radius:50%;background:#39c877;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:#000;flex-shrink:0;margin-top:2px;
}
.psl-compose-avatar.guest{background:rgba(215,219,200,0.15);color:rgba(215,219,200,0.4);font-size:14px;}
.psl-compose-right{flex:1;min-width:0;}
.psl-compose-input{
  width:100%;background:transparent;border:none;color:#D7DBC8;
  font-size:13px;font-family:inherit;resize:none;outline:none;
  min-height:36px;max-height:120px;line-height:1.5;
}
.psl-compose-input::placeholder{color:rgba(215,219,200,0.3);}
.psl-compose-footer{display:flex;justify-content:flex-end;margin-top:8px;}
.psl-submit-btn{
  background:#39c877;color:#000;border:none;border-radius:8px;
  padding:6px 16px;font-size:12px;font-weight:700;cursor:pointer;
  font-family:inherit;transition:background 0.15s;
}
.psl-submit-btn:hover{background:#2fb366;}
.psl-submit-btn:disabled{opacity:0.4;cursor:not-allowed;}
.psl-login-prompt{
  font-size:13px;color:rgba(215,219,200,0.4);
  display:flex;align-items:center;gap:8px;
}
.psl-login-prompt a{color:#39c877;cursor:pointer;text-decoration:none;}
.psl-login-prompt a:hover{text-decoration:underline;}

/* comment */
.psl-comment{
  display:flex;gap:10px;padding:12px 0;
  border-bottom:1px solid rgba(215,219,200,0.06);
}
.psl-comment:last-child{border-bottom:none;}
.psl-c-avatar{
  width:28px;height:28px;border-radius:50%;background:#39c877;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:#000;flex-shrink:0;
}
.psl-c-body{flex:1;min-width:0;}
.psl-c-header{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;}
.psl-c-user{font-size:13px;font-weight:600;color:#D7DBC8;}
.psl-c-user.admin-user::after{content:'⚡';margin-left:3px;font-size:10px;color:#39c877;}
.psl-c-time{font-size:11px;color:rgba(215,219,200,0.35);}
.psl-c-text{font-size:13px;color:rgba(215,219,200,0.85);line-height:1.55;word-break:break-word;}
.psl-c-actions{display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap;}
.psl-react-btn{
  display:flex;align-items:center;gap:4px;
  background:rgba(215,219,200,0.06);border:1px solid rgba(215,219,200,0.1);
  border-radius:20px;padding:3px 9px;font-size:12px;cursor:pointer;
  transition:all 0.15s;color:#D7DBC8;font-family:inherit;
}
.psl-react-btn:hover{background:rgba(215,219,200,0.12);border-color:rgba(215,219,200,0.25);}
.psl-react-btn.reacted{background:rgba(57,200,119,0.12);border-color:rgba(57,200,119,0.3);color:#39c877;}
.psl-react-count{font-size:11px;font-weight:600;}
.psl-reply-btn{
  font-size:12px;color:rgba(215,219,200,0.4);background:none;border:none;
  cursor:pointer;font-family:inherit;padding:3px 6px;border-radius:6px;
  transition:color 0.15s;
}
.psl-reply-btn:hover{color:#39c877;}
.psl-delete-btn{
  font-size:11px;color:rgba(231,76,60,0.5);background:none;border:none;
  cursor:pointer;font-family:inherit;padding:3px 6px;border-radius:6px;
  transition:color 0.15s;margin-left:auto;
}
.psl-delete-btn:hover{color:#e74c3c;}

/* reaction picker */
.psl-react-picker{
  display:none;position:absolute;
  background:#2a3018;border:1px solid rgba(215,219,200,0.15);
  border-radius:20px;padding:6px 10px;
  box-shadow:0 4px 20px rgba(0,0,0,0.4);
  z-index:100;gap:6px;flex-wrap:nowrap;
}
.psl-react-picker.open{display:flex;}
.psl-react-pick-btn{
  font-size:18px;background:none;border:none;cursor:pointer;
  border-radius:8px;padding:3px 5px;transition:transform 0.1s;line-height:1;
}
.psl-react-pick-btn:hover{transform:scale(1.3);}
.psl-react-wrap{position:relative;display:inline-block;}

/* replies */
.psl-replies{margin-top:10px;margin-left:38px;border-left:2px solid rgba(215,219,200,0.08);padding-left:12px;}
.psl-reply-compose{margin-top:10px;margin-left:38px;}
.psl-reply-input-wrap{display:flex;gap:8px;align-items:flex-start;}
.psl-reply-input{
  flex:1;background:rgba(215,219,200,0.06);border:1px solid rgba(215,219,200,0.15);
  color:#D7DBC8;border-radius:8px;padding:7px 10px;font-size:12px;font-family:inherit;
  resize:none;outline:none;transition:border-color 0.15s;
}
.psl-reply-input:focus{border-color:#39c877;}
.psl-reply-submit{
  background:#39c877;color:#000;border:none;border-radius:8px;
  padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;
  font-family:inherit;flex-shrink:0;
}
.psl-reply-submit:disabled{opacity:0.4;cursor:not-allowed;}
.psl-show-replies-btn{
  font-size:12px;color:#39c877;background:none;border:none;cursor:pointer;
  font-family:inherit;padding:4px 0;margin-top:4px;
}

/* empty / loading */
.psl-comments-empty{font-size:13px;color:rgba(215,219,200,0.3);padding:1.5rem 0;text-align:center;}
.psl-comments-loading{font-size:13px;color:rgba(215,219,200,0.3);padding:1rem 0;text-align:center;}
```

`;
document.head.appendChild(s);
}

// ── Time formatting ───────────────────────────────────────────
function pslTimeAgo(iso) {
const diff = Date.now() - new Date(iso).getTime();
const m = Math.floor(diff/60000);
if(m<1)  return ‘just now’;
if(m<60) return `${m}m ago`;
const h=Math.floor(m/60);
if(h<24) return `${h}h ago`;
const d=Math.floor(h/24);
if(d<7)  return `${d}d ago`;
return new Date(iso).toLocaleDateString(‘en-GB’,{day:‘numeric’,month:‘short’});
}

// ── Avatar color ──────────────────────────────────────────────
const AVATAR_COLORS=[’#39c877’,’#f5c842’,’#5dade2’,’#e74c3c’,’#c084fc’,’#f39c12’,’#1abc9c’];
function avatarColor(name) {
let h=0; for(const c of name) h=(h*31+c.charCodeAt(0))&0xffffffff;
return AVATAR_COLORS[Math.abs(h)%AVATAR_COLORS.length];
}

// ── Main init ─────────────────────────────────────────────────
async function pslInitComments(matchId, mountEl) {
if(!mountEl) return;
injectCommentStyles();
mountEl.innerHTML = `<div class="psl-comments"><div class="psl-comments-loading">Loading comments...</div></div>`;

let db, comments;
try {
db = await pslDbGet();
comments = (db.comments || {})[matchId] || [];
} catch(e) {
mountEl.innerHTML = `<div class="psl-comments"><div class="psl-comments-empty">Could not load comments.</div></div>`;
return;
}

renderComments(matchId, mountEl, comments);
}

function renderComments(matchId, mountEl, comments) {
const count = comments.length + comments.reduce((s,c)=>s+(c.replies||[]).length,0);
const user  = pslCurrentUser;

let composeHtml;
if(user) {
const col = avatarColor(user.username);
composeHtml = `<div class="psl-compose"> <div class="psl-compose-inner"> <div class="psl-compose-avatar" style="background:${col}">${user.username[0].toUpperCase()}</div> <div class="psl-compose-right"> <textarea class="psl-compose-input" id="psl-new-comment" placeholder="Share your thoughts on this match..." rows="2"></textarea> <div class="psl-compose-footer"> <button class="psl-submit-btn" onclick="pslPostComment('${matchId}')">Post</button> </div> </div> </div> </div>`;
} else {
composeHtml = `<div class="psl-compose"> <div class="psl-login-prompt"> <div class="psl-compose-avatar guest">👤</div> <span><a onclick="pslOpenAuth('login')">Sign in</a> or <a onclick="pslOpenAuth('register')">register</a> to comment</span> </div> </div>`;
}

const commentsHtml = comments.length
? comments.map(c => renderComment(matchId, c, false)).join(’’)
: `<div class="psl-comments-empty">No comments yet. Be the first!</div>`;

mountEl.innerHTML = `<div class="psl-comments">
<div class="psl-comments-title">
Comments
<span class="psl-comments-count">${count}</span>
</div>
${composeHtml}
<div id="psl-comments-list">${commentsHtml}</div>

  </div>`;
}

function renderComment(matchId, c, isReply) {
const user  = pslCurrentUser;
const col   = avatarColor(c.user);
const isAdmin = c.user.toLowerCase() === PSL_ADMIN;
const canDelete = user && (user.isAdmin || user.username === c.user);

// Reactions
const reactionsHtml = REACTIONS.map(emoji => {
const users = (c.reactions||{})[emoji] || [];
if(!users.length && !user) return ‘’;
const reacted = user && users.includes(user.username);
return `<button class="psl-react-btn ${reacted?'reacted':''}"  onclick="pslToggleReaction('${matchId}','${c.id}',${isReply?`’${c._parentId}’`:'null'},'${emoji}')"> ${emoji} <span class="psl-react-count">${users.length||''}</span> </button>`;
}).filter(Boolean).join(’’);

const addReactBtn = user ? `<div class="psl-react-wrap"> <button class="psl-reply-btn" onclick="pslTogglePicker('picker-${c.id}')">😊 +</button> <div class="psl-react-picker" id="picker-${c.id}"> ${REACTIONS.map(e=>`<button class="psl-react-pick-btn" onclick="pslPickReaction('${matchId}','${c.id}',${isReply?`'${c._parentId}'`:'null'},'${e}','picker-${c.id}')">${e}</button>`).join(’’)}
</div>

  </div>` : '';

const replyBtn = !isReply && user ? `<button class="psl-reply-btn" onclick="pslToggleReplyBox('${c.id}')">↩ Reply</button>` : ‘’;
const deleteBtn = canDelete ? `<button class="psl-delete-btn" onclick="pslDeleteComment('${matchId}','${c.id}',${isReply?`’${c._parentId}’`:'null'})">✕ delete</button>` : ‘’;

// Replies
let repliesHtml = ‘’;
if(!isReply && (c.replies||[]).length) {
const shown = c._showReplies ? c.replies : c.replies.slice(0,2);
const moreCount = c.replies.length - shown.length;
repliesHtml = `<div class="psl-replies"> ${shown.map(r => renderComment(matchId, {...r, _parentId:c.id}, true)).join('')} ${moreCount>0?`<button class="psl-show-replies-btn" onclick="pslShowAllReplies('${matchId}','${c.id}')">Show ${moreCount} more ${moreCount===1?‘reply’:‘replies’}</button>`:''} </div>`;
}

const replyCompose = !isReply ? `<div class="psl-reply-compose" id="reply-box-${c.id}" style="display:none;">
<div class="psl-reply-input-wrap">
<textarea class="psl-reply-input" id="reply-input-${c.id}" placeholder="Write a reply..." rows="2"></textarea>
<button class="psl-reply-submit" onclick="pslPostReply('${matchId}','${c.id}')">↩</button>
</div>

  </div>` : '';

return `<div class="psl-comment" id="comment-${c.id}">
<div class="psl-c-avatar" style="background:${col}">${c.user[0].toUpperCase()}</div>
<div class="psl-c-body">
<div class="psl-c-header">
<span class="psl-c-user ${isAdmin?'admin-user':''}">${c.user}</span>
<span class="psl-c-time">${pslTimeAgo(c.time)}</span>
</div>
<div class="psl-c-text">${escHtml(c.text)}</div>
<div class="psl-c-actions">
${reactionsHtml}
${addReactBtn}
${replyBtn}
${deleteBtn}
</div>
${repliesHtml}
${replyCompose}
</div>

  </div>`;
}

function escHtml(t) {
return t.replace(/&/g,’&’).replace(/</g,’<’).replace(/>/g,’>’).replace(/\n/g,’<br>’);
}

// ── Post comment ──────────────────────────────────────────────
async function pslPostComment(matchId) {
if(!pslCurrentUser) return;
const input = document.getElementById(‘psl-new-comment’);
const text  = input.value.trim();
if(!text) return;

const btn = input.closest(’.psl-compose’).querySelector(’.psl-submit-btn’);
btn.disabled = true;
try {
pslDbInvalidate();
const db = await pslDbGet();
if(!db.comments) db.comments = {};
if(!db.comments[matchId]) db.comments[matchId] = [];
db.comments[matchId].unshift({
id: ‘c_’+Date.now()+’_’+Math.random().toString(36).slice(2,6),
user: pslCurrentUser.username,
text, time: new Date().toISOString(),
reactions: {}, replies: []
});
await pslDbSet(db);
pslDbInvalidate();
const fresh = await pslDbGet();
const mount = document.getElementById(‘psl-new-comment’).closest(’.psl-comments’).parentElement;
renderComments(matchId, mount, (fresh.comments||{})[matchId]||[]);
} catch(e) { btn.disabled=false; }
}

// ── Post reply ────────────────────────────────────────────────
async function pslPostReply(matchId, commentId) {
if(!pslCurrentUser) return;
const input = document.getElementById(`reply-input-${commentId}`);
const text  = input?.value.trim();
if(!text) return;
const btn = input.closest(’.psl-reply-input-wrap’).querySelector(’.psl-reply-submit’);
btn.disabled = true;
try {
pslDbInvalidate();
const db = await pslDbGet();
const comments = (db.comments||{})[matchId]||[];
const parent   = comments.find(c=>c.id===commentId);
if(!parent) return;
if(!parent.replies) parent.replies=[];
parent.replies.push({
id: ‘r_’+Date.now()+’_’+Math.random().toString(36).slice(2,6),
user: pslCurrentUser.username,
text, time: new Date().toISOString(),
reactions: {}
});
await pslDbSet(db);
pslDbInvalidate();
const fresh=await pslDbGet();
const mount=document.getElementById(`comment-${commentId}`).closest(’.psl-comments’).parentElement;
renderComments(matchId,mount,(fresh.comments||{})[matchId]||[]);
} catch(e) { btn.disabled=false; }
}

// ── Reactions ─────────────────────────────────────────────────
async function pslToggleReaction(matchId, commentId, parentId, emoji) {
if(!pslCurrentUser) { pslOpenAuth(‘login’); return; }
pslDbInvalidate();
const db = await pslDbGet();
const comments = (db.comments||{})[matchId]||[];
let target;
if(parentId) {
const parent = comments.find(c=>c.id===parentId);
target = parent?.replies?.find(r=>r.id===commentId);
} else {
target = comments.find(c=>c.id===commentId);
}
if(!target) return;
if(!target.reactions) target.reactions={};
if(!target.reactions[emoji]) target.reactions[emoji]=[];
const idx = target.reactions[emoji].indexOf(pslCurrentUser.username);
if(idx>=0) target.reactions[emoji].splice(idx,1);
else target.reactions[emoji].push(pslCurrentUser.username);
await pslDbSet(db);
pslDbInvalidate();
const fresh=await pslDbGet();
const mount=document.getElementById(`comment-${parentId||commentId}`)?.closest(’.psl-comments’)?.parentElement;
if(mount) renderComments(matchId,mount,(fresh.comments||{})[matchId]||[]);
}

async function pslPickReaction(matchId, commentId, parentId, emoji, pickerId) {
document.getElementById(pickerId)?.classList.remove(‘open’);
await pslToggleReaction(matchId, commentId, parentId, emoji);
}

function pslTogglePicker(id) {
// Close all others first
document.querySelectorAll(’.psl-react-picker.open’).forEach(p=>{ if(p.id!==id) p.classList.remove(‘open’); });
document.getElementById(id)?.classList.toggle(‘open’);
}

// ── Delete ────────────────────────────────────────────────────
async function pslDeleteComment(matchId, commentId, parentId) {
if(!pslCurrentUser) return;
if(!confirm(‘Delete this comment?’)) return;
pslDbInvalidate();
const db = await pslDbGet();
const comments = (db.comments||{})[matchId]||[];
if(parentId) {
const parent = comments.find(c=>c.id===parentId);
if(parent) parent.replies=(parent.replies||[]).filter(r=>r.id!==commentId);
} else {
db.comments[matchId]=comments.filter(c=>c.id!==commentId);
}
await pslDbSet(db);
pslDbInvalidate();
const fresh=await pslDbGet();
const mount=document.getElementById(`comment-${parentId||commentId}`)?.closest(’.psl-comments’)?.parentElement;
if(mount) renderComments(matchId,mount,(fresh.comments||{})[matchId]||[]);
}

// ── Show all replies ──────────────────────────────────────────
async function pslShowAllReplies(matchId, commentId) {
pslDbInvalidate();
const db=await pslDbGet();
const comments=(db.comments||{})[matchId]||[];
const c=comments.find(x=>x.id===commentId);
if(c) c._showReplies=true;
const mount=document.getElementById(`comment-${commentId}`)?.closest(’.psl-comments’)?.parentElement;
if(mount) renderComments(matchId,mount,comments);
}

// ── Reply box toggle ──────────────────────────────────────────
function pslToggleReplyBox(commentId) {
const box=document.getElementById(`reply-box-${commentId}`);
if(!box) return;
const open = box.style.display===‘none’||box.style.display===’’;
box.style.display=open?‘block’:‘none’;
if(open) document.getElementById(`reply-input-${commentId}`)?.focus();
}

// Close pickers when clicking outside
document.addEventListener(‘click’, e=>{
if(!e.target.closest(’.psl-react-wrap’))
document.querySelectorAll(’.psl-react-picker.open’).forEach(p=>p.classList.remove(‘open’));
});