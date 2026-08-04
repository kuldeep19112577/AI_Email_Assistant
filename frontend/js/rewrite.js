const rewriteBtn = document.getElementById("rewriteBtn");
const copyBtn = document.getElementById("copyBtn");

const instruction = document.getElementById("instruction");
const originalEmail = document.getElementById("originalEmail");
const rewrittenEmail = document.getElementById("rewrittenEmail");

rewriteBtn.addEventListener("click", async () => {

    // Validate input
    if (!originalEmail.value.trim()) {
        alert("Please enter an email.");
        return;
    }

    if (originalEmail.value.trim().length < 10) {
        alert("Email is too short.");
        return;
    }

    // Loading state
    rewriteBtn.innerText = "Rewriting...";
    rewriteBtn.disabled = true;

    // Clear previous result
    rewrittenEmail.value = "";
    copyBtn.disabled = true;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/rewrite/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    original_email: originalEmail.value,
                    instruction: instruction.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail);
        }

        // Display rewritten email
        rewrittenEmail.value = data.rewritten_email;

        // Enable copy button
        copyBtn.disabled = false;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to rewrite the email.\n\nPlease try again."
        );

    } finally {

        rewriteBtn.innerText = "Rewrite Email";
        rewriteBtn.disabled = false;

    }

});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        rewrittenEmail.value
    );

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy Email";
    }, 2000);

});