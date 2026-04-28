// ============================================================
//  Bristol Shoes — Scroll Reveal + Navbar Scroll Effect
//  Smooth fade-in animations as elements enter the viewport.
//  GPU-optimized using IntersectionObserver (no layout thrash).
// ============================================================

(function () {

    // ── 1. Mark all animatable elements with .reveal class ──
    // We target the main content containers, not every element.
    const targets = [
        '.card', '.product', '.stat',
        '.two-col .col', '.contact-row > div',
        '.page-header', '.section-navy .wrap > *',
        '.hero-text', '.hero-img', '.info-item', '.map'
    ];

    targets.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('reveal');
        });
    });


    // ── 2. IntersectionObserver — fires when element enters viewport ──
    // More performant than scroll event listeners — runs off main thread.
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop watching it (no need to re-animate)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,      // trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px'  // trigger slightly before fully in view
    });

    // Observe every .reveal element
    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });


    // ── 3. Stagger delay for card groups ──
    // Cards in the same row animate one after another (not all at once).
    ['cards', 'products', 'stats'].forEach(function (cls) {
        document.querySelectorAll('.' + cls).forEach(function (group) {
            Array.from(group.children).forEach(function (child, index) {
                child.style.transitionDelay = (index * 0.1) + 's';
            });
        });
    });


    // ── 4. Navbar scroll effect ──
    // Increase shadow when user scrolls down to give more "depth".
    var nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.55) inset';
            } else {
                nav.style.boxShadow = '';
            }
        }, { passive: true });  // passive = never blocks scroll (performance)
    }

})();
