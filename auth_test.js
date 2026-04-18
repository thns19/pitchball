// PSL AUTH — minimal test version
(function() {
function addWidget() {
if (!document.body) { setTimeout(addWidget, 50); return; }
if (document.getElementById(‘psl-auth-widget’)) return;

```
const style = document.createElement('style');
style.textContent = `
  #psl-auth-widget {
    position: fixed !important;
    top: 12px !important;
    right: 14px !important;
    z-index: 999999 !important;
  }
  #psl-auth-widget .aw-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(30,32,20,0.95);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 20px;
    padding: 7px 14px 7px 9px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 13px;
    color: #fff;
    font-weight: 500;
  }
  #psl-auth-widget .aw-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #39c877; flex-shrink: 0;
  }
`;
document.head.appendChild(style);

const w = document.createElement('div');
w.id = 'psl-auth-widget';
w.innerHTML = `<div class="aw-btn"><div class="aw-dot"></div><span>Sign in</span></div>`;
document.body.appendChild(w);
```

}

addWidget();
document.addEventListener(‘DOMContentLoaded’, addWidget);
window.addEventListener(‘load’, addWidget);
})();