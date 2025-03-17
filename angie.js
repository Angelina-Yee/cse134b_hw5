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

class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            :host{
                display: flex;
                flex-direction: column;
                margin: 10px; 
                border: 1px solid #ccc; 
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            h2, p, a, img, audio, video{
                margin: 10px 0;
            }
            video{ 
                max-width: 100%;
                height: auto;
            }
            img{
                display: block;
                width: 30vw;
                height: auto;
            }
        `;
        this.shadowRoot.append(style);
    }
    connectedCallback(){
        const name = this.getAttribute('name');
        const imageSrc = this.getAttribute('image-src');
        const videoSrc = this.getAttribute('video-src');
        const audioSrc = this.getAttribute('audio-src');
        const altText = this.getAttribute('alt');
        const imgText = this.getAttribute('img-alt');
        const description = this.getAttribute('description');
        const url = this.getAttribute('url');

        const h2 = document.createElement('h2');
        h2.textContent = name;
        this.shadowRoot.append(h2);

        if(imageSrc){
            const picture = document.createElement('picture');
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = imgText;
            picture.appendChild(img);
            this.shadowRoot.append(picture);
        }
        if(videoSrc){
            const video = document.createElement('video');
            video.controls = true; 
            const sourceVideo = document.createElement('source');
            sourceVideo.src = videoSrc;
            sourceVideo.type = 'video/mp4';
            video.append(sourceVideo);
            this.shadowRoot.append(video);
        }
        if(audioSrc){
            const audio = document.createElement('audio');
            audio.controls = true; 
            const sourceAudio = document.createElement('source');
            sourceAudio.src = audioSrc;
            sourceAudio.type = 'audio/mp3';
            audio.append(sourceAudio);
            this.shadowRoot.append(audio);
        }

        const p = document.createElement('p');
        p.textContent = description;
        this.shadowRoot.append(p);

        if(url){
            const a = document.createElement('a');
            a.href = url;
            a.textContent = 'Learn more';
            a. target = '_blank';
            this.shadowRoot.append(a);
        }
    }
}

customElements.define('project-card', ProjectCard);

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const card = new ProjectCard();
    main.appendChild(card);
});

//Part 1:
// document.addEventListener('DOMContentLoaded', function(){
//     const projectData =[
//         {
//             name: "Upcoming Project #1: LaLaLounge", 
//             audioSrc: "audios/music.mp3", 
//             altText: "Audio that plays a soft melodic tune.",
//             imageSrc: "images/lala.png",
//             imgText: "Concept image of the characters in the design of the web application.",
//             description: "A web application that is currently in progress. The attached audio is one of the many type of sounds and music I listen to when I study. Hence, the idea is to create a website to play soft and melodic sounds according to a specific location that the user might want. For example, a user might be working in their dorm room, but finds it hard to focus since they usually study at a cafe and thinks that they would focus more there. By using this website, users can imagine as if they are in a cafe and have sounds like baristas or coffee brewing added to the default melodic music.",
//         },
//         {
//             name: "Upcoming Project #2: Rock-Paper-Scissor-MinusONE",
//             videoSrc: "audios/videoplayback.mp4", 
//             altText: "A video that shows the game demonstration in the TV show, 'Squid Game'.",
//             description: "A web game that is currently in progress. The attached video shows a scene from Squid Game Season 2. In the scene, the characters can be seen playing a rather violent game of Rock-Paper-Scissor-MinusONE. This is a popular game in korea that my friends and I have started to play to increase the intensity of regular rock paper scissor. Therefore, my friend and I have decided to make it into a game that others can play with their friends as well!",
//             url: "https://github.com/nyanaung23/rock-paper-scissors"
//         }
//     ];

//     const mainSection = document.querySelector('main');
//     projectData.forEach(project => {
//         const projectCard = document.createElement('project-card');
//         projectCard.setAttribute('name', project.name);
//         if(project.audioSrc){
//             projectCard.setAttribute('audio-src', project.audioSrc);
//         }
//         if(project.imageSrc){
//             projectCard.setAttribute('image-src', project.imageSrc);
//         }
//         if(project.videoSrc){
//             projectCard.setAttribute('video-src', project.videoSrc);
//         }
//         projectCard.setAttribute('alt', project.altText);
//         projectCard.setAttribute('img-alt', project.imgText);
//         projectCard.setAttribute('description', project.description);
//         if (project.url){
//             projectCard.setAttribute('url', project.url);
//         }
//         mainSection.appendChild(projectCard);
//     });
// });


//Part 2:
function initializeLocalStorage(){
    const projectData = [
        {
            name: "Upcoming Project #1: LaLaLounge", 
            audioSrc: "audios/music.mp3", 
            altText: "Audio that plays a soft melodic tune.",
            imageSrc: "images/lala.png",
            imgText: "Concept image of the characters in the design of the web application.",
            description: "A web application that is currently in progress. The attached audio is one of the many type of sounds and music I listen to when I study. Hence, the idea is to create a website to play soft and melodic sounds according to a specific location that the user might want. For example, a user might be working in their dorm room, but finds it hard to focus since they usually study at a cafe and thinks that they would focus more there. By using this website, users can imagine as if they are in a cafe and have sounds like baristas or coffee brewing added to the default melodic music.",
        },
        {
            name: "Upcoming Project #2: Rock-Paper-Scissor-MinusONE",
            videoSrc: "audios/videoplayback.mp4", 
            altText: "A video that shows the game demonstration in the TV show, 'Squid Game'.",
            description: "A web game that is currently in progress. The attached video shows a scene from Squid Game Season 2. In the scene, the characters can be seen playing a rather violent game of Rock-Paper-Scissor-MinusONE. This is a popular game in korea that my friends and I have started to play to increase the intensity of regular rock paper scissor. Therefore, my friend and I have decided to make it into a game that others can play with their friends as well!",
            url: "https://github.com/nyanaung23/rock-paper-scissors"
        }
    ];
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

initializeLocalStorage();

function loadRemoteData() {
    fetch('https://my-json-server.typicode.com/Angelina-Yee/cse134b_hw5/projects')
        .then(response => response.json())
        .then(data=>{
            displayProjects(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function loadLocalData(){
    const data = JSON.parse(localStorage.getItem('projectData'));
    if(data){
        displayProjects(data);
    }
    else{
        console.error('No local data found');
    }
}

document.getElementById('loadLocal').addEventListener('click', loadLocalData);
document.getElementById('loadRemote').addEventListener('click', loadRemoteData);

function displayProjects(data){
    const mainSection = document.querySelector('main');
    mainSection.innerHTML = '';
    data.forEach(project => {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('name', project.name);
        if(project.audioSrc){
            projectCard.setAttribute('audio-src', project.audioSrc);
        }
        if(project.imageSrc){
            projectCard.setAttribute('image-src', project.imageSrc);
        }
        if(project.videoSrc){
            projectCard.setAttribute('video-src', project.videoSrc);
        }
        projectCard.setAttribute('alt', project.altText);
        projectCard.setAttribute('img-alt', project.imgText);
        projectCard.setAttribute('description', project.description);
        if (project.url){
            projectCard.setAttribute('url', project.url);
        }
        mainSection.appendChild(projectCard);
    });
}