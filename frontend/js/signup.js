/* =========================================================
   AI Email Assistant — Signup logic
   ========================================================= */
(function () {
  'use strict';

  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 16;

  /* ---------------------------------------------------------
     Password visibility toggles
     --------------------------------------------------------- */
  function wireToggle(buttonId, inputId) {
    const btn = document.getElementById(buttonId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.querySelector('.icon-eye').style.display = isHidden ? 'none' : 'block';
      btn.querySelector('.icon-eye-off').style.display = isHidden ? 'block' : 'none';
      btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  }

  /* ---------------------------------------------------------
     Password strength
     --------------------------------------------------------- */
  function scorePassword(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  }

  const strengthLabels = ['Too weak', 'Weak', 'Okay', 'Good', 'Strong'];

  function updateStrengthMeter(pw) {
    const meter = document.getElementById('strengthMeter');
    const label = document.getElementById('strengthLabel');
    if (!meter || !label) return;

    meter.classList.remove('s1', 's2', 's3', 's4');

    if (!pw) {
      label.innerHTML = '&nbsp;';
      return;
    }

    const score = scorePassword(pw);
    if (score > 0) meter.classList.add('s' + score);
    label.textContent = strengthLabels[score];
  }

  /* ---------------------------------------------------------
     Validation
     --------------------------------------------------------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    const wrapper = field.closest('.field');

    if (message) {
      wrapper.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
    return !message;
  }

  function validateFullName() {
    const val = document.getElementById('fullName').value.trim();
    if (!val) return setError('fullName', 'fullNameError', 'Enter your full name.');
    if (val.length < 2) return setError('fullName', 'fullNameError', 'That name looks too short.');
    return setError('fullName', 'fullNameError', '');
  }

  function validateEmail() {
    const val = document.getElementById('email').value.trim();
    if (!val) return setError('email', 'emailError', 'Enter your email address.');
    if (!EMAIL_RE.test(val)) return setError('email', 'emailError', 'Enter a valid email address.');
    return setError('email', 'emailError', '');
  }

  function validatePassword() {
    const val = document.getElementById('password').value;
    if (!val) return setError('password', 'passwordError', 'Enter a password.');
    if (val.length < MIN_PASSWORD_LENGTH) {
      return setError('password', 'passwordError', 'Use at least ' + MIN_PASSWORD_LENGTH + ' characters.');
    }
    if (val.length > MAX_PASSWORD_LENGTH) {
      return setError('password', 'passwordError', 'Use at most ' + MAX_PASSWORD_LENGTH + ' characters.');
    }
    return setError('password', 'passwordError', '');
  }

  function validateConfirmPassword() {
    const pw = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (!confirm) return setError('confirmPassword', 'confirmPasswordError', 'Re-enter your password.');
    if (pw !== confirm) return setError('confirmPassword', 'confirmPasswordError', 'Passwords do not match.');
    return setError('confirmPassword', 'confirmPasswordError', '');
  }

  /* ---------------------------------------------------------
     Wire up the form
     --------------------------------------------------------- */
  function init() {
    wireToggle('togglePassword', 'password');
    wireToggle('toggleConfirmPassword', 'confirmPassword');

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const googleBtn = document.getElementById('googleSignup');

    fullName.addEventListener('blur', validateFullName);
    email.addEventListener('blur', validateEmail);

    password.addEventListener('input', function () {
      updateStrengthMeter(password.value);
      if (confirmPassword.value) validateConfirmPassword();
    });
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);
    confirmPassword.addEventListener('input', function () {
      if (confirmPassword.value) validateConfirmPassword();
    });

    googleBtn.addEventListener('click', function () {
      status.style.color = 'var(--text-muted)';
      status.textContent = 'Google sign-up is not connected yet.';
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      const validName = validateFullName();
      const validEmail = validateEmail();
      const validPassword = validatePassword();
      const validConfirm = validateConfirmPassword();

      if (!(validName && validEmail && validPassword && validConfirm)) {
        status.style.color = 'var(--danger)';
        status.textContent = 'Please fix the errors above.';
        return;
      }

      const payload = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value,
      };

      // TODO: replace with a real API call (api.js -> POST /api/auth/signup)
      // once the backend endpoint exists.
      console.log('Signup submitted:', payload);

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        status.style.color = 'var(--success)';
        status.textContent = 'Account created! (demo only — no backend connected yet)';
        form.reset();
        updateStrengthMeter('');
      }, 900);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();