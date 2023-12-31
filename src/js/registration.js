let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Display the first step on initial load
    showStep(currentStep);
});

function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.querySelector(`.step[data-step="${step}"]`).style.display = 'block';
}

function nextStep() {
    currentStep++;
    showStep(currentStep);
}

function validateFullName(silentMode) {
    // Validate that there are no numbers or special characters

    const fullName = document.getElementById('fullName');
    const fullNameError = fullName.nextElementSibling;
    const fullNameRegExp = new RegExp(/^[A-Za-z\s]+$/);

    const isValid = fullNameRegExp.test(fullName.value.trim());

    if (silentMode) return isValid;

    if (isValid) {
        fullName.classList.remove('is-invalid');
        fullName.classList.add('is-valid');
        fullNameError.textContent = '';
    } else {
        fullName.classList.remove('is-valid')
        fullName.classList.add('is-invalid')
        fullNameError.textContent = "Please Enter Valid Name";
    }

    updateStep1();
}

function validateDateOfBirth(silentMode) {
    // Validate age (between 18 and 60 years old)

    const dob = document.getElementById('dob');
    const dobError = dob.nextElementSibling;

    const currentDate = new Date();
    const dobDate = new Date(dob.value.trim());

    const minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 60);
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() - 18);

    const isValid = dobDate >= minDate && dobDate <= maxDate;

    if (silentMode) return isValid;

    if (isValid) {
        dob.classList.remove('is-invalid');
        dob.classList.add('is-valid');
        dobError.textContent = '';
    } else {
        dob.classList.remove('is-valid')
        dob.classList.add('is-invalid')
        dobError.textContent = dobDate >= minDate ? 'Minimum age requirements, 18 years old' : "Maximum age requirements, 60 years old";
    }

    updateStep1();
}

function validatePassword(silentMode) {
    const passwordEl = document.getElementById('password');
    const password = passwordEl.value.trim();
    const passwordFeedback = passwordEl.nextElementSibling;
    const specialChars = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);

    const hintConfig = {
        length: null,
        number: null,
        lowerCase: null,
        upperCase: null,
        specialChar: null
    }

    // Validate length (8 - 15 characters)
    hintConfig.length = !!(password.length > 7 & password.length < 16);

    // Validate at least one number
    hintConfig.number = (/\d/.test(password));

    // Validate at least one lowercase letter
    hintConfig.lowerCase = (/[a-z]/.test(password));

    // Validate at least one uppercase letter
    hintConfig.upperCase = (/[A-Z]/.test(password));

    // Validate at least one special character
    hintConfig.specialChar = specialChars.test(password);

    const isValid = hintConfig.length
                            && hintConfig.number
                            && hintConfig.lowerCase
                            && hintConfig.upperCase
                            && hintConfig.specialChar;

    if (silentMode) return isValid;

    if (isValid) {
        passwordEl.classList.remove('is-invalid');
        passwordEl.classList.add('is-valid');
    } else {
        passwordEl.classList.remove('is-valid')
        passwordEl.classList.add('is-invalid')
    }

    passwordFeedback.querySelector('#passwordLength').className = hintConfig.length ? 'text-success' : 'text-danger';
    passwordFeedback.querySelector('#passwordNumber').className = hintConfig.number ? 'text-success' : 'text-danger';
    passwordFeedback.querySelector('#passwordLowerCase').className = hintConfig.lowerCase ? 'text-success' : 'text-danger';
    passwordFeedback.querySelector('#passwordUpperCase').className = hintConfig.upperCase ? 'text-success' : 'text-danger';
    passwordFeedback.querySelector('#passwordSpecialChar').className = hintConfig.specialChar ? 'text-success' : 'text-danger';

    updateStep2();
}

function validateEmail(silentMode) {
    const email = document.getElementById('email');
    const emailError = email.nextElementSibling;
    const emailRegExp = new RegExp(/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@(?![\-])([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,12}$/);

    const isValid = emailRegExp.test(email.value.trim());

    if (silentMode) return isValid;

    if (isValid) {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        emailError.textContent = '';
    } else {
        email.classList.remove('is-valid')
        email.classList.add('is-invalid')
        emailError.textContent = "Please Enter Valid Email";
    }

    updateStep2();
}

function updateStep1() {
    const isValidStep1 = validateFullName(true) && validateDateOfBirth(true);

    // Activate the registration button if all validations pass
    const registrationButton = document.querySelector('.nextButton');
    registrationButton.disabled = !isValidStep1;

    const step1progress = document.getElementById('step1progress');
    step1progress.ariaValueNow = isValidStep1 ? '50' : '0';
    step1progress.querySelector('.progress-bar').style.width = isValidStep1 ? "50%" : "0";
}

function updateStep2() {
    const isValidStep2 = validateEmail(true) && validatePassword(true);

    // Activate the registration button if all validations pass
    const registrationButton = document.querySelector('.submitButton');
    registrationButton.disabled = !isValidStep2;

    const step2progress = document.getElementById('step2progress');
    step2progress.ariaValueNow = isValidStep2 ? '50' : '0';
    step2progress.querySelector('.progress-bar').style.width = isValidStep2 ? "50%" : "0";
}

// HOTFIX: Vite - production global
window.validateFullName = validateFullName;
window.validateDateOfBirth = validateDateOfBirth;
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;

window.updateStep1 = updateStep1;
window.updateStep2 = updateStep2;

window.nextStep = nextStep;
window.showStep = showStep;

document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateFullName(true) && validateDateOfBirth(true) && validateEmail(true) && validatePassword(true)) {
        nextStep();
    } else {
        // Handle invalid input, show error messages, etc.
        alert('Invalid input. Please check your information.');
    }
});
