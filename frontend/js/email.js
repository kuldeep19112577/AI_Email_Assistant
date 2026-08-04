const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const emailType = document.getElementById("emailType");
const recipient = document.getElementById("recipient");
const tone = document.getElementById("tone");
const purpose = document.getElementById("purpose");

const generatedEmail = document.getElementById("generatedEmail");

generateBtn.addEventListener("click", async () => {

    // Input validation
    if (!recipient.value.trim()) {
        alert("Please enter the recipient.");
        return;
    }

    if (!purpose.value.trim()) {
        alert("Please enter the purpose.");
        return;
    }

    if (purpose.value.trim().length < 10) {
        alert("Purpose is too short.");
        return;
    }

    // Loading state
    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;

    // Clear previous result
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

        // Display generated email
        generatedEmail.value = data.generated_email;

        // Enable copy button
        copyBtn.disabled = false;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to generate the email.\n\nPlease try again."
        );

    } finally {

        generateBtn.innerText = "Generate Email";
        generateBtn.disabled = false;

    }

});

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        generatedEmail.value
    );

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy Email";
    }, 2000);

});