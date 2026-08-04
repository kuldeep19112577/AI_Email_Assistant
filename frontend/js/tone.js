const toneBtn = document.getElementById("toneBtn");
const copyBtn = document.getElementById("copyBtn");

const tone = document.getElementById("tone");
const email = document.getElementById("email");
const modifiedEmail = document.getElementById("modifiedEmail");


toneBtn.addEventListener("click", async () => {

    if (!email.value.trim()) {

        alert("Please enter an email.");

        return;

    }

    if (email.value.trim().length < 10) {

        alert("Email should contain at least 10 characters.");

        return;

    }

    toneBtn.disabled = true;

    toneBtn.innerText = "Changing...";

    modifiedEmail.value = "";

    copyBtn.disabled = true;

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/tone/",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email: email.value,

                    tone: tone.value

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.detail);

        }

        modifiedEmail.value = data.modified_email;

        copyBtn.disabled = false;

    }
        catch (error) {

        console.error(error);

        alert(
            error.message || "Failed to change tone."
        );

    }

    finally {

        toneBtn.disabled = false;

        toneBtn.innerText = "Change Tone";

    }

});


copyBtn.addEventListener("click", async () => {

    if (!modifiedEmail.value.trim()) {

        return;

    }

    try {

        await navigator.clipboard.writeText(

            modifiedEmail.value

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