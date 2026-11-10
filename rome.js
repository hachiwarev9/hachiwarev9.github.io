
// ==========================================
// 4. FORMSPREE CONTACT FORM
// ==========================================

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const submitButton = contactForm?.querySelector('button[type="submit"]');

if (contactForm && formNote && submitButton) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending... <i class="bx bx-loader-alt"></i>';

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

            if (response.ok) {

                formNote.textContent =
                    "Thank you! Your message has been sent successfully. I'll get back to you soon!";

                formNote.style.color = "#00d4ff";

                contactForm.reset();

            } else {

                const data = await response.json();

                formNote.textContent =
                    data.errors
                        ? data.errors.map(error => error.message).join(", ")
                        : "Oops! Something went wrong. Please try again.";

                formNote.style.color = "#ff6b6b";

            }

        } catch (error) {

            formNote.textContent =
                "Unable to send your message. Please check your internet connection and try again.";

            formNote.style.color = "#ff6b6b";

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

        }

    });

}
