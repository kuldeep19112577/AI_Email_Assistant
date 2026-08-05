/* =========================================================
   AI Email Assistant — Common shell (common.js)
   Runs on every authenticated page AFTER Api.js.
   Responsibilities:
     - Build the sidebar + topbar app shell around the
       page's existing <main> / <footer> elements.
     - Dark mode toggle (persisted in localStorage).
     - Toast notifications (window.Toast.show).
     - Load the logged-in user's name/email into the sidebar.
     - Wire the logout button.
   ========================================================= */

(function () {
    "use strict";

    const THEME_KEY = "aea_theme";

    const NAV_ITEMS = [
        { href: "index.html", label: "Dashboard", icon: "🏠" },
        { href: "email.html", label: "Generate", icon: "✨" },
        { href: "rewrite.html", label: "Rewrite", icon: "✏️" },
        { href: "grammar.html", label: "Grammar", icon: "✔️" },
        { href: "tone.html", label: "Tone", icon: "🎭" },
        { href: "compose.html", label: "Compose", icon: "📧" },
        { href: "history.html", label: "History", icon: "📜" },
    ];

    const PAGE_TITLES = {
        "index.html": "Dashboard",
        "email.html": "Generate Email",
        "rewrite.html": "Rewrite Email",
        "grammar.html": "Grammar Check",
        "tone.html": "Tone Change",
        "compose.html": "Compose Email",
        "history.html": "Email History",
    };

    /* -----------------------------------------------------
       Theme
       ----------------------------------------------------- */
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || "light";
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        const btn = document.getElementById("themeToggleBtn");
        if (btn) {
            btn.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    function initThemeEarly() {
        applyTheme(getSavedTheme());
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    }

    /* -----------------------------------------------------
       Toasts
       ----------------------------------------------------- */
    function getToastContainer() {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type) {
        const container = getToastContainer();

        const toast = document.createElement("div");
        toast.className = "toast" + (type ? " toast-" + type : "");

        const icon = type === "success" ? "✓" : type === "error" ? "⚠" : "ℹ";
        toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast-out");
            setTimeout(() => toast.remove(), 220);
        }, 3200);
    }

    window.Toast = {
        show: showToast,
        success: (msg) => showToast(msg, "success"),
        error: (msg) => showToast(msg, "error"),
        info: (msg) => showToast(msg, "info"),
    };

    /* -----------------------------------------------------
       Shell building
       ----------------------------------------------------- */
    function currentPage() {
        const path = window.location.pathname.split("/").pop();
        return path === "" ? "index.html" : path;
    }

    function initials(name) {
        if (!name) return "?";
        const parts = name.trim().split(/\s+/);
        const first = parts[0] ? parts[0][0] : "";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase();
    }

    function buildSidebarHTML(activePage) {
        const navHTML = NAV_ITEMS.map((item) => {
            const activeClass = item.href === activePage ? " active" : "";
            return `
                <a href="${item.href}" class="nav-link${activeClass}">
                    <span class="nav-icon">${item.icon}</span>
                    <span class="nav-label">${item.label}</span>
                </a>
            `;
        }).join("");

        return `
            <div class="sidebar-brand">
                <div class="brand-mark">📩</div>
                <div class="brand-text">AI Email Assistant</div>
            </div>

            <nav class="sidebar-nav">
                ${navHTML}
            </nav>

            <div class="sidebar-footer">
                <button id="logoutBtn" class="sidebar-logout" type="button">
                    <span class="nav-icon">🚪</span>
                    <span class="nav-label">Logout</span>
                </button>

                <div class="sidebar-user">
                    <div class="avatar" id="sidebarAvatar">?</div>
                    <div class="user-meta">
                        <div class="user-name" id="sidebarUserName">Loading…</div>
                        <div class="user-email" id="sidebarUserEmail"></div>
                    </div>
                </div>
            </div>
        `;
    }

    function buildTopbarHTML(title) {
        const savedTheme = getSavedTheme();
        const themeIcon = savedTheme === "dark" ? "☀️" : "🌙";

        return `
            <div class="topbar-left">
                <button class="icon-btn sidebar-toggle" id="sidebarToggleBtn" type="button" aria-label="Toggle menu">☰</button>
                <div class="topbar-title">${title}</div>
            </div>
            <div class="topbar-actions">
                <button class="icon-btn" id="themeToggleBtn" type="button" aria-label="Toggle dark mode">${themeIcon}</button>
            </div>
        `;
    }

    function mountShell() {
        const page = currentPage();
        const title = PAGE_TITLES[page] || "AI Email Assistant";

        // Remove any legacy inline navbar left over from the old markup.
        const legacyNav = document.querySelector("nav.navbar");
        if (legacyNav) legacyNav.remove();

        const existingMain = document.querySelector("body > main");
        let existingFooter = document.querySelector("body > footer");

        const sidebar = document.createElement("aside");
        sidebar.className = "sidebar";
        sidebar.id = "sidebar";
        sidebar.innerHTML = buildSidebarHTML(page);

        const topbar = document.createElement("header");
        topbar.className = "topbar";
        topbar.innerHTML = buildTopbarHTML(title);

        const mainWrap = document.createElement("div");
        mainWrap.className = "main-wrap";
        mainWrap.appendChild(topbar);

        if (existingMain) {
            mainWrap.appendChild(existingMain);
        }

        if (!existingFooter) {
            existingFooter = document.createElement("footer");
        }
        existingFooter.className = "app-footer";
        existingFooter.innerHTML = `
            <p><strong>AI Email Assistant</strong> · Powered by Gemini · Version 1.0 · © 2026 Team Nexturn</p>
        `;
        mainWrap.appendChild(existingFooter);

        const shell = document.createElement("div");
        shell.className = "app-shell";
        shell.appendChild(sidebar);
        shell.appendChild(mainWrap);

        document.body.insertBefore(shell, document.body.firstChild);

        wireShellEvents();
        loadUserProfile();
    }

    function wireShellEvents() {
        const themeBtn = document.getElementById("themeToggleBtn");
        if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                if (window.Api && typeof Api.logout === "function") {
                    Api.logout();
                }
            });
        }

        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("sidebarToggleBtn");
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener("click", () => {
                sidebar.classList.toggle("open");
            });
        }

        document.addEventListener("click", (event) => {
            if (!sidebar || !sidebar.classList.contains("open")) return;
            if (sidebar.contains(event.target) || event.target === toggleBtn) return;
            sidebar.classList.remove("open");
        });
    }

    async function loadUserProfile() {
        if (!window.Api || typeof Api.getMe !== "function") return;

        const nameEl = document.getElementById("sidebarUserName");
        const emailEl = document.getElementById("sidebarUserEmail");
        const avatarEl = document.getElementById("sidebarAvatar");

        try {
            const me = await Api.getMe();
            const name = me.full_name || me.name || "User";
            const email = me.email || "";

            if (nameEl) nameEl.textContent = name;
            if (emailEl) emailEl.textContent = email;
            if (avatarEl) avatarEl.textContent = initials(name);

            document.dispatchEvent(new CustomEvent("aea:user-loaded", { detail: me }));
        } catch (error) {
            if (nameEl) nameEl.textContent = "User";
            if (emailEl) emailEl.textContent = "";
        }
    }

    /* -----------------------------------------------------
       Boot
       ----------------------------------------------------- */
    initThemeEarly();

    document.addEventListener("DOMContentLoaded", () => {
        mountShell();
    });
})();
