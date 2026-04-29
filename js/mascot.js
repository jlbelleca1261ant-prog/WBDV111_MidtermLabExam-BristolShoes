/* =============================================================
   Brix the Cobbler — Bristol Shoes Mascot
   Physics-based animated character with per-page poses.
   ============================================================= */
(function () {
    'use strict';

    /* ── Page detection (works on GitHub Pages + local) ── */
    var href = location.href.toLowerCase();
    var page = href.includes('about')    ? 'about'
             : href.includes('products') ? 'products'
             : href.includes('product')  ? 'products'
             : href.includes('contact')  ? 'contact'
             : 'home';

    /* ── Per-page config ── */
    var cfg = {
        home:     { img: 'images/brix_waving.png',   msgs: [
            'Psst! Yeah, you. Stop scrolling for a sec. 🤫',
            'Our shoes are handcrafted to outlast trends... and probably your last relationship. 💅',
            'Unless you actually enjoy blisters, you should probably buy a pair. Just saying. 🙄'
        ]},
        about:    { img: 'images/brix_friendly.png',  msgs: [
            "Ah, the 'Our Story' page. You must be really bored right now. ☕",
            "Spoiler alert: We make really good shoes in Marikina. That's basically the whole story. 😅",
            "Fun fact: I'm not a real cobbler. I'm just a drawing trapped in your browser. Send help. 🆘"
        ]},
        products: { img: 'images/brix_thinking.png',  msgs: [
            'I see you eyeing that leather... do not fight the urge. Add to cart. 👀',
            "Think of it as an investment! At least, that's what you can tell your wallet. 💸",
            "Pro tip: Buying new shoes burns calories. Trust me, I'm a cartoon. 👟"
        ]},
        contact:  { img: 'images/brix_friendly.png',  msgs: [
            "Got a question? Drop a message! We don't bite... unless you ask us to sell Crocs. 🐊",
            "We usually reply in 1–2 days. I'd do it faster, but my hands are literally painted on. 🤷‍♂️",
            "Just don't spam us, okay? My pixelated anxiety can't handle it. 😰"
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
        /* Trigger — the "alive" character */
        '<button id="brix-btn" aria-label="Chat with Brix">' +
            '<img src="' + c.img + '" alt="Brix" id="brix-char">' +
            '<i id="brix-dot">1</i>' +
        '</button>';

    document.body.appendChild(w);

    /* ── Refs ── */
    var panel  = document.getElementById('brix-panel');
    var btn    = document.getElementById('brix-btn');
    var chr    = document.getElementById('brix-char');
    var txt    = document.getElementById('brix-txt');
    var dot    = document.getElementById('brix-dot');

    /* ── Typing effect ── */
    var typeTimer;
    function type(s) {
        clearInterval(typeTimer);
        txt.textContent = '';
        var i = 0;
        typeTimer = setInterval(function () {
            txt.textContent += s[i++];
            if (i >= s.length) clearInterval(typeTimer);
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

    /* ── Spring physics on click ── */
    function springBounce() {
        chr.style.transition = 'transform 0.15s ease-out';
        chr.style.transform  = 'scale(0.75) rotate(-12deg)';
        setTimeout(function () {
            chr.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
            chr.style.transform  = 'scale(1) rotate(0deg)';
        }, 150);
    }

    btn.addEventListener('click', function () {
        springBounce();
        setTimeout(function () { open ? hide() : show(); }, 200);
    });

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

    /* ── Entrance animation: slide in from off-screen ── */
    w.style.transform = 'translateX(-120px)';
    w.style.opacity   = '0';
    setTimeout(function () {
        w.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease';
        w.style.transform  = 'translateX(0)';
        w.style.opacity    = '1';
    }, 500);

    /* ── Auto-open after 2.5s ── */
    setTimeout(function () { if (!open) show(); }, 2500);

    /* ── React to scroll: gentle parallax tilt ── */
    var lastY = 0;
    window.addEventListener('scroll', function () {
        var y = window.scrollY;
        var delta = Math.max(-8, Math.min(8, (y - lastY) * 0.6));
        chr.style.transform = 'rotate(' + delta + 'deg)';
        lastY = y;
        clearTimeout(chr._reset);
        chr._reset = setTimeout(function () {
            chr.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            chr.style.transform  = 'rotate(0deg)';
        }, 150);
    });
})();
