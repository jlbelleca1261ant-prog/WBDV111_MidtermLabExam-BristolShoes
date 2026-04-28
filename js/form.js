// ============================================================
//  Bristol Shoes - Contact Form Validation
//  Handles smart form checks so users can't send fake/empty data.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    const form       = document.getElementById('contact-form');
    const nameIn     = document.getElementById('name');
    const emailIn    = document.getElementById('email');
    const phoneIn    = document.getElementById('phone');
    const msgIn      = document.getElementById('message');
    const successBox = document.getElementById('form-success');

    // Email: must have @ and a proper domain
    emailIn.addEventListener('input', function () {
        const val = this.value.trim();
        const isReal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        setStatus(this, isReal || val === '', isReal ? '' : 'Please enter a valid email (e.g. juan@gmail.com).');
    });

    // Phone: PH format only (09XXXXXXXXX or +639XXXXXXXXX), optional field
    phoneIn.addEventListener('input', function () {
        const val = this.value.trim();
        if (val === '') { clearStatus(this); return; }
        const isReal = /^(\+639|09)\d{9}$/.test(val.replace(/\s/g, ''));
        setStatus(this, isReal, isReal ? '' : 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
    });

    // Submit: validate all fields before sending to Formspree
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let valid = true;

        // Name check
        const name = nameIn.value.trim();
        if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(name)) {
            setStatus(nameIn, false, 'Please enter a real name.');
            valid = false;
        }

        // Email check
        const email = emailIn.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus(emailIn, false, 'Please enter a valid email.');
            valid = false;
        }

        // Phone check (optional — only validate if filled)
        const phone = phoneIn.value.trim();
        if (phone && !/^(\+639|09)\d{9}$/.test(phone.replace(/\s/g, ''))) {
            setStatus(phoneIn, false, 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
            valid = false;
        }

        // Message check
        if (msgIn.value.trim().length < 10) {
            setStatus(msgIn, false, 'Message must be at least 10 characters.');
            valid = false;
        }

        // If all valid, send to Formspree
        if (valid) {
            const formData = {
                name:    nameIn.value.trim(),
                email:   emailIn.value.trim(),
                phone:   phoneIn.value.trim(),
                message: msgIn.value.trim()
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // fetch() sends data to Formspree (no server needed)
            fetch('https://formspree.io/f/xojyokdo', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body:    JSON.stringify(formData)
            })
            .then(function (response) {
                if (response.ok) {
                    form.style.display = 'none';
                    successBox.style.display = 'block';
                } else {
                    alert('Something went wrong. Please try again.');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            })
            .catch(function () {
                alert('No internet connection. Please check your connection and try again.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        }
    });


    // ── Helpers ──

    function clearStatus(input) {
        const group = input.closest('.form-group');
        group.classList.remove('field-ok', 'field-err');
        const errEl = group.querySelector('.field-error');
        if (errEl) errEl.textContent = '';
    }

    function setStatus(input, isOk, msg) {
        const group = input.closest('.form-group');
        group.classList.toggle('field-ok', isOk);
        group.classList.toggle('field-err', !isOk);
        const errEl = group.querySelector('.field-error');
        if (errEl) errEl.textContent = msg || '';
    }

});
