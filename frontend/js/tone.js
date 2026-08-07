Api.requireAuth();

const toneBtn = document.getElementById("toneBtn");
const copyBtn = document.getElementById("copyBtn");

const tone = document.getElementById("tone");
const email = document.getElementById("email");
const modifiedEmail = document.getElementById("modifiedEmail");

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

toneBtn.addEventListener("click", async () => {

    if (!email.value.trim()) {
        notify("Please enter an email.", "error");
        return;
    }

    if (email.value.trim().length < 10) {
        notify("Email should contain at least 10 characters.", "error");
        return;
    }

    setBusy(toneBtn, true, "🎭 Change Tone", "AI Thinking...");

    modifiedEmail.value = "";
    copyBtn.disabled = true;

    try {

        const data = await Api.changeTone(email.value, tone.value);

        modifiedEmail.value = data.modified_email;
        copyBtn.disabled = false;
        notify("Tone updated!", "success");

    }
        catch (error) {

        console.error(error);
        notify(error.message || "Failed to change tone.", "error");

    }

    finally {
        setBusy(toneBtn, false, "🎭 Change Tone");
    }

});


copyBtn.addEventListener("click", async () => {

    if (!modifiedEmail.value.trim()) {
        return;
    }

    try {

        await navigator.clipboard.writeText(modifiedEmail.value);

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
