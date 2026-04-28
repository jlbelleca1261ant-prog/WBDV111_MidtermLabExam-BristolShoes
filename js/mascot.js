/* =============================================================
   Brix the Cobbler — Bristol Shoes Mascot
   Fixed-position floating assistant with per-page poses,
   smooth CSS animations, and humorous chitchat.
   ============================================================= */
(function () {
    'use strict';

    /* ── Page detection ── */
    var p = location.pathname;
    var page = p.includes('about')    ? 'about'
             : p.includes('product')  ? 'products'
             : p.includes('contact')  ? 'contact'
             : 'home';

    /* ── Per-page config ── */
    var cfg = {
        home:     { img: 'images/brix_waving.png',   msgs: [
            'Hey there! 👟 Welcome to Bristol Shoes!',
            'Handcrafted in Marikina — they outlast trends AND your ex. 😏'
        ]},
        about:    { img: 'images/brix_friendly.png',  msgs: [
            'Curious about us? Great taste already! 🇵🇭',
            'Every Bristol shoe is born right here in the Shoe Capital!'
        ]},
        products: { img: 'images/brix_thinking.png',  msgs: [
            'Hmm… shopping for new kicks? Smart move! 👀',
            "Don't overthink it — your feet deserve the upgrade. 😄"
        ]},
        contact:  { img: 'images/brix_friendly.png',  msgs: [
            "Need help? Drop us a message — we don't bite! 😊",
            'We reply in 1–2 days. Busy cobblers, you know! 🔨'
        ]}
    };

    var c    = cfg[page];
    var idx  = 0;
    var open = false;

    /* ── Build widget DOM ── */
    var w = document.createElement('div');
    w.id = 'brix';
    w.innerHTML =
        /* Panel */
        '<div id="brix-panel">' +
            '<div id="brix-head">' +
                '<img src="' + c.img + '" alt="Brix" id="brix-av">' +
                '<div><strong>Brix</strong><span>Bristol Shoes Assistant</span></div>' +
                '<button id="brix-x" aria-label="Close">&times;</button>' +
            '</div>' +
            '<div id="brix-body">' +
                '<div id="brix-row">' +
                    '<img src="' + c.img + '" alt="" id="brix-av2">' +
                    '<div id="brix-txt"></div>' +
                '</div>' +
                (c.msgs.length > 1 ? '<button id="brix-nxt">Next tip →</button>' : '') +
            '</div>' +
        '</div>' +
        /* Trigger */
        '<button id="brix-btn" aria-label="Chat with Brix">' +
            '<img src="' + c.img + '" alt="Brix">' +
            '<i id="brix-dot">1</i>' +
        '</button>';

    document.body.appendChild(w);

    /* ── Refs ── */
    var panel = document.getElementById('brix-panel');
    var btn   = document.getElementById('brix-btn');
    var txt   = document.getElementById('brix-txt');
    var dot   = document.getElementById('brix-dot');

    /* ── Typing effect ── */
    function type(s) {
        txt.textContent = '';
        var i = 0, t = setInterval(function () {
            txt.textContent += s[i++];
            if (i >= s.length) clearInterval(t);
        }, 20);
    }

    function show() {
        open = true;
        panel.classList.add('open');
        btn.classList.add('on');
        dot.style.display = 'none';
        type(c.msgs[idx]);
    }
    function hide() {
        open = false;
        panel.classList.remove('open');
        btn.classList.remove('on');
    }

    btn.addEventListener('click', function () { open ? hide() : show(); });
    document.getElementById('brix-x').addEventListener('click', function (e) {
        e.stopPropagation(); hide();
    });
    var nxt = document.getElementById('brix-nxt');
    if (nxt) nxt.addEventListener('click', function (e) {
        e.stopPropagation();
        idx = (idx + 1) % c.msgs.length;
        type(c.msgs[idx]);
    });
    document.addEventListener('click', function (e) {
        if (open && !w.contains(e.target)) hide();
    });

    /* Auto-open after 2s */
    setTimeout(function () { if (!open) show(); }, 2000);
})();
