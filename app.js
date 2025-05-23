// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('form-message');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
        
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessage.style.display = 'block';
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Message sent successfully!';
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Error sending message. Please try again.';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-paper-plane"></i> Send Message';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    });
}

// Audio player functionality
const playBtn = document.getElementById('playBtn');
const bgAudio = document.getElementById('bgAudio');
let isPlaying = false;

if (playBtn && bgAudio) {
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgAudio.pause();
            this.innerHTML = '<i class="bx bx-play"></i>';
        } else {
            bgAudio.play();
            this.innerHTML = '<i class="bx bx-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Check for saved theme preference
if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
}

// Matrix background effect
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    
    const alphabet = katakana + latin + nums + symbols;
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(10, 0, 20, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#2a9d8f';
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
}

// Real-time clock functionality
function updateRealClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    
    const clock = document.querySelector('.real-clock');
    if (clock) {
        clock.style.setProperty('--hour-rotation', `${hourDeg}deg`);
        clock.style.setProperty('--minute-rotation', `${minuteDeg}deg`);
    }
}

setInterval(updateRealClock, 1000);
updateRealClock();

// Cursor trail effect
const cursorTrail = document.querySelector('.cursor-trail');
const footprintsContainer = document.querySelector('.footprints-container');

if (cursorTrail && footprintsContainer) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    let isMouseMoving = false;
    let mouseMoveTimer;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseMoveTimer);
        mouseMoveTimer = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    const createFootprint = (x, y) => {
        const footprint = document.createElement('div');
        footprint.className = 'footprint';
        footprint.style.left = x + 'px';
        footprint.style.top = y + 'px';
        footprintsContainer.appendChild(footprint);
        
        // Remove footprint after animation completes
        setTimeout(() => {
            footprint.remove();
        }, 2000);
    };
    
    const animate = () => {
        // Move trail towards mouse with easing
        trailX += (mouseX - trailX) * 0.2;
        trailY += (mouseY - trailY) * 0.2;
        
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        
        // Create footprints when mouse is moving
        if (isMouseMoving && Math.random() > 0.7) {
            createFootprint(mouseX, mouseY);
        }
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Scroll animations
const sections = document.querySelectorAll('.section');
const cards = document.querySelectorAll('.card, .skill-card, .project-card, .blog-card, .service-card, .contact-container > div, .cyber-card');

const checkVisibility = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Auto-update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Video play on hover
document.querySelectorAll('.project-video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Form input label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
    
    // Check on page load if there's any value (for browser autofill)
    if (input.value.trim() !== '') {
        input.classList.add('has-value');
    }
});

// Navbar scroll behavior
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        
        if (window.scrollY > lastScrollY) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.classList.remove('scrolled', 'hidden');
    }
    
    lastScrollY = window.scrollY;
});

// Responsive adjustments
function handleResize() {
    // Adjust matrix canvas size
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    
    // Hide/show hero image based on screen size
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        if (window.innerWidth <= 1024) {
            heroImage.style.display = 'none';
        } else {
            heroImage.style.display = 'block';
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial check

// Smooth scroll function for buttons
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 70,
            behavior: 'smooth'
        });
    }
}

// Hat Type Modals
const hatTags = document.querySelectorAll('.hat-tag');
const hatModals = {
    'white-hat': {
        title: 'White Hat Hacker',
        description: 'Ethical hackers who use their skills for good, working to improve security systems.',
        activities: [
            'Penetration testing for organizations',
            'Vulnerability assessments',
            'Security consulting',
            'Bug bounty hunting',
            'Security research'
        ],
        legal: 'Always works with explicit permission and within legal boundaries.',
        examples: [
            'Kevin Mitnick (reformed)',
            'Tsutomu Shimomura',
            'Charlie Miller'
        ],
        resources: [
            { name: 'CEH Certification', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
            { name: 'OSCP Certification', url: 'https://www.offensive-security.com/pwk-oscp/' },
            { name: 'Bug Bounty Platforms', url: 'https://www.hackerone.com/' }
        ]
    },
    'black-hat': {
        title: 'Black Hat Hacker',
        description: 'Malicious hackers who exploit vulnerabilities for personal gain or to cause damage.',
        activities: [
            'Creating and distributing malware',
            'Stealing sensitive data',
            'System infiltration',
            'Financial fraud',
            'Cyber espionage'
        ],
        legal: 'All activities are illegal and punishable by law.',
        examples: [
            'Kevin Mitnick (early career)',
            'Albert Gonzalez',
            'Gary McKinnon'
        ],
        resources: [
            { name: 'Cybercrime Laws', url: 'https://www.interpol.int/Crimes/Cybercrime' },
            { name: 'Ethical Hacking Resources', url: 'https://www.ethicalhacker.net/' },
            { name: 'Security Careers', url: 'https://www.sans.org/cyber-security-careers/' }
        ]
    },
    'red-hat': {
        title: 'Red Hat Hacker',
        description: 'Vigilante hackers who target black hat hackers, often using aggressive countermeasures.',
        activities: [
            'Hacking back against attackers',
            'Deploying counter-hacking tools',
            'Disrupting criminal operations',
            'Destroying attacker infrastructure',
            'Distributing "justice" unofficially'
        ],
        legal: 'Operates in a legal gray area - may face prosecution despite intentions.',
        examples: [
            'Anonymous (some operations)',
            'Hacktivist groups',
            'Government cyber units (unofficial)'
        ],
        resources: [
            { name: 'Cyber Defense Strategies', url: 'https://www.sans.org/cyber-security-courses/' },
            { name: 'Legal Cyber Operations', url: 'https://www.justice.gov/cyber' },
            { name: 'Ethical Hacking Forums', url: 'https://www.hackthissite.org/' }
        ]
    }
};

hatTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        const hatType = tag.classList[1];
        const hatData = hatModals[hatType];
        
        // Create modal HTML
        const modalHTML = `
            <div class="hat-modal active">
                <div class="hat-modal-content">
                    <span class="hat-modal-close">&times;</span>
                    <div class="hat-modal-header">
                        <h2>${hatData.title} <span class="hat-tag ${hatType}">${hatData.title.split(' ')[0]}</span></h2>
                        <p>${hatData.description}</p>
                    </div>
                    <div class="hat-modal-body">
                        <div class="hat-modal-section">
                            <h3><i class='bx bx-task'></i> Typical Activities</h3>
                            <ul>
                                ${hatData.activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="hat-modal-section">
                            <h3><i class='bx bx-shield-quarter'></i> Legal Status</h3>
                            <p>${hatData.legal}</p>
                        </div>
                        <div class="hat-modal-section">
                            <h3><i class='bx bx-user'></i> Famous Examples</h3>
                            <ul>
                                ${hatData.examples.map(example => `<li>${example}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="hat-modal-section hat-modal-resources">
                            <h3><i class='bx bx-book'></i> Learning Resources</h3>
                            ${hatData.resources.map(resource => `
                                <a href="${resource.url}" target="_blank">
                                    <i class='bx bx-link-external'></i> ${resource.name}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add close functionality
        const modal = document.querySelector('.hat-modal');
        const closeBtn = document.querySelector('.hat-modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Roadmap Modals
const roadmapSteps = [
    {
        title: "Networking Fundamentals",
        description: "Understanding how systems communicate is the foundation of cybersecurity.",
        topics: [
            "TCP/IP protocol suite",
            "DNS and how it works",
            "HTTP/HTTPS protocols",
            "VPN technologies",
            "Network topologies"
        ],
        time: "2-3 months",
        resources: [
            {
                name: "Cisco Networking Academy",
                url: "https://www.netacad.com/",
                type: "Free Course",
                description: "Free introductory networking courses"
            },
            {
                name: "Wireshark Masterclass",
                url: "https://www.udemy.com/course/wireshark/",
                type: "Paid Course",
                description: "Hands-on network analysis training"
            },
            {
                name: "CompTIA Network+",
                url: "https://www.comptia.org/certifications/network",
                type: "Certification",
                description: "Vendor-neutral networking certification"
            }
        ]
    },
    {
        title: "Linux Proficiency",
        description: "Most security tools run on Linux, making it essential for ethical hackers.",
        topics: [
            "Bash scripting",
            "System administration",
            "Package management",
            "File permissions",
            "Service management"
        ],
        time: "1-2 months",
        resources: [
            {
                name: "Linux Journey",
                url: "https://linuxjourney.com/",
                type: "Free Course",
                description: "Interactive Linux learning platform"
            },
            {
                name: "OverTheWire Bandit",
                url: "https://overthewire.org/wargames/bandit/",
                type: "Practice",
                description: "Linux command line challenges"
            },
            {
                name: "Linux Command Line Basics",
                url: "https://www.udemy.com/course/linux-command-line-basics/",
                type: "Paid Course",
                description: "Beginner to intermediate Linux skills"
            }
        ]
    },
    {
        title: "Security Tools",
        description: "Mastering essential security tools for penetration testing and defense.",
        topics: [
            "Nmap for network scanning",
            "Wireshark for packet analysis",
            "Metasploit framework",
            "Burp Suite for web testing",
            "John the Ripper for password cracking"
        ],
        time: "3-4 months",
        resources: [
            {
                name: "TryHackMe",
                url: "https://tryhackme.com/",
                type: "Practice Platform",
                description: "Hands-on security labs"
            },
            {
                name: "Hack The Box",
                url: "https://www.hackthebox.com/",
                type: "Practice Platform",
                description: "Real-world hacking challenges"
            },
            {
                name: "Metasploit Unleashed",
                url: "https://www.offensive-security.com/metasploit-unleashed/",
                type: "Free Course",
                description: "Complete Metasploit guide"
            }
        ]
    },
    {
        title: "Certifications",
        description: "Validating your skills with industry-recognized certifications.",
        topics: [
            "CEH (Certified Ethical Hacker)",
            "OSCP (Offensive Security Certified Professional)",
            "CompTIA Security+",
            "CISSP (Advanced)",
            "Specialized certifications"
        ],
        time: "Varies (3-6 months each)",
        resources: [
            {
                name: "Offensive Security Courses",
                url: "https://www.offensive-security.com/courses-and-certifications/",
                type: "Certification",
                description: "OSCP and other hands-on certs"
            },
            {
                name: "EC-Council CEH",
                url: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
                type: "Certification",
                description: "Ethical hacker certification"
            },
            {
                name: "Cybrary Free Training",
                url: "https://www.cybrary.it/",
                type: "Free Courses",
                description: "Preparation for various certs"
            }
        ]
    }
];

document.querySelectorAll('.roadmap-step').forEach((step, index) => {
    step.style.cursor = 'pointer';
    step.addEventListener('click', () => {
        const stepData = roadmapSteps[index];
        
        // Create modal HTML
        const modalHTML = `
            <div class="roadmap-modal active">
                <div class="roadmap-modal-content">
                    <span class="roadmap-modal-close">&times;</span>
                    <div class="roadmap-modal-header">
                        <div style="display: flex; align-items: center;">
                            <div class="step-number">${index + 1}</div>
                            <h2>${stepData.title}</h2>
                        </div>
                        <p>${stepData.description}</p>
                    </div>
                    <div class="roadmap-modal-body">
                        <div class="roadmap-modal-section">
                            <h3><i class='bx bx-list-check'></i> Key Topics</h3>
                            <ul>
                                ${stepData.topics.map(topic => `<li>${topic}</li>`).join('')}
                            </ul>
                            <h3><i class='bx bx-time'></i> Estimated Time</h3>
                            <p>${stepData.time} of dedicated study</p>
                        </div>
                        <div class="roadmap-modal-section">
                            <h3><i class='bx bx-book-alt'></i> Recommended Resources</h3>
                            ${stepData.resources.map(resource => `
                                <div class="roadmap-resource-card">
                                    <h4><i class='bx bx-link-external'></i> ${resource.name}</h4>
                                    <p><strong>${resource.type}</strong> - ${resource.description}</p>
                                    <a href="${resource.url}" target="_blank">Visit Resource <i class='bx bx-chevron-right'></i></a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add close functionality
        const modal = document.querySelector('.roadmap-modal');
        const closeBtn = document.querySelector('.roadmap-modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Close modals with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.hat-modal, .roadmap-modal').forEach(modal => {
            modal.remove();
        });
    }
});