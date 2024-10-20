const nameInputs = document.querySelectorAll(".name");
const email = document.querySelector(".email");
const checkBox = document.querySelector(".checkbox");
const btn = document.querySelector(".btn");
const checkDivs = document.querySelectorAll(".check");
const radioInputs = document.querySelectorAll(".radio");
let allValid = true;

nameInputs.forEach(input => {
    input.addEventListener("blur", function(){
        const regExp = new RegExp("^(?=.*[a-zA-Z])([a-zA-Z ]{2,})$");
        if(regExp.test(input.value)){
            this.classList.remove("is-invalid");
            this.classList.add("is-valid");
            allValid = true;
        }else{
            this.classList.remove("is-valid");
            this.classList.add("is-invalid");
            allValid = false;
        }
    });
});

email.addEventListener("blur", function(){
    const emailRegExp = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$');
    if(emailRegExp.test(email.value)){
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        allValid = true;
    }else{
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        allValid = false;
    }
});

let lastChecked;

radioInputs.forEach(radio => {
    radio.addEventListener("click", function() {
        // If the currently clicked radio is the same as the last checked one
        if (lastChecked === this) {
            this.checked = false; // Deselect it
            lastChecked = null; // Reset lastChecked
        } else {
            // Update lastChecked to the currently checked radio
            lastChecked = this;
        }

        // Update the checked class visually
        checkDivs.forEach(box => {
            box.classList.remove('checked');

        });
        if (this.checked) {
            const relatedCheckDiv = this.closest('.check');  
            relatedCheckDiv.classList.add('checked');
        }
    });
});


if (!checkBox.checked) {
    allValid = false; 
}

btn.addEventListener("click", function(event){
    event.preventDefault();
    
    let allValid = true;

    // Check all name inputs
    nameInputs.forEach(input => {
        if (!input.classList.contains("is-valid")) {
            allValid = false;
        }
    });

    // Check email
    if (!email.classList.contains("is-valid")) {
        allValid = false;
    }

    // Check checkbox
    if (!checkBox.checked) {
        allValid = false;
    }

    // Check if at least one radio is selected
    if (![...radioInputs].some(radio => radio.checked)) {
        allValid = false;
    }

    if (allValid) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your message has been sent",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.reload();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all required fields correctly!',
            confirmButtonColor: '#0c7d69'
        });
    }
});