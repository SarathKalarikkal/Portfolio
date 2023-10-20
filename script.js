// -----------Paragrah words hover effects in about section-----------  
      
      // Get all paragraphs
       const paragraphs = document.querySelectorAll('#about p');

       // Iterate through each paragraph
       paragraphs.forEach((paragraph) => {
           // Split the paragraph text into words
           const words = paragraph.textContent.split(' ');
       
           // Clear the existing text content
           paragraph.innerHTML = '';
       
           // Create spans for each word and add hover event
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
       
 // -------------------------------------------------------------------  


// -----------Profesion Typing effect on hero section-----------  

 var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
 // -------------------------------------------------------------------  





// -----------Toggle menu on Nav bar on mobile devices-----------  

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
  // -------------------------------------------------------------------  




// -----------Nav links active state on section scrolling-----------  

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('navbar .nav-item ul li a');
  let currentActiveLink = null;
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove the 'active-link' class from the previous active link's parent <li>
        if (currentActiveLink) {
          currentActiveLink.parentElement.classList.remove('active-link');
        }
  
        // Find the corresponding link's parent <li> and add the 'active-link' class
        const link = document.querySelector(`[href="#${entry.target.id}"]`);
        link.parentElement.classList.add('active-link');
        currentActiveLink = link;
      }
    });
  }, options);
  
  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });

 // -------------------------------------------------------------------  


// -----------Axios Scrolling effect on every sections-----------  
  AOS.init();