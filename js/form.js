// ============================================================
//  Bristol Shoes — form.js
//  Nagva-validate ng contact form bago i-send ang data.
//  Purpose: siguruhing hindi mapapadala ang fake, empty, o maling data.
//  Gumagamit ng Formspree (third-party service) para sa actual na pag-send ng email.
// ============================================================

// DOMContentLoaded = hintayin munang tapos na mag-load ang buong HTML bago mag-run ang code.
// Kailangan ito para siguradong nandoon na ang form elements bago nating hanapin sila via getElementById.
document.addEventListener('DOMContentLoaded', function () {

    // ── I-GRAB ANG LAHAT NG FORM ELEMENTS ────────────────────
    // Kinukuha naten ang references sa bawat form field at sa success message box.
    // Parang sinasabi naten: "Hoy browser, ituro mo sa akin yung mga element na ito."
    const form       = document.getElementById('contact-form'); // Yung buong form
    const nameIn     = document.getElementById('name');         // Name input field
    const emailIn    = document.getElementById('email');        // Email input field
    const phoneIn    = document.getElementById('phone');        // Phone input field (optional)
    const msgIn      = document.getElementById('message');      // Message textarea
    const successBox = document.getElementById('form-success'); // Yung green success message (hidden by default)

    // ── REAL-TIME EMAIL VALIDATION ────────────────────────────
    // Pag nag-type ang user sa email field (bawat keystroke), ina-validate agad natin.
    // Hindi kailangan pa mag-submit para malaman na mali ang format ng email.
    // Regex pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //   - [^\s@]+ = isa o higit pang characters na hindi space o @
    //   - @ = kailangan ng @ sign sa gitna
    //   - \.[^\s@]+ = kailangan ng period at domain extension (.com, .net, etc.)
    //   - Halimbawa valid: juan@gmail.com | Invalid: juangmail.com o juan@
    emailIn.addEventListener('input', function () {
        const val = this.value.trim(); // Alisin ang extra spaces sa simula at dulo
        const isReal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); // i-test kung valid ang format
        // setStatus() = helper function (nasa ibaba) na nagtatago/nagpapakita ng error message
        // Pag valid o blangko pa: ok. Pag may laman pero mali ang format: show error.
        setStatus(this, isReal || val === '', isReal ? '' : 'Please enter a valid email (e.g. juan@gmail.com).');
    });

    // ── REAL-TIME PHONE VALIDATION ────────────────────────────
    // Optional ang phone field — kung blangko, okay lang.
    // Pero kung may nilaman, dapat Philippine format lang: 09XXXXXXXXX o +639XXXXXXXXX.
    // Regex: /^(\+639|09)\d{9}$/
    //   - (\+639|09) = dapat mag-start sa "+639" o "09"
    //   - \d{9}$ = tapos 9 digits ang susunod (total = 11 digits para sa 09, 12 para sa +639)
    phoneIn.addEventListener('input', function () {
        const val = this.value.trim();
        if (val === '') { clearStatus(this); return; } // Kung blangko, clear ang status — walang error
        const isReal = /^(\+639|09)\d{9}$/.test(val.replace(/\s/g, '')); // Tanggalin ang spaces bago mag-test
        setStatus(this, isReal, isReal ? '' : 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
    });

    // ── FORM SUBMIT HANDLER ───────────────────────────────────
    // Pag clinick ang "Send Message" button, dini-detect nito ang "submit" event.
    // e.preventDefault() = hinarangan naten ang default na behavior ng form (mag-reload ng page).
    // Sa halip, isa-isa naming vina-validate ang bawat field bago mag-send.
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Huwag mag-reload — kami na ang bahala

        let valid = true; // Flag — pag naging false ito, hindi na mag-se-send ang form

        // ── Name validation ──
        // Regex: /^[a-zA-ZÀ-ÿ\s'-]{2,}$/
        //   - [a-zA-ZÀ-ÿ] = letters (kasama ang may accent like é, ñ, etc.)
        //   - \s'-  = spaces, apostrophes (O'Brien), hyphens (Garcia-Santos) ay pwede
        //   - {2,}  = minimum 2 characters
        const name = nameIn.value.trim();
        if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(name)) {
            setStatus(nameIn, false, 'Please enter a real name.');
            valid = false; // Mark as invalid — hindi na mag-se-send ang form
        }

        // ── Email validation ──
        // Same regex pattern ng real-time validator sa itaas.
        const email = emailIn.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus(emailIn, false, 'Please enter a valid email.');
            valid = false;
        }

        // ── Phone validation (optional field) ──
        // Gumagamit ng short-circuit: kung phone ay hindi blangko (&&), then validate.
        // Kung blangko, presto — skip na, walang error.
        const phone = phoneIn.value.trim();
        if (phone && !/^(\+639|09)\d{9}$/.test(phone.replace(/\s/g, ''))) {
            setStatus(phoneIn, false, 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
            valid = false;
        }

        // ── Message validation ──
        // Kailangan ng minimum 10 characters para hindi lang basta "ok" o "hi" ang messages.
        // .length < 10 = kulang sa minimum na haba
        if (msgIn.value.trim().length < 10) {
            setStatus(msgIn, false, 'Message must be at least 10 characters.');
            valid = false;
        }

        // ── Kung valid lahat, i-SEND na sa Formspree ──────────
        // Formspree = third-party service na nag-co-convert ng form submissions papuntang email.
        // Hindi tayo kailangan ng sariling server — sinesend lang natin ang data sa Formspree URL
        // at sila na ang mag-fo-forward ng email sa bristolshoes@hotmail.com.
        if (valid) {
            const formData = {
                name:    nameIn.value.trim(),
                email:   emailIn.value.trim(),
                phone:   phoneIn.value.trim(),
                message: msgIn.value.trim()
            };

            // Habang nagse-send, i-disable ang button at baguhin ang text para hindi maka-double submit.
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // fetch() = modern way para mag-send ng HTTP request.
            // Ito ang nag-po-POST ng data (JSON format) sa Formspree server.
            // method: 'POST'   = nagpapadala ng data (hindi lang nagkukuha)
            // headers           = sinasabi sa server na JSON ang format ng data natin
            // body: JSON.stringify(formData) = kino-convert ang JS object sa JSON string para sa pagpapadala
            fetch('https://formspree.io/f/xojyokdo', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body:    JSON.stringify(formData)
            })
            // .then() = pag dumating na ang response mula sa Formspree server...
            .then(function (response) {
                if (response.ok) {
                    // response.ok = true pag success (HTTP status 200-299)
                    // Itago ang form at ipakita ang success message
                    form.style.display = 'none';
                    successBox.style.display = 'block';
                } else {
                    // May problema sa server — i-enable ulit ang button para makapag-retry
                    alert('Something went wrong. Please try again.');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            })
            // .catch() = pag walang internet connection o hindi ma-reach ang server
            .catch(function () {
                alert('No internet connection. Please check your connection and try again.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        }
    });


    // ── HELPER FUNCTIONS ──────────────────────────────────────

    // clearStatus() — nag-aalis ng lahat ng validation indicators sa isang field.
    // Tinatawag ito pag blangko na ang optional field (phone) — walang error, walang ok indicator.
    function clearStatus(input) {
        const group = input.closest('.form-group'); // Hanapin ang parent .form-group container
        group.classList.remove('field-ok', 'field-err'); // Tanggalin ang green/red border indicators
        const errEl = group.querySelector('.field-error'); // Hanapin ang error message span
        if (errEl) errEl.textContent = ''; // Burahin ang error text
    }

    // setStatus() — naglalagay ng visual feedback sa isang form field.
    // isOk = true  → green border (.field-ok), walang error message
    // isOk = false → red border (.field-err), may error message na lilitaw
    // Ginagamit ito para real-time na makita ng user kung tama o mali ang input nila.
    function setStatus(input, isOk, msg) {
        const group = input.closest('.form-group');     // Parent container ng input
        group.classList.toggle('field-ok',  isOk);     // Add .field-ok pag valid, remove pag hindi
        group.classList.toggle('field-err', !isOk);    // Add .field-err pag invalid, remove pag hindi
        const errEl = group.querySelector('.field-error');
        if (errEl) errEl.textContent = msg || '';       // Lagyan ng error text o burahin kung valid
    }

});
