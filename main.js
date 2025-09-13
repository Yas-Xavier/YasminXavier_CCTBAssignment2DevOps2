// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting immediately

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const team = document.getElementById("team").value.trim();
        const role = document.getElementById("role").value.trim();

        // Regex patterns
        const lettersOnly = /^[A-Za-z\s]+$/;  // Only letters and spaces
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        if (!name || !email || !team || !role) {
            alert("⚠️ Please fill out all required fields.");
            return;
        }

        if (!lettersOnly.test(name)) {
            alert("⚠️ Name must only contain letters and spaces.");
            return;
        }

        if (!lettersOnly.test(role)) {
            alert("⚠️ Role must only contain letters and spaces.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("⚠️ Please enter a valid email address.");
            return;
        }

        // If everything is valid
        alert("✅ Registration successful! Thank you for signing up.");
        form.reset();
    });
});
