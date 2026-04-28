// ============================================================
//  Bristol Shoes - Theme Switcher
//  Handles Light / Dark / Bristol (accent) theme switching.
//  Saves the user's preference to localStorage so it
//  remembers their choice even after they close the browser.
// ============================================================

(function () {

    const STORAGE_KEY = 'bristol-theme';

    // All valid theme values
    const THEMES = ['light', 'dark', 'bristol'];

    // ── Apply theme to <html> element ──
    // We set a data attribute: <html data-theme="dark">
    // CSS variables change based on this attribute.
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Sync the radio button to match
        const radio = document.querySelector(`.switcher__input[value="${theme}"]`);
        if (radio) radio.checked = true;
    }

    // ── On page load: restore saved theme or default to light ──
    function init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        const theme = THEMES.includes(saved) ? saved : 'light';
        applyTheme(theme);
    }

    // ── Wire up the switcher radio buttons ──
    function bindSwitcher() {
        const switcher = document.querySelector('.switcher');
        if (!switcher) return;

        switcher.addEventListener('change', function (e) {
            if (e.target.name === 'theme') {
                applyTheme(e.target.value);
            }
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(); bindSwitcher(); });
    } else {
        init();
        bindSwitcher();
    }

})();
