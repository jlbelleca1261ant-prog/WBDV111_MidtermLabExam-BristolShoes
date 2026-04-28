// ============================================================
//  Bristol Shoes — Brix the Cobbler Mascot
//  4 unique animations per page. Fully transparent SVG character.
// ============================================================
(function () {
    'use strict';

    // ── Inline SVG (transparent, no white box) ──
    var SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 110" width="78" height="95" style="overflow:visible">'
        + '<rect x="20" y="65" width="50" height="45" rx="11" fill="#1B2A4A"/>'
        + '<rect x="27" y="60" width="36" height="50" rx="8" fill="#2A3F6F"/>'
        + '<rect x="33" y="80" width="24" height="16" rx="4" fill="#1B2A4A" opacity="0.4"/>'
        + '<circle cx="45" cy="40" r="26" fill="#D4956A"/>'
        + '<ellipse cx="45" cy="17" rx="26" ry="8" fill="#1B2A4A"/>'
        + '<rect x="22" y="11" width="46" height="15" rx="8" fill="#1B2A4A"/>'
        + '<circle cx="36" cy="39" r="5" fill="white"/><circle cx="54" cy="39" r="5" fill="white"/>'
        + '<circle cx="37" cy="40" r="3" fill="#1B2A4A"/><circle cx="55" cy="40" r="3" fill="#1B2A4A"/>'
        + '<circle cx="38" cy="38" r="1.2" fill="white"/><circle cx="56" cy="38" r="1.2" fill="white"/>'
        + '<ellipse cx="29" cy="48" rx="5" ry="3" fill="#E8908A" opacity="0.5"/>'
        + '<ellipse cx="61" cy="48" rx="5" ry="3" fill="#E8908A" opacity="0.5"/>'
        + '<path d="M34 54 Q45 64 56 54" stroke="#994422" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
        // Waving left arm
        + '<g class="brix-arm"><path d="M20 75 Q5 58 12 36" stroke="#D4956A" stroke-width="10" fill="none" stroke-linecap="round"/>'
        + '<circle cx="12" cy="33" r="7" fill="#D4956A"/></g>'
        // Right arm + shoe
        + '<path d="M70 75 Q85 70 82 56" stroke="#D4956A" stroke-width="10" fill="none" stroke-linecap="round"/>'
        + '<path d="M74 50 Q82 44 91 50 Q89 57 74 54 Z" fill="#8B4513"/>'
        + '<path d="M76 48 Q82 43 89 48" stroke="#5C2E0A" stroke-width="1.5" fill="none"/>'
        + '</svg>';

    // ── Messages ──
    var path = window.location.pathname;
    var MSGS = {
        home:     ['Hey there! 👟 Welcome to Bristol Shoes!', 'These shoes? They outlast trends AND ex-lovers. 😏'],
        about:    ['Curious about us? Already loving your taste! 🇵🇭', 'Every Bristol shoe is born right here in Marikina. Proud of it!'],
        products: ['Hmm… shopping for shoes, huh? Good timing! 👀', "Don't overthink it — your feet deserve the upgrade. Trust me. 😄"],
        contact:  ["Need help? Don't be shy, we don't bite! 😊", 'We reply in 1–2 days. We\'re busy cobblers! 🔨']
    };

    function getKey() {
        if (path.includes('about'))    return 'about';
        if (path.includes('products')) return 'products';
        if (path.includes('contact'))  return 'contact';
        return 'home';
    }

    var msgs = MSGS[getKey()], msgIdx = 0;

    // ── Shared bubble HTML ──
    var BUBBLE_HTML = '<div class="bx-bubble" id="bx-bubble">'
        + '<button class="bx-close" id="bx-close" title="Close">×</button>'
        + '<p class="bx-msg" id="bx-msg"></p>'
        + (msgs.length > 1 ? '<button class="bx-next" id="bx-next">Next tip →</button>' : '')
        + '</div>';

    // ── Typing effect ──
    function type(text) {
        var el = document.getElementById('bx-msg');
        el.textContent = '';
        var i = 0;
        var t = setInterval(function () { el.textContent += text[i++]; if (i >= text.length) clearInterval(t); }, 30);
    }

    function showBubble() {
        var b = document.getElementById('bx-bubble');
        if (b) { b.classList.add('visible'); type(msgs[msgIdx]); }
    }

    function bindButtons() {
        var close = document.getElementById('bx-close');
        var next  = document.getElementById('bx-next');
        var img   = document.getElementById('bx-img');
        if (close) close.addEventListener('click', function (e) { e.stopPropagation(); document.getElementById('bx-bubble').classList.remove('visible'); });
        if (next)  next.addEventListener('click',  function (e) { e.stopPropagation(); msgIdx = (msgIdx + 1) % msgs.length; type(msgs[msgIdx]); });
        if (img)   img.addEventListener('click', function () {
            var b = document.getElementById('bx-bubble');
            b.classList.contains('visible') ? b.classList.remove('visible') : showBubble();
        });
    }


    // ════════════════════════════════════════════
    //  HOME — Shoelace rappel → walk → chat
    // ════════════════════════════════════════════
    function initHome() {
        var hero = document.querySelector('.hero');
        var h1   = document.querySelector('.hero-text h1');
        var em   = document.querySelector('.hero-text h1 em');
        if (!hero || !h1) return;

        hero.style.position = 'relative';

        hero.insertAdjacentHTML('beforeend',
            '<div id="bx-rope"></div>'
            + '<div id="bx-scene" style="position:absolute;top:-110px;z-index:50">'
            + '<div id="bx-img" style="cursor:pointer" title="Click me!">' + SVG + '</div>'
            + BUBBLE_HTML + '</div>'
        );

        // Compute positions after layout
        requestAnimationFrame(function () {
            var heroRect = hero.getBoundingClientRect();
            var emRect   = em  ? em.getBoundingClientRect()  : h1.getBoundingClientRect();
            var h1Rect   = h1.getBoundingClientRect();

            // X: right edge of "Timeless", relative to hero
            var landX = emRect.right - heroRect.left - 40;
            // Y: top of h1 text relative to hero  
            var landY = h1Rect.top - heroRect.top - 90;
            // Walk start: left of "Timeless" word
            var walkX = emRect.left - heroRect.left - 5;

            var rope  = document.getElementById('bx-rope');
            var scene = document.getElementById('bx-scene');

            // Position rope above end of Timeless word
            rope.style.left  = (emRect.right - heroRect.left - 2) + 'px';
            rope.style.top   = '0px';

            // Brix starts above viewport, centered on rope
            scene.style.left = landX + 'px';
            scene.style.top  = '-110px';

            // ── SEQUENCE ──
            // 1. Rope drops (0.4s delay)
            setTimeout(function () { rope.classList.add('drop'); }, 400);

            // 2. Brix slides down rope
            setTimeout(function () {
                scene.style.transition = 'top 1.4s cubic-bezier(0.25,0.1,0.25,1)';
                scene.style.top = landY + 'px';
            }, 600);

            // 3. Rope retracts
            setTimeout(function () { rope.classList.remove('drop'); rope.classList.add('retract'); }, 2100);

            // 4. Brix walks left → right across h1 text
            setTimeout(function () {
                scene.style.left = walkX + 'px';
                scene.style.top  = landY + 'px';
                scene.style.transition = 'none';
                // then walk right
                requestAnimationFrame(function () {
                    scene.style.transition = 'left 1.8s steps(12, end)';
                    scene.style.left = landX + 'px';
                    scene.classList.add('walking');
                });
            }, 2400);

            // 5. Chat bubble appears
            setTimeout(function () {
                scene.classList.remove('walking');
                showBubble();
            }, 4500);

            bindButtons();
        });
    }


    // ════════════════════════════════════════════
    //  ABOUT — Peek up from behind "Story" text
    // ════════════════════════════════════════════
    function initAbout() {
        var ph = document.querySelector('.page-header');
        var h1 = document.querySelector('.page-header h1');
        if (!ph) return;

        ph.style.position = 'relative';
        ph.style.overflow  = 'visible';

        ph.insertAdjacentHTML('beforeend',
            '<div id="bx-scene" class="bx-peek">'
            + '<div id="bx-img" style="cursor:pointer" title="Click me!">' + SVG + '</div>'
            + BUBBLE_HTML + '</div>'
        );

        requestAnimationFrame(function () {
            var phRect = ph.getBoundingClientRect();
            var h1Rect = h1 ? h1.getBoundingClientRect() : phRect;
            var scene  = document.getElementById('bx-scene');

            // Position peeking from behind right side of the h1
            scene.style.right  = '12%';
            scene.style.bottom = '0px';

            // Peek animation after delay
            setTimeout(function () { scene.classList.add('peekup'); }, 800);
            setTimeout(function () { showBubble(); }, 2200);
            bindButtons();
        });
    }


    // ════════════════════════════════════════════
    //  PRODUCTS — Slide in from right + bounce
    // ════════════════════════════════════════════
    function initProducts() {
        var wrap = document.createElement('div');
        wrap.id = 'bx-scene';
        wrap.className = 'bx-fixed bx-slideright';
        wrap.innerHTML = '<div id="bx-img" style="cursor:pointer" title="Click me!">' + SVG + '</div>' + BUBBLE_HTML;
        document.body.appendChild(wrap);

        setTimeout(function () { wrap.classList.add('arrived'); }, 600);
        setTimeout(function () { showBubble(); }, 2000);
        bindButtons();
    }


    // ════════════════════════════════════════════
    //  CONTACT — Bounce up from bottom
    // ════════════════════════════════════════════
    function initContact() {
        var wrap = document.createElement('div');
        wrap.id = 'bx-scene';
        wrap.className = 'bx-fixed bx-bounceup';
        wrap.innerHTML = '<div id="bx-img" style="cursor:pointer" title="Click me!">' + SVG + '</div>' + BUBBLE_HTML;
        document.body.appendChild(wrap);

        setTimeout(function () { wrap.classList.add('arrived'); }, 700);
        setTimeout(function () { showBubble(); }, 2000);
        bindButtons();
    }


    // ── Route ──
    var k = getKey();
    if      (k === 'home')     initHome();
    else if (k === 'about')    initAbout();
    else if (k === 'products') initProducts();
    else                       initContact();

})();
