(function () {
  const consentKey = 'cookieConsent';
  const analyticsId = 'G-XNNGKMS578';

  function loadAnalytics() {
    if (window.pslAnalyticsLoaded) return;
    window.pslAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', analyticsId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(script);
  }

  function saveConsent(value) {
    const wasAccepted = localStorage.getItem(consentKey) === 'accepted';
    localStorage.setItem(consentKey, value);
    document.getElementById('pitchball-cookie-notice')?.remove();
    if (value === 'accepted') loadAnalytics();
    else if (wasAccepted && window.pslAnalyticsLoaded) window.location.reload();
  }

  function showConsentNotice() {
    if (localStorage.getItem(consentKey)) return;

    const notice = document.createElement('section');
    notice.id = 'pitchball-cookie-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-label', 'Analytics preferences');
    notice.innerHTML = `
      <span>Pitchball uses optional analytics. You can accept or reject it. See our <a href="/privacy.html">Privacy &amp; Cookies notice</a>.</span>
      <div class="pitchball-cookie-actions">
        <button type="button" data-consent="accepted">Accept analytics</button>
        <button type="button" data-consent="rejected">Reject</button>
      </div>`;
    notice.addEventListener('click', event => {
      const button = event.target.closest('button[data-consent]');
      if (button) saveConsent(button.dataset.consent);
    });

    const style = document.createElement('style');
    style.textContent = `
      #pitchball-cookie-notice{position:fixed;z-index:100000;left:50%;bottom:16px;transform:translateX(-50%);width:min(680px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 16px;border:1px solid rgba(215,219,200,.2);border-radius:14px;background:#1e2010;color:#e7eadf;box-shadow:0 8px 32px rgba(0,0,0,.45);font:13px/1.5 system-ui,sans-serif}
      #pitchball-cookie-notice a{color:#39c877}
      #pitchball-cookie-notice .pitchball-cookie-actions{display:flex;flex-shrink:0;gap:8px}
      #pitchball-cookie-notice button{padding:7px 10px;border:1px solid rgba(215,219,200,.25);border-radius:8px;background:transparent;color:inherit;cursor:pointer;font:inherit}
      #pitchball-cookie-notice button[data-consent="accepted"]{border-color:#39c877;background:#39c877;color:#06140b;font-weight:700}
      @media(max-width:600px){#pitchball-cookie-notice{align-items:stretch;flex-direction:column;text-align:center}#pitchball-cookie-notice .pitchball-cookie-actions{justify-content:center}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(notice);
  }

  window.pslOpenCookieSettings = function () {
    localStorage.removeItem(consentKey);
    document.getElementById('pitchball-cookie-notice')?.remove();
    showConsentNotice();
  };

  function addRegistrationAgreement() {
    const registration = document.getElementById('psl-tab-register');
    if (!registration || document.getElementById('psl-legal-confirmation')) return;

    const confirmation = document.createElement('label');
    confirmation.id = 'psl-legal-confirmation';
    confirmation.style.cssText = 'display:flex;align-items:flex-start;gap:8px;margin:12px 0;color:rgba(215,219,200,.7);font-size:11px;line-height:1.5;';

    const checkbox = document.createElement('input');
    checkbox.id = 'psl-legal-accept';
    checkbox.type = 'checkbox';
    checkbox.style.marginTop = '3px';

    const text = document.createElement('span');
    text.innerHTML = 'I confirm I am at least 16 and agree to the <a href="/terms.html" target="_blank" rel="noopener">Terms of Use</a>. <a href="/privacy.html" target="_blank" rel="noopener">Privacy &amp; Cookies</a>.';
    confirmation.append(checkbox, text);

    const error = registration.querySelector('#psl-rg-err');
    registration.insertBefore(confirmation, error || registration.lastElementChild);
  }

  if (typeof window.pslOpenAuth === 'function') {
    const originalOpenAuth = window.pslOpenAuth;
    window.pslOpenAuth = function (tab) {
      const result = originalOpenAuth.apply(this, arguments);
      if (tab === 'register') addRegistrationAgreement();
      return result;
    };
  }

  if (typeof window.pslSwitchTab === 'function') {
    const originalSwitchTab = window.pslSwitchTab;
    window.pslSwitchTab = function (tab) {
      const result = originalSwitchTab.apply(this, arguments);
      if (tab === 'register') addRegistrationAgreement();
      return result;
    };
  }

  if (typeof window.pslDoRegister === 'function') {
    const originalRegister = window.pslDoRegister;
    window.pslDoRegister = function () {
      const checkbox = document.getElementById('psl-legal-accept');
      const error = document.getElementById('psl-rg-err');
      if (!checkbox || !checkbox.checked) {
        if (error) {
          error.textContent = 'Confirm you are at least 16 and accept the Terms of Use to create an account.';
          error.style.display = 'block';
        }
        return;
      }
      return originalRegister.apply(this, arguments);
    };
  }

  const consent = localStorage.getItem(consentKey);
  if (consent === 'accepted') loadAnalytics();
  else if (!consent) showConsentNotice();
})();
