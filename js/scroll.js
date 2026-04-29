// ============================================================
//  Bristol Shoes — Scroll Reveal + Navbar Scroll Effect
//  Smooth fade-in animations as elements enter the viewport.
//  GPU-optimized using IntersectionObserver (no layout thrash).
// ============================================================

(function () {

    // ── 1. Mark all animatable elements with .reveal class ──
    const targets = [
        '.product', '.two-col .col', '.contact-row > div',
        '.page-header', '.section-navy .wrap > *',
        '.hero-text', '.hero-img', '.info-item', '.map'
    ];

    targets.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('reveal');
        });
    });


    // ── 2. IntersectionObserver ──
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });


    // ── 3. Stagger delay for card groups ──
    ['products'].forEach(function (cls) {
        document.querySelectorAll('.' + cls).forEach(function (group) {
            Array.from(group.children).forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.1) + 's';
            });
        });
    });


    // ── 4. Navbar scroll effect ──
    var nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.55) inset';
            } else {
                nav.style.boxShadow = '';
            }
        }, { passive: true });
    }


    // ── 5. Hamburger menu toggle ──
    var toggle   = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-nav-menu');

    if (toggle && mobileMenu) {
        // Open / close on hamburger click
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = mobileMenu.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });

        // Close when a nav link is tapped
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            });
        });

        // Close when tapping outside the nav
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            }
        });
    }

})();
