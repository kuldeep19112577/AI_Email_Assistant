Api.requireAuth();

const rewriteBtn = document.getElementById("rewriteBtn");
const copyBtn = document.getElementById("copyBtn");

const instruction = document.getElementById("instruction");
const originalEmail = document.getElementById("originalEmail");
const rewrittenEmail = document.getElementById("rewrittenEmail");

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

rewriteBtn.addEventListener("click", async () => {

    if (!originalEmail.value.trim()) {
        notify("Please enter the original email.", "error");
        return;
    }

    if (originalEmail.value.trim().length < 10) {
        notify("Email should contain at least 10 characters.", "error");
        return;
    }

    setBusy(rewriteBtn, true, "✏️ Rewrite Email", "AI Thinking...");

    rewrittenEmail.value = "";
    copyBtn.disabled = true;

    try {

        const data = await Api.rewriteEmail(
            originalEmail.value,
            instruction.value
        );

        rewrittenEmail.value = data.rewritten_email;
        copyBtn.disabled = false;
        notify("Email rewritten!", "success");

    }
        catch (error) {

        console.error(error);
        notify(error.message || "Failed to rewrite email.", "error");

    }

    finally {
        setBusy(rewriteBtn, false, "✏️ Rewrite Email");
    }

});


copyBtn.addEventListener("click", async () => {

    if (!rewrittenEmail.value.trim()) {
        return;
    }

    try {

        await navigator.clipboard.writeText(rewrittenEmail.value);

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
