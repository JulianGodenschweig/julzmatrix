document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 2000);

    // Background Fixes
    function fixBackground() {
        const backVid = document.querySelector('.back-vid');
        const blackholeVideo = document.querySelector('.blackhole-box video');
        
        if (backVid) {
            backVid.style.width = '100%';
            backVid.style.height = '100%';
            backVid.style.objectFit = 'cover';
        }
        
        if (blackholeVideo) {
            blackholeVideo.style.width = '100%';
            blackholeVideo.style.maxWidth = '1200px';
            blackholeVideo.style.objectFit = 'contain';
            blackholeVideo.style.marginTop = '-10%';
        }
    }
    fixBackground();
    window.addEventListener('resize', fixBackground);

    // Navbar Effects
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        
        // Hero fade out
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight;
        const opacity = 1 - (currentScroll / heroHeight * 1.5);
        hero.style.opacity = opacity > 0 ? opacity : 0;
    });
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Video Hover
    document.querySelectorAll('.project-vidbox video').forEach(video => {
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Scroll Animations
    const animateElements = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in, .fade-card, .project-card').forEach(el => {
            observer.observe(el);
        });
    };
    animateElements();

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (name && email && message) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        // Get form values
        const formData = new FormData(this);
        
        // Send to Formspree
        fetch('https://formspree.io/f/meogdzeq', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            showFormMessage('There was a problem sending your message. Please try again later.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
        });
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.style.opacity = '1';
        }, 500);
    }, 5000);
}
// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll to contact section
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 70, // Adjust for header height
            behavior: 'smooth'
        });
    }
}

// Make sure this is added to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    // Alternative approach for buttons if onclick isn't working
    document.querySelectorAll('.contact-btn').forEach(button => {
        if (!button.hasAttribute('onclick')) {
            button.addEventListener('click', () => {
                smoothScroll('#contact');
            });
        }
    });
});