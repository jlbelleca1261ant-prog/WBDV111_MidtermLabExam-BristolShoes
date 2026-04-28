// ============================================================
//  Bristol Shoes — Brix Chat Widget
//  Clean fixed-position mascot widget. Character sits inside
//  a branded circle (no transparency issues). Simple & polished.
// ============================================================
(function () {
    'use strict';

    var path = window.location.pathname;
    function getKey() {
        if (path.includes('about'))    return 'about';
        if (path.includes('products')) return 'products';
        if (path.includes('contact'))  return 'contact';
        return 'home';
    }

    var KEY = getKey();

    var MSGS = {
        home:     ['Hey there! 👟 Welcome to Bristol Shoes — where every step tells a story!',
                   'These shoes? Handcrafted in Marikina. They outlast trends AND your ex. 😏'],
        about:    ['Psst… curious about us? Great taste already! 🇵🇭',
                   'Every Bristol shoe is born right here in Marikina. Pretty cool, right?'],
        products: ['Hmm… shopping for new kicks huh? You came to the right place! 👀',
                   "Don't overthink it — your feet deserve the upgrade. Trust me. 😄"],
        contact:  ['Need help? Drop us a message — we don\'t bite! 😊',
                   'We reply in 1–2 business days. Busy cobblers! 🔨']
    };

    var POSES = {
        home:     'images/brix-wave.png',
        about:    'images/brix-peek.png',
        products: 'images/brix-think.png',
        contact:  'images/brix-friendly.png'
    };

    var msgs   = MSGS[KEY];
    var msgIdx = 0;
    var isOpen = false;

    // ── Build the widget ──
    var widget = document.createElement('div');
    widget.id = 'brix-widget';
    widget.className = 'brix-widget';
    widget.innerHTML =
        // Chat panel (hidden initially)
        '<div class="brix-panel" id="brix-panel">'
        +   '<div class="brix-panel-header">'
        +       '<div class="brix-panel-avatar">'
        +           '<img src="' + POSES[KEY] + '" alt="Brix">'
        +       '</div>'
        +       '<div class="brix-panel-info">'
        +           '<strong>Brix</strong>'
        +           '<span>Bristol Shoes Assistant</span>'
        +       '</div>'
        +       '<button class="brix-panel-close" id="brix-panel-close" aria-label="Close">×</button>'
        +   '</div>'
        +   '<div class="brix-panel-body">'
        +       '<div class="brix-chat-row">'
        +           '<div class="brix-chat-avatar"><img src="' + POSES[KEY] + '" alt="Brix"></div>'
        +           '<div class="brix-chat-msg" id="brix-chat-msg"></div>'
        +       '</div>'
        +       (msgs.length > 1 ? '<button class="brix-next" id="brix-next">Next tip →</button>' : '')
        +   '</div>'
        + '</div>'
        // Floating trigger button (always visible)
        + '<button class="brix-trigger" id="brix-trigger" aria-label="Chat with Brix">'
        +   '<img src="' + POSES[KEY] + '" alt="Brix" class="brix-trigger-img">'
        +   '<span class="brix-trigger-badge">1</span>'
        + '</button>';

    document.body.appendChild(widget);

    var trigger  = document.getElementById('brix-trigger');
    var panel    = document.getElementById('brix-panel');
    var closeBtn = document.getElementById('brix-panel-close');
    var nextBtn  = document.getElementById('brix-next');
    var msgEl    = document.getElementById('brix-chat-msg');
    var badge    = widget.querySelector('.brix-trigger-badge');

    // ── Typing effect ──
    function typeText(text) {
        msgEl.textContent = '';
        var i = 0;
        var t = setInterval(function () {
            msgEl.textContent += text[i++];
            if (i >= text.length) clearInterval(t);
        }, 22);
    }

    function openPanel() {
        isOpen = true;
        panel.classList.add('open');
        trigger.classList.add('active');
        badge.style.display = 'none';
        typeText(msgs[msgIdx]);
    }

    function closePanel() {
        isOpen = false;
        panel.classList.remove('open');
        trigger.classList.remove('active');
    }

    // ── Events ──
    trigger.addEventListener('click', function () {
        isOpen ? closePanel() : openPanel();
    });

    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closePanel();
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            msgIdx = (msgIdx + 1) % msgs.length;
            typeText(msgs[msgIdx]);
        });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (isOpen && !widget.contains(e.target)) closePanel();
    });

    // ── Auto-open after 2.5s on first visit ──
    setTimeout(function () {
        if (!isOpen) openPanel();
    }, 2500);

})();
