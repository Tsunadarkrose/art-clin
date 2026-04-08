document.addEventListener('DOMContentLoaded', () => {

  // Dynamic Navbar Background
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-up, .reveal-line, .reveal-badge, .stagger-item');
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  const slider = document.getElementById('baSlider');
  const divider = document.getElementById('baDivider');
  const afterImg = slider ? slider.querySelector('.ba-after') : null;

  if (slider && divider && afterImg) {
    function moveSlider(e) {
      const rect = slider.getBoundingClientRect();
      const x = (e.pageX || e.touches[0].pageX) - rect.left - window.scrollX;
      let pos = (x / rect.width) * 100;
      
      pos = Math.max(0, Math.min(100, pos));
      
      divider.style.left = `${pos}%`;
      afterImg.style.clipPath = `inset(0 0 0 ${pos}%)`;
    }

    function startDragging() {
      divider.classList.remove('returning');
      afterImg.classList.remove('returning-clip');
      slider.addEventListener('mousemove', moveSlider);
      slider.addEventListener('touchmove', moveSlider);
    }

    function stopDragging() {
      slider.removeEventListener('mousemove', moveSlider);
      slider.removeEventListener('touchmove', moveSlider);
      
      // Smooth return to center
      divider.classList.add('returning');
      afterImg.classList.add('returning-clip');
      divider.style.left = '50%';
      afterImg.style.clipPath = 'inset(0 0 0 50%)';
    }

    slider.addEventListener('mouseenter', startDragging);
    slider.addEventListener('mouseleave', stopDragging);
    
    // Mobile Touch
    slider.addEventListener('touchstart', (e) => {
      startDragging();
      moveSlider(e);
    }, { passive: true });
    slider.addEventListener('touchend', stopDragging);
    slider.addEventListener('touchcancel', stopDragging);
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navbarContainer = document.querySelector('.navbar');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navbarContainer.classList.toggle('nav-active');
      // Prevent scrolling when menu is open
      document.body.style.overflow = navbarContainer.classList.contains('nav-active') ? 'hidden' : '';
    });
  }

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarContainer.classList.remove('nav-active');
      document.body.style.overflow = '';
    });
  });

});
