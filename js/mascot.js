// ============================================================
//  Bristol Shoes — Mascot Widget (Cobbler "Brix")
//  Page-aware messages, bubble auto-show, click to toggle.
// ============================================================

(function () {

    // ── Per-page messages ──
    const page = window.location.pathname;

    const messages = {
        home:    ["Hey there! 👟 Welcome to Bristol Shoes — where every step tells a story!",
                  "Psst… our shoes outlast trends. Just saying. 😏"],
        about:   ["Oh, you're curious about us? Great taste already! 🇵🇭",
                  "Fun fact: every Bristol shoe is born right here in Marikina. Pretty cool, right?"],
        products:["Hmm… looking for new shoes? You came to the right place! 👀",
                  "Don't overthink it — your feet deserve the upgrade. Trust me. 😄"],
        contact: ["Need help? Drop us a message — we don't bite! 😊",
                  "We usually reply within 1–2 business days. We're busy cobblers! 🔨"]
    };

    function getPageKey() {
        if (page.includes('about'))    return 'about';
        if (page.includes('products')) return 'products';
        if (page.includes('contact'))  return 'contact';
        return 'home';
    }

    const lines = messages[getPageKey()];
    let lineIdx = 0;

    // ── Build the widget HTML ──
    const widget = document.createElement('div');
    widget.id = 'mascot-widget';
    widget.innerHTML = `
        <div id="mascot-bubble" class="mascot-bubble">
            <button id="mascot-close" class="mascot-close" aria-label="Close">×</button>
            <p id="mascot-msg" class="mascot-msg"></p>
            <button id="mascot-next" class="mascot-next">Next tip →</button>
        </div>
        <img id="mascot-img" class="mascot-img" src="images/mascot.png" alt="Brix the cobbler mascot" title="Click me!">
    `;
    document.body.appendChild(widget);

    const bubble  = document.getElementById('mascot-bubble');
    const msgEl   = document.getElementById('mascot-msg');
    const closeBtn = document.getElementById('mascot-close');
    const nextBtn  = document.getElementById('mascot-next');
    const img      = document.getElementById('mascot-img');

    // ── Typing effect ──
    function typeMessage(text) {
        msgEl.textContent = '';
        let i = 0;
        const timer = setInterval(function () {
            msgEl.textContent += text[i++];
            if (i >= text.length) clearInterval(timer);
        }, 28);
    }

    function showBubble() {
        typeMessage(lines[lineIdx]);
        bubble.classList.add('visible');
        // Hide next button if only one line
        nextBtn.style.display = lines.length > 1 ? 'inline-block' : 'none';
    }

    function hideBubble() {
        bubble.classList.remove('visible');
    }

    // Auto-show after 1.5 s
    setTimeout(showBubble, 1500);

    // Toggle on mascot click
    img.addEventListener('click', function () {
        bubble.classList.contains('visible') ? hideBubble() : showBubble();
    });

    // Close button
    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        hideBubble();
    });

    // Next tip
    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        lineIdx = (lineIdx + 1) % lines.length;
        typeMessage(lines[lineIdx]);
    });

})();
