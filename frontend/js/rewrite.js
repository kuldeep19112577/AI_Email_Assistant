Api.requireAuth();

const rewriteBtn = document.getElementById("rewriteBtn");
const copyBtn = document.getElementById("copyBtn");

const instruction = document.getElementById("instruction");
const originalEmail = document.getElementById("originalEmail");
const rewrittenEmail = document.getElementById("rewrittenEmail");


rewriteBtn.addEventListener("click", async () => {

    if (!originalEmail.value.trim()) {

        alert("Please enter the original email.");

        return;

    }

    if (originalEmail.value.trim().length < 10) {

        alert("Email should contain at least 10 characters.");

        return;

    }

    rewriteBtn.disabled = true;

    rewriteBtn.innerText = "Rewriting...";

    rewrittenEmail.value = "";

    copyBtn.disabled = true;

    try {

        const data = await Api.rewriteEmail(
            originalEmail.value,
            instruction.value
        );

        rewrittenEmail.value = data.rewritten_email;

        copyBtn.disabled = false;

    }
        catch (error) {

        console.error(error);

        alert(
            error.message || "Failed to rewrite email."
        );

    }

    finally {

        rewriteBtn.disabled = false;

        rewriteBtn.innerText = "Rewrite Email";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!rewrittenEmail.value.trim()) {

        return;

    }

    try {

        await navigator.clipboard.writeText(

            rewrittenEmail.value

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