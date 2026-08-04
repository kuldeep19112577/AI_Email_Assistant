// ================================
// Dashboard JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const disabledCards = document.querySelectorAll(".disabled");

    disabledCards.forEach(card => {

        card.addEventListener("click", (event) => {

            event.preventDefault();

            alert("This feature will be available in upcoming updates.");

        });

    });

});