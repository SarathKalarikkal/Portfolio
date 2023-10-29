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

// Axios Scrolling effect on every section
AOS.init();
