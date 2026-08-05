Api.requireAuth();

const grammarBtn = document.getElementById("grammarBtn");
const copyBtn = document.getElementById("copyBtn");

const inputText = document.getElementById("inputText");
const correctedText = document.getElementById("correctedText");


grammarBtn.addEventListener("click", async () => {

    if (!inputText.value.trim()) {

        alert("Please enter some text.");

        return;

    }

    if (inputText.value.trim().length < 10) {

        alert("Text should contain at least 10 characters.");

        return;

    }

    grammarBtn.disabled = true;

    grammarBtn.innerText = "Checking...";

    correctedText.value = "";

    copyBtn.disabled = true;

    try {

        const data = await Api.checkGrammar(inputText.value);

        correctedText.value = data.corrected_text;

        copyBtn.disabled = false;

    }
        catch (error) {

        console.error(error);

        alert(
            error.message || "Failed to check grammar."
        );

    }

    finally {

        grammarBtn.disabled = false;

        grammarBtn.innerText = "Check Grammar";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!correctedText.value.trim()) {

        return;

    }

    try {

        await navigator.clipboard.writeText(

            correctedText.value

        );

        copyBtn.innerText = "Copied!";

        setTimeout(() => {

            copyBtn.innerText = "Copy Text";

        }, 2000);

    }

    catch (error) {

        alert("Failed to copy text.");

    }

});