Api.requireAuth();

const composeBtn = document.getElementById("composeBtn");
const copyBtn = document.getElementById("copyBtn");

const prompt = document.getElementById("prompt");
const generatedEmail = document.getElementById("generatedEmail");

function notify(message, type) {
    if (window.Toast) {
        Toast.show(message, type);
    } else {
        alert(message);
    }
}

function setBusy(button, busy, idleLabel, busyLabel) {
    button.disabled = busy;
    if (busy) {
        button.innerHTML = `<span class="loading-dots"><span></span><span></span><span></span></span> ${busyLabel}`;
    } else {
        button.textContent = idleLabel;
    }
}

composeBtn.addEventListener("click", async () => {

    if (!prompt.value.trim()) {
        notify("Please describe your requirement.", "error");
        return;
    }

    if (prompt.value.trim().length < 10) {
        notify("Please enter at least 10 characters.", "error");
        return;
    }

    setBusy(composeBtn, true, "📧 Compose Email", "AI Thinking...");

    generatedEmail.value = "";
    copyBtn.disabled = true;

    try {

        const data = await Api.composeEmail(prompt.value);

        generatedEmail.value = data.email;
        copyBtn.disabled = false;
        notify("Email composed!", "success");

    }
        catch (error) {

        console.error(error);
        notify(error.message || "Failed to compose email.", "error");

    }

    finally {
        setBusy(composeBtn, false, "📧 Compose Email");
    }

});


copyBtn.addEventListener("click", async () => {

    if (!generatedEmail.value.trim()) {
        return;
    }

    try {

        await navigator.clipboard.writeText(generatedEmail.value);

        copyBtn.textContent = "Copied!";
        notify("Copied to clipboard!", "success");

        setTimeout(() => {
            copyBtn.textContent = "Copy Email";
        }, 2000);

    }

    catch (error) {
        notify("Failed to copy email.", "error");
    }

});
