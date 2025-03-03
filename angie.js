document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact_form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsText = document.getElementById('comments');
    const commentsCount = document.getElementById('commentsCount');
    const formErrorsInput = document.getElementById('formErrors');

    let form_errors = [];

    function validateInput(event, regex, errorDiv){
        if(!regex.test(event.target.value)){
            event.target.value = event.target.value.replace(/[^a-zA-Z0-9@.+_-]/g, '');
            displayError(errorDiv, "Unaccepted character inputted.");
            logError(event.target.name, "Unaccepted character typed.");
        };
    }

    function displayError(elementId, message){
        const errorDiv = document.getElementById(elementId);
        errorDiv.textContent = message;
        errorDiv.style.opacity = 1;
        setTimeout(() => {errorDiv.style.opacity = 1; errorDiv.textContent='';}, 3000);
    }

    function logError(fieldName, message){
        form_errors.push({field: fieldName, message: message, time: new Date().toISOString() });
    }

    nameInput.addEventListener('input', (event) => validateInput(event, /[^a-zA-Z\s]/g, 'nameError'));
    emailInput.addEventListener('input', (event) => validateInput(event, /[^a-zA-Z0-9@.+_-]/g, 'emailError'));

    commentsText.addEventListener('input', function (){
        const remaining = 100 - this.value.length;
        commentsCount.textContent= `Remaining characters: ${remaining}`;
        if(remaining < 10){
            commentsCount.classList.add('warning');
        }
        else{
            commentsCount.classList.remove('warning');
        }
    });

    form.addEventListener('submit', function(event){
        event.preventDefault();
        formErrorsInput.value = JSON.stringify(form_errors);
        form.submit();
    });

});