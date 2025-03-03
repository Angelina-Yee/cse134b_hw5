document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact_form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsText = document.getElementById('comments');
    const commentsCount = document.getElementById('commentsCount');
    const formErrorsInput = document.getElementById('formErrors');
    const themeToggle = document.getElementById('toggle');

    let form_errors = [];

    document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    document.body.classList.add('js-enabled');
    themeToggle.addEventListener('click', toggleTheme);

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
        setTimeout(() => {errorDiv.style.opacity = 0; errorDiv.textContent='';}, 3000);
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

    function toggleTheme(){
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        if(currentTheme === 'dark'){
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        else{
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        };
    };

});