function validateForm() {
    let nameInput = document.getElementById("nameInput").value;
    let phoneInput = document.getElementById("phoneInput").value;
    let emailInput = document.getElementById("emailInput").value;

    if (nameInput == "" || phoneInput == "" || emailInput == "") {
        alert("Please fill out all the fields");
        return false;
    }
}
