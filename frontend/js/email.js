Api.requireAuth();

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const emailType = document.getElementById("emailType");
const recipient = document.getElementById("recipient");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

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

generateBtn.addEventListener("click", async () => {

    if (!recipient.value.trim()) {
        notify("Please enter the recipient.", "error");
        return;
    }

    if (!purpose.value.trim()) {
        notify("Please enter the purpose.", "error");
        return;
    }

    if (purpose.value.trim().length < 10) {
        notify("Purpose should contain at least 10 characters.", "error");
        return;
    }

    setBusy(generateBtn, true, "✨ Generate Email", "AI Thinking...");

    generatedEmail.value = "";
    copyBtn.disabled = true;

    try {

        const data = await Api.generateEmail(
            emailType.value,
            recipient.value,
            tone.value,
            purpose.value
        );

        generatedEmail.value = data.generated_email;
        copyBtn.disabled = false;
        notify("Email generated!", "success");

    }
        catch (error) {

        console.error(error);
        notify(error.message || "Failed to generate email.", "error");

    }

    finally {
        setBusy(generateBtn, false, "✨ Generate Email");
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
