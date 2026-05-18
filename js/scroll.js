// ============================================================
//  Bristol Shoes — scroll.js
//  Nagha-handle ng tatlong bagay:
//  1. Scroll reveal animations (elements fade in pag visible na sa screen)
//  2. Navbar shadow effect pag nag-scroll pababa ang user
//  3. Hamburger menu toggle para sa mobile
// ============================================================

// IIFE ulit — para "private" ang lahat ng variables dito.
// Walang ibang script ang makaka-access ng variables neto — secured.
(function () {

    // ── PART 1: I-MARK LAHAT NG ANIMATABLE ELEMENTS ──────────
    // Ito ang listahan ng CSS selectors na gusto nating i-animate pag visible na sa screen.
    // Ang bawat element sa listahan na ito ay magiging "invisible" muna at mag-fa-fade in
    // kapag pumasok na sila sa viewport (visible area ng browser).
    const targets = [
        '.product', '.stat', '.two-col .col', '.contact-row > div',
        '.page-header', '.section-navy .wrap > *',
        '.hero-text', '.hero-img', '.info-item', '.map'
    ];

    // Para sa bawat selector sa targets array, hanapin ang lahat ng matching elements sa page.
    // Tapos dagdagan ng class="reveal" ang bawat isa.
    // Ang .reveal class sa CSS ay nagtatapos ng opacity: 0 at translateY(28px) — invisible at slightly shifted down.
    targets.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('reveal'); // Dagdagan ng reveal class para maging invisible muna
        });
    });


    // ── PART 2: INTERSECTION OBSERVER ────────────────────────
    // IntersectionObserver = built-in browser tool na nagma-monitor kung ang isang element
    // ay "intersecting" na (pumasok na sa visible na bahagi ng screen — ang viewport).
    //
    // Mas efficient ito kaysa sa lumang paraan (window scroll event + getBoundingClientRect)
    // dahil hindi ito naglalagay ng load sa main thread — separate siya.
    // "No layout thrash" = hindi niya pino-pause ang page rendering para mag-check.
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            // entry.isIntersecting = true pag ang element ay visible na sa screen
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Dagdagan ng .visible = mag-fa-fade in at mag-slide up (CSS animation)
                observer.unobserve(entry.target);      // I-stop na ang monitoring sa element na ito — once lang kailangan
            }
        });
    }, {
        threshold: 0.12,           // Mag-trigger pag 12% ng element ang visible na sa screen
        rootMargin: '0px 0px -40px 0px' // Mag-trigger ng 40px bago pa man ma-reach ang bottom ng viewport — mas early ang animation
    });

    // I-observe (i-monitor) ang lahat ng elements na may class="reveal".
    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });


    // ── PART 3: STAGGER DELAY PARA SA CARD GROUPS ────────────
    // Para sa groups ng cards (products, stats), hindi sila mag-a-animate ng sabay-sabay.
    // Naglalagay tayo ng delay sa bawat card — unang card = 0s, pangalawa = 0.1s, pangatlo = 0.2s, etc.
    // Result: may "cascading" o "wave" effect ang pagla-labas ng cards — mas maganda sa mata.
    ['products', 'stats'].forEach(function (cls) {
        document.querySelectorAll('.' + cls).forEach(function (group) {
            Array.from(group.children).forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.1) + 's'; // 0s, 0.1s, 0.2s, 0.3s...
            });
        });
    });


    // ── PART 4: NAVBAR SHADOW ON SCROLL ──────────────────────
    // Pag nag-scroll pababa ang user ng higit sa 40px, nagdadagdag ng stronger shadow sa navbar.
    // Purpose: visual depth — parang ang navbar ay "floating" nang mas mataas kapag nag-scroll na.
    // { passive: true } = sinasabi sa browser na hindi natin ipo-prevent ang default scroll behavior
    //                     kaya okay na i-optimize niya ang scroll performance.
    var nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                // Mas malakas na shadow pag nag-scroll na — nagmumukha itong mas elevated at distinct
                nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.55) inset';
            } else {
                // Ibalik sa original (blank = default CSS shadow ang mag-a-apply)
                nav.style.boxShadow = '';
            }
        }, { passive: true });
    }


    // ── PART 5: HAMBURGER MENU TOGGLE ────────────────────────
    // Nagha-handle ng open/close ng mobile navigation menu.
    var toggle    = document.getElementById('nav-toggle');    // Yung hamburger button (≡)
    var mobileMenu = document.getElementById('mobile-nav-menu'); // Yung dropdown menu sa mobile

    if (toggle && mobileMenu) {

        // Pag clinick ang hamburger button:
        // - i-toggle ang class="open" sa mobile menu (open → show, remove → hide)
        // - i-toggle ang class="open" sa hamburger button (para mag-animate sa X)
        // - i-update ang aria-expanded para sa screen readers
        // e.stopPropagation() = huwag i-propagate ang click event sa parent elements
        //                       (para hindi ma-trigger ang "close when clicking outside" logic below)
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = mobileMenu.classList.toggle('open'); // toggle returns true pag nag-add, false pag nag-remove
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen); // Para malaman ng screen readers kung open o closed
        });

        // Pag nag-tap ng link sa mobile menu, awtomatikong isasara ang menu.
        // Makes sense kasi lalipat na ang page — hindi na kailangan ng bukas na menu.
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            });
        });

        // Pag nag-click sa kahit saan sa labas ng nav at mobile menu, isasara ang menu.
        // nav.contains(e.target) = tinitingnan kung ang na-click ay nasa loob ng nav.
        // mobileMenu.contains(e.target) = tinitingnan kung nasa loob ng menu.
        // Kung wala sa dalawa = outside click = isara ang menu.
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            }
        });
    }

})();
