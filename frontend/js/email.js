const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const emailType = document.getElementById("emailType");
const recipient = document.getElementById("recipient");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

const generatedEmail = document.getElementById("generatedEmail");


generateBtn.addEventListener("click", async () => {

    if (!recipient.value.trim()) {

        alert("Please enter the recipient.");

        return;

    }

    if (!purpose.value.trim()) {

        alert("Please enter the purpose.");

        return;

    }

    if (purpose.value.trim().length < 10) {

        alert("Purpose should contain at least 10 characters.");

        return;

    }

    generateBtn.disabled = true;

    generateBtn.innerText = "Generating...";

    generatedEmail.value = "";

    copyBtn.disabled = true;

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/email/generate",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email_type: emailType.value,

                    recipient: recipient.value,

                    tone: tone.value,

                    purpose: purpose.value

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.detail);

        }

        generatedEmail.value = data.generated_email;

        copyBtn.disabled = false;

    }
        catch (error) {

        console.error(error);

        alert(
            error.message || "Failed to generate email."
        );

    }

    finally {

        generateBtn.disabled = false;

        generateBtn.innerText = "Generate Email";

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