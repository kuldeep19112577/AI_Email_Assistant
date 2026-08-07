/* =========================================================
   AI Email Assistant — Central API module
   Every page includes this BEFORE its own page script:
     <script src="js/Api.js"></script>
     <script src="js/rewrite.js"></script>
   Exposes a single global: window.Api
   ========================================================= */
(function () {
  'use strict';

  const BASE_URL = window.location.origin;
  const TOKEN_KEY = "aea_access_token";
  /* ---------------------------------------------------------
     Token storage
     --------------------------------------------------------- */
  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function isAuthenticated() {
    return !!getToken();
  }

  /* ---------------------------------------------------------
     Redirect helpers
     --------------------------------------------------------- */
  // Call at the top of any page that REQUIRES login
  // (dashboard, compose, rewrite, grammar, tone, history).
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = "login.html";
    }
  }

  // Call at the top of login.html / signup.html so an already
  // logged-in user skips straight to the dashboard.
  function redirectIfAuthenticated() {
    if (isAuthenticated()) {
      window.location.href = "index.html";
    }
  }

  function logout() {
    clearToken();
    window.location.href = "login.html";
  }

  /* ---------------------------------------------------------
     Core request helper
     Automatically attaches the Bearer token (when present) and
     throws an Error with a readable message on non-2xx responses.
     On a 401, clears the token and bounces to the login page,
     since that means the session has expired or is invalid.
     --------------------------------------------------------- */
  async function request(path, options = {}) {
    const headers = Object.assign(
      {},
      options.headers || {}
    );

    const token = getToken();
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    const response = await fetch(BASE_URL + path, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      clearToken();
      window.location.href = "login.html";
      throw new Error("Session expired. Please log in again.");
    }

    let data = null;
    try {
      data = await response.json();
    } catch (_) {
      // no JSON body (e.g. some error responses) — that's fine
    }

    if (!response.ok) {
      const message =
        (data && (data.detail || data.message)) ||
        "Something went wrong. Please try again.";
      throw new Error(message);
    }

    return data;
  }

  function requestJSON(path, body, method = "POST") {
    return request(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  /* ---------------------------------------------------------
     Auth endpoints
     --------------------------------------------------------- */

  // Signup expects JSON: { full_name, email, password }
  function signup(fullName, email, password) {
    return requestJSON("/auth/signup", {
      full_name: fullName,
      email: email,
      password: password,
    });
  }

  // Login is special: the backend uses FastAPI's
  // OAuth2PasswordRequestForm, which requires
  // application/x-www-form-urlencoded with fields
  // named "username" and "password" — NOT JSON, and
  // NOT "email". This is why it can't go through
  // requestJSON above.
  async function login(email, password) {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const data = await request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    setToken(data.access_token);
    return data;
  }

  function getMe() {
    return request("/auth/me");
  }

  /* ---------------------------------------------------------
     Feature endpoints
     All of these require the user to be logged in — the
     backend enforces it, and the 401 handler above will
     bounce to login.html automatically if the token is
     missing or expired.
     --------------------------------------------------------- */

  function generateEmail(emailType, recipient, tone, purpose) {
    return requestJSON("/email/generate", {
      email_type: emailType,
      recipient: recipient,
      tone: tone,
      purpose: purpose,
    });
  }

  function composeEmail(prompt) {
    return requestJSON("/compose/", { prompt: prompt });
  }

  function rewriteEmail(originalEmail, instruction) {
    return requestJSON("/rewrite/", {
      original_email: originalEmail,
      instruction: instruction,
    });
  }

  function checkGrammar(text) {
    return requestJSON("/grammar/", { text: text });
  }

  function changeTone(email, tone) {
    return requestJSON("/tone/", { email: email, tone: tone });
  }

  function getHistory() {
    return request("/history/", { method: "GET" });
  }

  /* ---------------------------------------------------------
     Public API
     --------------------------------------------------------- */
  window.Api = {
    // auth
    signup,
    login,
    logout,
    getMe,
    isAuthenticated,
    requireAuth,
    redirectIfAuthenticated,
    // features
    generateEmail,
    composeEmail,
    rewriteEmail,
    checkGrammar,
    changeTone,
    getHistory,
  };
})();
