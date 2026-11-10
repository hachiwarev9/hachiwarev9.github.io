
// ==========================================
// 4. FORMSPREE CONTACT FORM
// ==========================================

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const submitButton = document.querySelector("#submit-btn");

if (contactForm && formNote && submitButton) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formNote.textContent = "Sending your message...";
        formNote.style.color = "#00d4ff";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok) {

                formNote.textContent =
                    "Success! Your message has been sent. Thank you for contacting me!";

                formNote.style.color = "#00d4ff";

                contactForm.reset();

            } else {

                console.error("Formspree response:", result);

                const errorMessage = result.errors
                    ? result.errors.map(error => error.message).join(", ")
                    : `Submission failed (Error ${response.status}).`;

                formNote.textContent = errorMessage;
                formNote.style.color = "#ff6b6b";

            }

        } catch (error) {

            console.error("Form submission error:", error);

            formNote.textContent =
                "Connection error. Please check your internet connection or try again later.";

            formNote.style.color = "#ff6b6b";

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

        }

    });

}
