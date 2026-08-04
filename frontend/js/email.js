const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const emailType = document.getElementById("emailType");
const recipient = document.getElementById("recipient");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

const generatedEmail = document.getElementById("generatedEmail");


generateBtn.addEventListener("click", async () => {
    if (
        !recipient.value.trim() ||
        !purpose.value.trim()
    ) {
        alert("Please fill all required fields.");
        return;
    }
    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;

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

    } catch (error) {

        alert(
         "Something went wrong while generating the email.\nPlease try again."
    );

    } finally {

        generateBtn.innerText = "Generate Email";
        generateBtn.disabled = false;

    }

});


copyBtn.addEventListener("click", () => {

    if (!generatedEmail.value.trim()) {
        alert("Generate an email first.");
        return;
    }

    navigator.clipboard.writeText(generatedEmail.value);

    alert("Email copied successfully!");
});