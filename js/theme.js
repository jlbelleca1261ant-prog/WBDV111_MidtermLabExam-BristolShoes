// ============================================================
//  Bristol Shoes - Theme Switcher
//  Handles Light / Dark theme switching.
// ============================================================

(function () {
    const STORAGE_KEY = 'bristol-theme';
    const THEMES = ['light', 'dark'];

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        const theme = THEMES.includes(saved) ? saved : 'light';
        applyTheme(theme);
    }

    function bindSwitcher() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); bindSwitcher(); });
    } else {
        init();
        bindSwitcher();
    }
})();
