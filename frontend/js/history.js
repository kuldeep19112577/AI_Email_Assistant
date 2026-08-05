Api.requireAuth();

const historyContainer = document.getElementById("historyContainer");


async function loadHistory() {

    try {

        const history = await Api.getHistory();

        historyContainer.innerHTML = "";

        if (history.length === 0) {

            historyContainer.innerHTML = `
                <div class="empty-message">
                    No email history found.
                </div>
            `;

            return;
        }

        history.forEach(item => {

            const card = document.createElement("div");

            card.className = "history-card";

            card.innerHTML = `

                <div class="history-header">

                    <div class="history-feature">

                        ${item.feature}

                    </div>

                    <div class="history-date">

                        ${new Date(item.created_at).toLocaleString()}

                    </div>

                </div>

                <div class="history-section">

                    <h3>User Input</h3>

                    <div class="history-content">

                        ${item.user_input}

                    </div>

                </div>

                <div class="history-section">

                    <h3>AI Output</h3>

                    <div class="history-content">

                        ${item.ai_output}

                    </div>

                </div>

            `;

            historyContainer.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

        historyContainer.innerHTML = `

            <div class="empty-message">

                Failed to load email history.

            </div>

        `;

    }

}


loadHistory();