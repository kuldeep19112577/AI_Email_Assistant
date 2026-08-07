// ================================
// Dashboard JavaScript
// ================================

Api.requireAuth();

const FEATURE_ICON = {
    Generate: "✨",
    Rewrite: "✏️",
    Grammar: "✔️",
    Tone: "🎭",
    Compose: "📧",
};

function excerpt(text, max) {
    if (!text) return "";
    const clean = text.trim().replace(/\s+/g, " ");
    return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

function renderStats(history) {
    const counts = { Generate: 0, Rewrite: 0, Grammar: 0, Tone: 0, Compose: 0 };

    history.forEach((item) => {
        if (counts.hasOwnProperty(item.feature)) {
            counts[item.feature] += 1;
        }
    });

    const map = {
        statGenerate: counts.Generate,
        statRewrite: counts.Rewrite,
        statGrammar: counts.Grammar,
        statTone: counts.Tone,
        statCompose: counts.Compose,
    };

    Object.keys(map).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = map[id];
    });
}

function renderRecentActivity(history) {
    const container = document.getElementById("recentActivityList");
    if (!container) return;

    if (!history.length) {
        container.innerHTML = `
            <div class="empty-message">
                No activity yet — try generating your first email!
            </div>
        `;
        return;
    }

    const sorted = [...history].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const recent = sorted.slice(0, 6);

    container.innerHTML = recent
        .map((item) => {
            const icon = FEATURE_ICON[item.feature] || "📄";
            const date = new Date(item.created_at).toLocaleString();

            return `
                <div class="activity-item">
                    <div class="activity-icon">${icon}</div>
                    <div class="activity-body">
                        <div class="activity-title">${item.feature}</div>
                        <div class="activity-excerpt">${excerpt(item.user_input, 90)}</div>
                    </div>
                    <div class="activity-date">${date}</div>
                </div>
            `;
        })
        .join("");
}

async function loadDashboard() {
    try {
        const history = await Api.getHistory();
        renderStats(history);
        renderRecentActivity(history);
    } catch (error) {
        console.error(error);
        renderStats([]);

        const container = document.getElementById("recentActivityList");
        if (container) {
            container.innerHTML = `
                <div class="empty-message">
                    Failed to load recent activity.
                </div>
            `;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();

    document.addEventListener("aea:user-loaded", (event) => {
        const nameEl = document.getElementById("dashUserName");
        if (nameEl && event.detail) {
            const fullName = event.detail.full_name || event.detail.name || "there";
            nameEl.textContent = fullName.split(" ")[0];
        }
    });
});
