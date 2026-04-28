// ============================================================
//  Bristol Shoes — Brix the Cobbler  (Professional Mascot Engine)
//  Uses high-detail PNGs + CSS @keyframes for movement.
//  Bubbles revealed via JS animationend listeners.
// ============================================================
(function () {
    'use strict';

    // ── Per-page images & messages ──
    var POSES = {
        home:     'images/brix-wave.png',
        about:    'images/brix-peek.png',
        products: 'images/brix-think.png',
        contact:  'images/brix-friendly.png'
    };
    var MSGS = {
        home:     ['Hey there! 👟 Welcome to Bristol Shoes — where every step tells a story!',
                   'These shoes? Handcrafted in Marikina. They outlast trends AND your ex. 😏'],
        about:    ['Psst… curious about us? Great taste already! 🇵🇭',
                   'Every Bristol shoe is born right here in Marikina. Pretty cool, right?'],
        products: ['Hmm… shopping for new kicks? You came to the right place! 👀',
                   "Don't overthink it — your feet deserve the upgrade. Trust me. 😄"],
        contact:  ['Need help? Drop us a message — we don\'t bite! 😊',
                   'We reply in 1–2 business days. Busy cobblers, you know! 🔨']
    };

    var path = window.location.pathname;
    function getKey() {
        if (path.includes('about'))    return 'about';
        if (path.includes('products')) return 'products';
        if (path.includes('contact'))  return 'contact';
        return 'home';
    }
    var KEY  = getKey();
    var msgs = MSGS[KEY];
    var pose = POSES[KEY];
    var msgIdx = 0;

    // ── Typing effect ──
    function typeText(el, text, cb) {
        el.textContent = '';
        var i = 0;
        var t = setInterval(function () {
            el.textContent += text[i++];
            if (i >= text.length) { clearInterval(t); if (cb) cb(); }
        }, 25);
    }

    // ── Show / hide bubble ──
    function showBubble(container) {
        var bubble = container.querySelector('.bx-bubble');
        var msgEl  = container.querySelector('.bx-msg');
        if (!bubble || !msgEl) return;
        bubble.classList.add('show');
        typeText(msgEl, msgs[msgIdx]);
    }
    function hideBubble(container) {
        var bubble = container.querySelector('.bx-bubble');
        if (bubble) bubble.classList.remove('show');
    }

    // ── Build bubble HTML ──
    function bubbleHTML() {
        return '<div class="bx-bubble">'
            + '<button class="bx-close" aria-label="Close">×</button>'
            + '<p class="bx-msg"></p>'
            + (msgs.length > 1 ? '<button class="bx-next">Next tip →</button>' : '')
            + '</div>';
    }

    // ── Bind bubble events ──
    function bindBubble(container) {
        var close = container.querySelector('.bx-close');
        var next  = container.querySelector('.bx-next');
        var img   = container.querySelector('.bx-character');

        if (close) close.addEventListener('click', function (e) {
            e.stopPropagation(); hideBubble(container);
        });
        if (next) next.addEventListener('click', function (e) {
            e.stopPropagation();
            msgIdx = (msgIdx + 1) % msgs.length;
            typeText(container.querySelector('.bx-msg'), msgs[msgIdx]);
        });
        if (img) img.addEventListener('click', function () {
            var bubble = container.querySelector('.bx-bubble');
            if (bubble.classList.contains('show')) hideBubble(container);
            else showBubble(container);
        });
    }


    // ════════════════════════════════════════════════════════
    //  HOME — Drop on shoelace → land on h1 → walk → chat
    // ════════════════════════════════════════════════════════
    function initHome() {
        var heroText = document.querySelector('.hero-text');
        var h1 = document.querySelector('.hero-text h1');
        if (!heroText || !h1) return;

        // Make h1 the positioning anchor
        h1.style.position = 'relative';
        h1.style.display  = 'inline-block';

        // Inject Brix container inside h1 so he's anchored to the text
        h1.insertAdjacentHTML('beforeend',
            '<span id="bx-home" class="bx-home-container">'
            +   '<span class="bx-shoelace"></span>'
            +   '<img class="bx-character" src="' + pose + '" alt="Brix the Cobbler" draggable="false">'
            +   bubbleHTML()
            + '</span>'
        );

        var container = document.getElementById('bx-home');
        bindBubble(container);

        // Chat appears after the CSS animation ends
        container.addEventListener('animationend', function (e) {
            if (e.animationName === 'bxHomeWalk') {
                container.classList.add('arrived');
                setTimeout(function () { showBubble(container); }, 400);
            }
        });
    }


    // ════════════════════════════════════════════════════════
    //  ABOUT — Peek up from behind "Our Story" heading
    // ════════════════════════════════════════════════════════
    function initAbout() {
        var header = document.querySelector('.page-header');
        var h1     = document.querySelector('.page-header h1');
        if (!header || !h1) return;

        header.style.position = 'relative';
        header.style.overflow = 'visible';

        // Find the <em> or last word
        var anchor = h1.querySelector('em') || h1;

        anchor.style.position = 'relative';
        anchor.style.display  = 'inline-block';

        anchor.insertAdjacentHTML('beforeend',
            '<span id="bx-about" class="bx-about-container">'
            +   '<img class="bx-character" src="' + pose + '" alt="Brix peeking" draggable="false">'
            +   bubbleHTML()
            + '</span>'
        );

        var container = document.getElementById('bx-about');
        bindBubble(container);

        // Trigger peek after 0.8s
        setTimeout(function () { container.classList.add('peek'); }, 800);
        // Show bubble after peek finishes
        setTimeout(function () { showBubble(container); }, 2400);
    }


    // ════════════════════════════════════════════════════════
    //  PRODUCTS — Slide in from right edge
    // ════════════════════════════════════════════════════════
    function initProducts() {
        var el = document.createElement('div');
        el.id = 'bx-products';
        el.className = 'bx-products-container';
        el.innerHTML = '<img class="bx-character" src="' + pose + '" alt="Brix thinking" draggable="false">'
                     + bubbleHTML();
        document.body.appendChild(el);

        bindBubble(el);

        // Slide in after 0.6s
        setTimeout(function () { el.classList.add('arrived'); }, 600);
        // Chat after arrival
        setTimeout(function () { showBubble(el); }, 2000);
    }


    // ════════════════════════════════════════════════════════
    //  CONTACT — Pop up from bottom
    // ════════════════════════════════════════════════════════
    function initContact() {
        var el = document.createElement('div');
        el.id = 'bx-contact';
        el.className = 'bx-contact-container';
        el.innerHTML = '<img class="bx-character" src="' + pose + '" alt="Brix waving" draggable="false">'
                     + bubbleHTML();
        document.body.appendChild(el);

        bindBubble(el);

        setTimeout(function () { el.classList.add('arrived'); }, 700);
        setTimeout(function () { showBubble(el); }, 2200);
    }


    // ── Route ──
    if      (KEY === 'home')     initHome();
    else if (KEY === 'about')    initAbout();
    else if (KEY === 'products') initProducts();
    else                         initContact();

})();
