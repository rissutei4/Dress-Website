"use strict";

function validateForm() {
    // Get form inputs and feedback elements
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    // Reset validation feedback
    [nameInput, phoneInput, emailInput].forEach(input => input.classList.remove('is-invalid'));
    [nameError, phoneError, emailError].forEach(error => (error.style.display = 'none'));

    let isValid = true;

    // Validate name
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/; // At least two words with alphabetic characters
    if (!nameInput.value.trim() || !nameRegex.test(nameInput.value)) {
        isValid = false;
        nameInput.classList.add('is-invalid');
        nameError.style.display = 'block';
    }

    // Validate phone
    const phoneRegex = /^[0-9]{9,15}$/; // Adjust for country-specific formats
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.add('is-invalid');
        phoneError.style.display = 'block';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('is-invalid');
        emailError.style.display = 'block';
    }

    return isValid;
}

// Fetch the API key from the Netlify function
document.addEventListener("DOMContentLoaded", function () {
    fetch("/.netlify/functions/get-api-key")
        .then((response) => response.json())
        .then((data) => {
            const accessKeyInput = document.getElementById("access_key");
            accessKeyInput.value = data.apiKey.trim(); // Ensure there are no extra spaces
        })
        .catch((error) => {
            console.error("Error fetching API key:", error);
        });
});