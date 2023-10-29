// Paragrah words hover effects in the about section
const paragraphs = document.querySelectorAll('#about p');

paragraphs.forEach((paragraph) => {
    const words = paragraph.textContent.split(' ');
    paragraph.innerHTML = '';

    words.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.addEventListener('mouseenter', () => {
            span.style.color = 'var(--brand-color)';
        });
        span.addEventListener('mouseleave', () => {
            span.style.color = ''; // Reset the color on mouse leave
        });
        paragraph.appendChild(span);
    });
});

// Profession Typing effect in the hero section
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        const that = this;
        const delta = 300 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

window.onload = function () {
    const elements = document.querySelectorAll('.txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

// Toggle menu on the navigation bar for mobile devices
const menuItems = document.querySelector(".nav-item ul");
const hambburger = document.querySelector(".menuIcon");

function toggleMenu() {
    menuItems.classList.toggle("active");

    if (hambburger.classList.contains("fa-bars")) {
        hambburger.classList.remove("fa-bars");
        hambburger.classList.add("fa-times");
    } else if (hambburger.classList.contains("fa-times")) {
        hambburger.classList.remove("fa-times");
        hambburger.classList.add("fa-bars");
    }
}

hambburger.addEventListener("click", toggleMenu);

// Nav links active state on section scrolling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item ul li a');
let currentActiveLink = null;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (currentActiveLink) {
                currentActiveLink.parentElement.classList.remove('active-link');
            }

            const link = document.querySelector(`[href="#${entry.target.id}"]`);
            link.parentElement.classList.add('active-link');
            currentActiveLink = link;
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Education Section
const btns = document.querySelectorAll(".tablink");
const tabs = document.querySelectorAll('.tab-section');

btns.forEach(btn => {
    btn.addEventListener('click', openTab);
});

function openTab(event) {
    const tabId = event.target.getAttribute('data-tab');

    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.style.display = 'block';
            const image = document.querySelector(".propic");

            switch (tabId) {
                case "Profile":
                    if (image) {
                        image.src = "images/propic1.jpeg";
                    }
                    break;
                case "Education":
                    if (image) {
                        image.src = "images/propic2.jpg";
                    }
                    break;
                case "Experiences":
                    if (image) {
                        image.src = "images/propic4.jpg";
                    }
                    break;
            }

        } else {
            tab.style.display = 'none';
        }
    });
}




// ------------------Chatbot-----------------

const robot = document.querySelector('.fa-robot');
const chatCloseBtn = document.querySelector('.chatClose');
const chatBox = document.querySelector('.chatRobot');

const sectionsToBlur = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('projects'),
    document.getElementById('skills'),
    document.getElementById('contact'),
    document.getElementById('footer')
];

function applyBlur() {
    sectionsToBlur.forEach(section => {
        section.style.filter = 'blur(15px)';
    });
}

function removeBlur() {
    sectionsToBlur.forEach(section => {
        section.style.filter = 'blur(0)';
    });
}

function chatBoxAppear() {
    chatBox.classList.add('activeChat');
    applyBlur();
}

function chatBoxDisappear() {
    chatBox.classList.remove('activeChat');
    removeBlur();
}

robot.addEventListener('click', chatBoxAppear);
chatCloseBtn.addEventListener('click', chatBoxDisappear);



document.addEventListener("DOMContentLoaded", function () {
const chatBody = document.getElementById("chat-body");
const chatOptions = document.getElementById("chat-options");

const questions = [
{ id: 1, text: "Tell me about yourself" },
{ id: 2, text: "What are your skills?" },
{ id: 3, text: "Give sample of your poject?" },
{ id: 4, text: "How you learn this skills?" },
// Add more questions here
];

questions.forEach((question) => {
const button = document.createElement("button");
button.className = "button";
button.textContent = question.text;
button.addEventListener("click", () => handleQuestionClick(question));
chatOptions.appendChild(button);
});

function handleQuestionClick(question) {
addMessage("user-message", question.text);
addThinkingAnimation();

// Simulate a delayed response
setTimeout(() => {
    const answer = getAnswer(question.id);
    addMessage("bot-message", answer);
    removeThinkingAnimation();
}, 1500);
}

function addMessage(who, message) {
const messageDiv = document.createElement("div");
messageDiv.className = `message ${who}`;
messageDiv.textContent = message;
chatBody.appendChild(messageDiv);
chatBody.scrollTop = chatBody.scrollHeight;
}

function addThinkingAnimation() {
chatBody.classList.add("thinking-animation");
}

function removeThinkingAnimation() {
chatBody.classList.remove("thinking-animation");
}

function getAnswer(questionId) {
// You can define your answers based on the selected question here
switch (questionId) {
    case 1:
        return "I am a web developer with a passion for creating user-friendly websites.";
    case 2:
        return "I have expertise in HTML, CSS, JavaScript, and also in CSS and javascript frameworks.";
    case 3:
        return "You can check out my projects on my GitHub account through this link: https://github.com/SarathKalarikkal";
    case 4:
        return "I acquired these skills through various online platforms and by attending code camps to enhance my abilities.";
    // Add more answers for other questions here
    default:
        return "I'm sorry, I don't understand that question.";
}
}
});









// Axios Scrolling effect on every section
AOS.init();
