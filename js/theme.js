// ============================================================
//  Bristol Shoes — theme.js
//  Nagha-handle ng Light / Dark mode switching.
//  Naaalala ang pinili ng user kahit mag-refresh or bumalik sa page.
// ============================================================

// Ito ay isang IIFE (Immediately Invoked Function Expression).
// Ang ibig sabihin nito: ang function ay nagde-declare at nagru-run ng sabay.
// Bakit? Para ang lahat ng variables dito ay "private" — hindi ma-access ng ibang scripts.
// Parang sariling bubble lang niya — secured, walang makakapatong ng ibang variable.
(function () {

    // Key na gagamitin para sa localStorage — parang "label" ng container sa storage.
    // localStorage ay browser storage na hindi nababura kahit mag-close ng browser.
    const STORAGE_KEY = 'bristol-theme';

    // Array ng valid themes — 'light' o 'dark' lang ang accepted values.
    const THEMES = ['light', 'dark'];

    // ── applyTheme(theme) ──────────────────────────────────────
    // Ito ang function na naglalagay ng theme sa website.
    // Dalawang ginagawa niya:
    // 1. data-theme="light" or "dark" ilalagay sa <html> tag
    //    → ang CSS ang nag-ba-base dito para malaman kung anong colors ang gagamitin.
    //    → pag data-theme="dark", ang :root[data-theme="dark"] styles sa CSS ang mag-a-activate.
    // 2. I-save sa localStorage para maaalala kahit mag-refresh.
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // ── init() ────────────────────────────────────────────────
    // Ito ang unang nagru-run pag nag-load ang page.
    // Tinatanong niya sa localStorage: "May naka-save bang theme preference dito?"
    // Kung meron at valid (light o dark): gamitin iyon.
    // Kung wala (first time visitor): default ay 'light' mode.
    function init() {
        const saved = localStorage.getItem(STORAGE_KEY); // Kunin ang nakaimbak na theme
        const theme = THEMES.includes(saved) ? saved : 'light'; // Validate — kung valid, gamitin; kung hindi, 'light'
        applyTheme(theme); // I-apply ang theme sa page
    }

    // ── bindSwitcher() ────────────────────────────────────────
    // Ito ang nagco-connect ng toggle button sa actual switching logic.
    // Ginagawa niya:
    // 1. Hanapin ang #theme-toggle button sa HTML.
    // 2. Mag-inject ng sun ☀️ at moon 🌙 SVG icons sa loob nito.
    //    (Hindi hardcoded sa HTML ang icons para mas malinis ang markup — JS lang ang bahala)
    // 3. Mag-listen ng "click" event — pag clinick, i-toggle ang theme (light → dark → light).
    function bindSwitcher() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return; // Guard: kung walang button sa page, wag ituloy

        // Ini-inject ang dalawang SVG icons dynamically dito sa button.
        // .sun-icon at .moon-icon — ang CSS ang nagde-decide kung alin ang visible
        // base sa data-theme attribute ng <html> tag.
        toggleBtn.innerHTML = `
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        `;

        // Event listener sa click ng toggle button.
        // Tinitingnan niya kung ano ang kasalukuyang theme, tapos iki-click sa kabaligtaran.
        toggleBtn.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme'); // Kunin ang current theme
            const next = current === 'light' ? 'dark' : 'light'; // I-flip: light→dark, dark→light
            applyTheme(next); // I-apply ang bagong theme at i-save sa localStorage
        });
    }

    // ── Startup Logic ─────────────────────────────────────────
    // Tinatanong natin: ready na ba ang HTML (DOM) o hindi pa?
    // document.readyState === 'loading' = nag-lo-load pa ang page.
    //   → Hintayin muna ang DOMContentLoaded event bago mag-init.
    // else = ready na ang DOM (scripts na naka-load sa dulo ng body ang maagang nandito).
    //   → Mag-run na agad ng init() at bindSwitcher().
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); bindSwitcher(); });
    } else {
        init();        // I-apply ang saved/default theme
        bindSwitcher(); // I-setup ang toggle button
    }
})();
