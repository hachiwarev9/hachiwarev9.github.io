
// ==========================================
// 1. MOBILE NAVIGATION MENU
// ==========================================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("#navbar");

if (menuIcon && navbar) {

    menuIcon.addEventListener("click", () => {

        const isActive = navbar.classList.toggle("active");

        menuIcon.setAttribute("aria-expanded", isActive);

        menuIcon.setAttribute(
            "aria-label",
            isActive ? "Close navigation menu" : "Open navigation menu"
        );

        menuIcon.innerHTML = isActive
            ? '<i class="bx bx-x"></i>'
            : '<i class="bx bx-menu"></i>';

    });

    // Close menu after clicking a navigation link

    document.querySelectorAll(".navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuIcon.setAttribute("aria-expanded", "false");

            menuIcon.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuIcon.innerHTML = '<i class="bx bx-menu"></i>';

        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

        if (
            !navbar.contains(event.target) &&
            !menuIcon.contains(event.target)
        ) {

            navbar.classList.remove("active");

            menuIcon.setAttribute("aria-expanded", "false");

            menuIcon.innerHTML = '<i class="bx bx-menu"></i>';

        }

    });

}


// ==========================================
// 2. ACTIVE NAVIGATION ON SCROLL
// ==========================================

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".navbar a");

function activeMenu() {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", activeMenu);
window.addEventListener("load", activeMenu);


// ==========================================
// 3. AUTOMATIC COPYRIGHT YEAR
// ==========================================

const year = document.querySelector("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// ==========================================
// 4. CONTACT FORM
// ==========================================

// IMPORTANT:
// Replace this with your real email address.

const myEmail = "your-email@gmail.com";

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get form values

        const name = document.querySelector("#full-name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();

        // Check empty fields

        if (!name || !email || !subject || !message) {

            formNote.textContent = "Please complete all required fields.";
            return;

        }

        // Check email recipient

        if (myEmail === "your-email@gmail.com") {

            formNote.textContent =
                "Please update your email address inside script.js first.";

            return;

        }

        // Prepare email content

        const emailSubject = encodeURIComponent(subject);

        const emailMessage = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        // Open default email application

        const mailto = `mailto:${myEmail}?subject=${emailSubject}&body=${emailMessage}`;

        formNote.textContent = "Opening your email application...";

        window.location.href = mailto;

    });

}


// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", function(event) {

        event.preventDefault();

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


// ==========================================
// 6. SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .about-content, .about-img, .section-heading"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


// ==========================================
// 7. CONSOLE MESSAGE
// ==========================================

console.log("Jerome's Portfolio JavaScript Loaded Successfully!");
