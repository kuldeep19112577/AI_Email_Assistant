/* =========================================================
   AI Email Assistant — Login logic
   ========================================================= */
(function () {
  'use strict';

  const MAX_PASSWORD_LENGTH = 16;

  /* ---------------------------------------------------------
     Password visibility toggle
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

  function validateEmail() {
    const val = document.getElementById('email').value.trim();
    if (!val) return setError('email', 'emailError', 'Enter your email address.');
    if (!EMAIL_RE.test(val)) return setError('email', 'emailError', 'Enter a valid email address.');
    return setError('email', 'emailError', '');
  }

  function validatePassword() {
    const val = document.getElementById('password').value;
    if (!val) return setError('password', 'passwordError', 'Enter your password.');
    if (val.length > MAX_PASSWORD_LENGTH) {
      return setError('password', 'passwordError', 'Password must be at most ' + MAX_PASSWORD_LENGTH + ' characters.');
    }
    return setError('password', 'passwordError', '');
  }

  /* ---------------------------------------------------------
     Wire up the form
     --------------------------------------------------------- */
  function init() {
    wireToggle('togglePassword', 'password');

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      const validEmail = validateEmail();
      const validPassword = validatePassword();

      if (!(validEmail && validPassword)) {
        status.style.color = 'var(--danger)';
        status.textContent = 'Please fix the errors above.';
        return;
      }

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      Api.login(email.value.trim(), password.value)
        .then(function () {
          status.style.color = 'var(--success)';
          status.textContent = 'Logged in! Redirecting…';
          window.location.href = 'index.html';
        })
        .catch(function (error) {
          status.style.color = 'var(--danger)';
          status.textContent = error.message || 'Invalid email or password.';
        })
        .finally(function () {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Api.redirectIfAuthenticated();
    init();
  });
})();