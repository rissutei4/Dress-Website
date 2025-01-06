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

async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Run form validation
    if (!validateForm()) {
        return; // If validation fails, stop the submission
    }

    // If validation passes, collect the form data
    const formData = {
        name: document.getElementById('nameInput').value.trim(),
        phone: document.getElementById('phoneInput').value.trim(),
        email: document.getElementById('emailInput').value.trim(),
    };

    try {
        // Send the data to the serverless function
        const response = await fetch('/.netlify/functions/submitForm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Form submitted successfully!');
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
    }
}