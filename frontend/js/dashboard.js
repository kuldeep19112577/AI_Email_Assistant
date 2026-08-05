// ================================
// Dashboard JavaScript
// ================================

Api.requireAuth();

document.addEventListener("DOMContentLoaded", () => {

    const disabledCards = document.querySelectorAll(".disabled");

    disabledCards.forEach(card => {

        card.addEventListener("click", (event) => {

            event.preventDefault();

            alert("This feature will be available in upcoming updates.");

        });

    });

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            Api.logout();

        });

    }

});