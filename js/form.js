// ============================================================
//  Bristol Shoes - Contact Form Validation
//  This file handles all the smart form checks
//  so users can't send fake/empty data.
// ============================================================


// Wait for the page to fully load bago mag run tong event listener na to.
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');
    const nameIn = document.getElementById('name');
    const emailIn = document.getElementById('email');
    const phoneIn = document.getElementById('phone');
    const msgIn = document.getElementById('message');
    const pwIn = document.getElementById('password');
    const pwBar = document.getElementById('pw-strength-bar');
    const pwText = document.getElementById('pw-strength-text');
    const successBox = document.getElementById('form-success');

    // Name form validation to (no numbers, no symbols) just text characters lang po.
    nameIn.addEventListener('input', function () {
        const val = this.value.trim();
    });

    // Email must have @ and a proper domain para di made up yung input ni user.
    emailIn.addEventListener('input', function () {
        const val = this.value.trim();
        const isReal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        setStatus(this, isReal || val === '', isReal ? '' : 'Please enter a valid email (e.g. juan@gmail.com).');
    });

    // Phone must be PH format (09XXXXXXXXX or +639XXXXXXXXX) since local users palang nakaka access ng web.
    phoneIn.addEventListener('input', function () {
        const val = this.value.trim();
        if (val === '') { clearStatus(this); return; }
        // Accepts 09XXXXXXXXX or +639XXXXXXXXX format
        const isReal = /^(\+639|09)\d{9}$/.test(val.replace(/\s/g, ''));
        setStatus(this, isReal, isReal ? '' : 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
    });

    // Password strength meter eto yung bar meter na me measure kung gano ka weak/strong yung password ni user.
    pwIn.addEventListener('input', function () {
        const val = this.value;
        const score = getStrength(val);

        // Bar colors ng password strength meter naten.
        const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71'];
        const widths = ['0%', '25%', '50%', '75%', '100%'];

        pwBar.style.width = val.length > 0 ? widths[score] : '0%';
        pwBar.style.background = colors[score];
        pwText.textContent = val.length > 0 ? levels[score] : '';
        pwText.style.color = colors[score];

        if (val.length === 0) { clearStatus(this); return; }
        setStatus(this, score >= 3, score < 3 ? 'Add uppercase, numbers, or symbols to strengthen.' : '');
    });

    // Check everything before sending
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Para di mag reload yung page after submit, since wala naman tayong server na pag susubmitan ng data, we just show a success message instead.

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

        // Phone check (optional but if filled, must be correct format)
        const phone = phoneIn.value.trim();
        if (phone && !/^(\+639|09)\d{9}$/.test(phone.replace(/\s/g, ''))) {
            setStatus(phoneIn, false, 'Use PH format: 09XXXXXXXXX or +639XXXXXXXXX');
            valid = false;
        }

        // Password check
        const pw = pwIn.value;
        if (getStrength(pw) < 3) {
            setStatus(pwIn, false, 'Password is too weak. Make it stronger.');
            valid = false;
        }

        // Message check
        if (msgIn.value.trim().length < 10) {
            setStatus(msgIn, false, 'Message must be at least 10 characters.');
            valid = false;
        }

        // ── If all valid, send to Formspree ──
        if (valid) {

            // Collect all the form field values into one object
            const formData = {
                name:     nameIn.value.trim(),
                email:    emailIn.value.trim(),
                phone:    phoneIn.value.trim(),
                message:  msgIn.value.trim()
                // Note: we don't send the password to Formspree on purpose
            };

            // Show a "sending..." state so user knows it's working
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // fetch() sends the data to Formspree in the background eto yung 3rd Party API naten for data storage since wala naman tayong sariling server, so we use Formspree para ma handle yung form submissions.
            fetch('https://formspree.io/f/xojyokdo', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body:    JSON.stringify(formData)   // converts the object to JSON text
            })
            .then(function(response) {
                if (response.ok) {
                    // Formspree accepted it show success screen
                    form.style.display = 'none';
                    successBox.style.display = 'block';
                } else {
                    // Formspree returned an error
                    alert('Something went wrong sending your message. Please try again.');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }
            })
            .catch(function() {
                // Network error (no internet, etc.)
                alert('No internet connection. Please check your connection and try again.');
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        }
    });


    // Helpers 

    // Clears any status from a field
    function clearStatus(input) {
        const group = input.closest('.form-group');
        group.classList.remove('field-ok', 'field-err');
        const errEl = group.querySelector('.field-error');
        if (errEl) errEl.textContent = '';
    }

    // Returns 1-4 strength score for a password
    function getStrength(pw) {
        let score = 0;
        if (pw.length >= 8) score++; // min length
        if (/[A-Z]/.test(pw)) score++; // has uppercase
        if (/[0-9]/.test(pw)) score++; // has number
        if (/[^a-zA-Z0-9]/.test(pw)) score++; // has symbol
        return score;
    }

});
