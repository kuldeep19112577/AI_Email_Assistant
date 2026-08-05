Api.requireAuth();

const composeBtn = document.getElementById("composeBtn");
const copyBtn = document.getElementById("copyBtn");

const prompt = document.getElementById("prompt");
const generatedEmail = document.getElementById("generatedEmail");


composeBtn.addEventListener("click", async () => {

    if (!prompt.value.trim()) {

        alert("Please describe your requirement.");

        return;

    }

    if (prompt.value.trim().length < 10) {

        alert("Please enter at least 10 characters.");

        return;

    }

    composeBtn.disabled = true;

    composeBtn.innerText = "Composing...";

    generatedEmail.value = "";

    copyBtn.disabled = true;

    try {

        const data = await Api.composeEmail(prompt.value);

        generatedEmail.value = data.email;

        copyBtn.disabled = false;

    }
        catch (error) {

        console.error(error);

        alert(
            error.message || "Failed to compose email."
        );

    }

    finally {

        composeBtn.disabled = false;

        composeBtn.innerText = "Compose Email";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!generatedEmail.value.trim()) {

        return;

    }

    try {

        await navigator.clipboard.writeText(

            generatedEmail.value

        );

        copyBtn.innerText = "Copied!";

        setTimeout(() => {

            copyBtn.innerText = "Copy Email";

        }, 2000);

    }

    catch (error) {

        alert("Failed to copy email.");

    }

});