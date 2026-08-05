Api.requireAuth();

const historyContainer = document.getElementById("historyContainer");
const historySearch = document.getElementById("historySearch");
const historyFilter = document.getElementById("historyFilter");
const historySort = document.getElementById("historySort");
const historyPagination = document.getElementById("historyPagination");

const PAGE_SIZE = 6;

let allHistory = [];
let currentPage = 1;

function escapeHTML(str) {
    return String(str || "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[ch]));
}

function getFilteredHistory() {
    const query = (historySearch.value || "").trim().toLowerCase();
    const feature = historyFilter.value;
    const sort = historySort.value;

    let result = allHistory.filter((item) => {
        const matchesFeature = feature === "All" || item.feature === feature;

        const haystack = `${item.user_input || ""} ${item.ai_output || ""}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);

        return matchesFeature && matchesQuery;
    });

    result.sort((a, b) => {
        const diff = new Date(a.created_at) - new Date(b.created_at);
        return sort === "oldest" ? diff : -diff;
    });

    return result;
}

function renderPagination(totalItems) {
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

    if (currentPage > totalPages) currentPage = totalPages;

    if (totalPages <= 1) {
        historyPagination.innerHTML = "";
        return;
    }

    let buttons = `
        <button id="prevPageBtn" ${currentPage === 1 ? "disabled" : ""}>‹</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        buttons += `
            <button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>
        `;
    }

    buttons += `
        <button id="nextPageBtn" ${currentPage === totalPages ? "disabled" : ""}>›</button>
    `;

    historyPagination.innerHTML = buttons;

    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");

    if (prevBtn) prevBtn.addEventListener("click", () => { currentPage -= 1; renderHistory(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { currentPage += 1; renderHistory(); });

    historyPagination.querySelectorAll(".page-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page, 10);
            renderHistory();
        });
    });
}

function renderHistory() {
    const filtered = getFilteredHistory();

    if (filtered.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-message">
                No matching email history found.
            </div>
        `;
        historyPagination.innerHTML = "";
        return;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    historyContainer.innerHTML = pageItems
        .map((item) => `
            <div class="history-card">

                <div class="history-header">

                    <div class="history-feature">
                        ${escapeHTML(item.feature)}
                    </div>

                    <div class="history-date">
                        ${new Date(item.created_at).toLocaleString()}
                    </div>

                </div>

                <div class="history-section">
                    <h3>User Input</h3>
                    <div class="history-content">${escapeHTML(item.user_input)}</div>
                </div>

                <div class="history-section">
                    <h3>AI Output</h3>
                    <div class="history-content">${escapeHTML(item.ai_output)}</div>
                </div>

            </div>
        `)
        .join("");

    renderPagination(filtered.length);
}

async function loadHistory() {
    try {
        allHistory = await Api.getHistory();

        if (allHistory.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-message">
                    No email history found.
                </div>
            `;
            return;
        }

        renderHistory();
    } catch (error) {
        console.error(error);
        historyContainer.innerHTML = `
            <div class="empty-message">
                Failed to load email history.
            </div>
        `;
        if (window.Toast) Toast.error(error.message || "Failed to load email history.");
    }
}

historySearch.addEventListener("input", () => { currentPage = 1; renderHistory(); });
historyFilter.addEventListener("change", () => { currentPage = 1; renderHistory(); });
historySort.addEventListener("change", () => { currentPage = 1; renderHistory(); });

loadHistory();
