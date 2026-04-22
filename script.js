// Enable keyboard navigation for links
document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        document.activeElement.classList.add("focused");
    }
});

// Project Filtering Function
function filterProjects(category) {
    let projects = document.querySelectorAll(".project");
    
    projects.forEach(project => {
        if (category === "all" || project.dataset.category === category) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        let targetSection = document.querySelector(this.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});

// Fade-in Animation on Page Load
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".fade-in").forEach(section => {
        section.classList.add("visible");
    });
});

// Optional: If you still want fade-in on scroll, keep this part
document.addEventListener("scroll", function() {
    document.querySelectorAll(".fade-in").forEach(section => {
        let position = section.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        
        if (position < windowHeight - 50) {
            section.classList.add("visible");
        }
    });
});

// Ensure scrollbar is visible on mobile devices
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.overflowY = 'scroll';
});

//validate form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual form submission

    let isValid = true;

    // Name Validation
    let nameInput = document.getElementById("name");
    let nameError = document.getElementById("nameError");
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required.";
        nameInput.style.border = "1px solid red";
        isValid = false;
    } else {
        nameError.textContent = "";
        nameInput.style.border = "1px solid green";
    }

    // Email Validation
    let emailInput = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailPattern)) {
        emailError.textContent = "Enter a valid email address.";
        emailInput.style.border = "1px solid red";
        isValid = false;
    } else {
        emailError.textContent = "";
        emailInput.style.border = "1px solid green";
    }

    // Message Validation
    let messageInput = document.getElementById("message");
    let messageError = document.getElementById("messageError");
    if (messageInput.value.trim() === "") {
        messageError.textContent = "Message cannot be empty.";
        messageInput.style.border = "1px solid red";
        isValid = false;
    } else {
        messageError.textContent = "";
        messageInput.style.border = "1px solid green";
    }

    // If all fields are valid, send an email and display success message
    if (isValid) {
        const name = encodeURIComponent(nameInput.value.trim() || '');
        const email = encodeURIComponent(emailInput.value.trim() || '');
        const message = encodeURIComponent(messageInput.value.trim() || '');
        const to = 'dmorris.learn@gmail.com';
        const subject = encodeURIComponent('Website message from ' + (name || email || 'visitor'));
        const body = encodeURIComponent((message ? message + '\n\n' : '') + 'From: ' + (nameInput.value.trim() || '') + (emailInput.value.trim() ? ' <' + emailInput.value.trim() + '>' : ''));
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
            document.getElementById("contactForm").reset();
        }, 3000);
    }
});

// Dark Mode Toggle Function
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved user preference
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
}

// Toggle Dark Mode on Button Click
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save user preference in local storage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        themeToggle.textContent = "☀️ Toggle Light Mode";
    } else {
        localStorage.setItem("dark-mode", "disabled");
        themeToggle.textContent = "🌙 Toggle Dark Mode";
    }
});