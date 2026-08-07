Api.requireAuth();

const grammarBtn = document.getElementById("grammarBtn");
const copyBtn = document.getElementById("copyBtn");

const inputText = document.getElementById("inputText");
const correctedText = document.getElementById("correctedText");

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

grammarBtn.addEventListener("click", async () => {

    if (!inputText.value.trim()) {
        notify("Please enter some text.", "error");
        return;
    }

    if (inputText.value.trim().length < 10) {
        notify("Text should contain at least 10 characters.", "error");
        return;
    }

    setBusy(grammarBtn, true, "✔️ Check Grammar", "AI Thinking...");

    correctedText.value = "";
    copyBtn.disabled = true;

    try {

        const data = await Api.checkGrammar(inputText.value);

        correctedText.value = data.corrected_text;
        copyBtn.disabled = false;
        notify("Grammar checked!", "success");

    }
        catch (error) {

        console.error(error);
        notify(error.message || "Failed to check grammar.", "error");

    }

    finally {
        setBusy(grammarBtn, false, "✔️ Check Grammar");
    }

});


copyBtn.addEventListener("click", async () => {

    if (!correctedText.value.trim()) {
        return;
    }

    try {

        await navigator.clipboard.writeText(correctedText.value);

        copyBtn.textContent = "Copied!";
        notify("Copied to clipboard!", "success");

        setTimeout(() => {
            copyBtn.textContent = "Copy Text";
        }, 2000);

    }

    catch (error) {
        notify("Failed to copy text.", "error");
    }

});
