// Matrix Rain Background
const matrixCanvas = document.getElementById('matrixCanvas');
const ctx = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = matrixCanvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#72a1de"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#72a1de",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Enhanced loading screen with progress bar
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            loadingScreen.classList.add('fade-out');
            setTimeout(() => loadingScreen.remove(), 800);
        }
    }, 200);

    // Background Video Optimization
    function optimizeVideos() {
        document.querySelectorAll('video').forEach(video => {
            video.setAttribute('preload', 'auto');
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            
            // Only load videos when they're near the viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.play().catch(e => console.log('Autoplay prevented:', e));
                        videoObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '200px' });
            
            videoObserver.observe(video);
        });
    }
    optimizeVideos();

    // Navbar Scroll Effects
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
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#navbar') && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Enhanced Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate distance to scroll
                const targetPosition = targetElement.offsetTop - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                // Smooth scroll animation
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });

    // Easing function for smooth scrolling
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }

    // Project Video Hover
    document.querySelectorAll('.project-vidbox video').forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Play prevented:', e));
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.toggleAttribute('data-theme');
        localStorage.setItem('theme', 
            document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark'
        );
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Scroll Animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        const cards = document.querySelectorAll('.project-card, .card, .skill-card, .contact-container > div');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('visible');
            }
        });
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 100;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.classList.add('visible');
            }
        });
    }
    
    // Initial animation trigger
    animateOnScroll();

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const inputs = contactForm?.querySelectorAll('input, textarea');

    // Add input event listeners for form labels
    inputs?.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

            // Validate form
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fill in all required fields', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
                return;
            }

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
                    inputs.forEach(input => input.classList.remove('has-value'));
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
        if (!formMessage) return;
        
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

    // Add hover effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.skill-icon').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.skill-icon').style.transform = 'scale(1)';
        });
    });

    // Add floating animation to elements
    const floatingElements = document.querySelectorAll('.floating-card');
    floatingElements.forEach(el => {
        el.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
});

// Smooth scroll function for buttons
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        // Calculate distance to scroll
        const targetPosition = element.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        // Smooth scroll animation
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
}