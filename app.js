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

// Cybersecurity Modals Data
const cyberModals = {
    'kali-modal': {
        title: 'Kali Linux Setup Guide',
        content: `
            <h4>Installation Steps:</h4>
            <ol>
                <li>Download Kali ISO from official site</li>
                <li>Create bootable USB with Rufus/BalenaEtcher</li>
                <li>Boot from USB and select "Graphical Install"</li>
                <li>Follow installation wizard (recommend full disk encryption)</li>
                <li>Update system: <code>sudo apt update && sudo apt full-upgrade -y</code></li>
            </ol>
            
            <h4>Essential Post-Install:</h4>
            <ul>
                <li>Install guest additions for VMs</li>
                <li>Configure network mirror for faster updates</li>
                <li>Set up persistent storage for live USBs</li>
                <li>Create non-root user for daily tasks</li>
            </ul>
            
            <div class="disclaimer">
                <strong>Note:</strong> Only use on systems you own or have permission to test.
            </div>
        `
    },
    'tools-modal': {
        title: 'Security Tools Usage',
        content: `
            <h4>Nmap Basic Commands:</h4>
            <pre><code>nmap -sV -O target.com  # Version/OS detection
nmap -p 1-1000 target.com  # Port range scan
nmap --script vuln target.com  # Vulnerability scan</code></pre>
            
            <h4>Metasploit Framework:</h4>
            <pre><code>msfconsole  # Launch framework
search exploit_name  # Find exploits
use exploit/path  # Select exploit
set RHOSTS target.com  # Configure target
exploit  # Run the exploit</code></pre>
            
            <h4>Wireshark Tips:</h4>
            <ul>
                <li>Use display filters to focus on specific traffic</li>
                <li>Follow TCP streams to reconstruct sessions</li>
                <li>Export objects from HTTP traffic</li>
            </ul>
        `
    },
    'security-modal': {
        title: 'Advanced Security Practices',
        content: `
            <h4>Double Your Security:</h4>
            <ol>
                <li>Enable hardware security keys for critical accounts</li>
                <li>Implement network segmentation</li>
                <li>Use application allowlisting</li>
                <li>Regularly audit permissions and access controls</li>
                <li>Monitor for credential leaks with HaveIBeenPwned</li>
            </ol>
            
            <h4>Hat Types Explained:</h4>
            <div class="hat-types-modal">
                <div class="hat-type">
                    <span class="hat-tag white-hat">White Hat</span>
                    <p>Ethical hackers working legally to improve security</p>
                </div>
                <div class="hat-type">
                    <span class="hat-tag black-hat">Black Hat</span>
                    <p>Malicious hackers exploiting systems illegally</p>
                </div>
                <div class="hat-type">
                    <span class="hat-tag red-hat">Red Hat</span>
                    <p>Aggressive defenders targeting black hat infrastructure</p>
                </div>
            </div>
        `
    },
    'phishing-modal': {
        title: 'Phishing Defense Guide',
        content: `
            <h4>Spotting Fake Emails:</h4>
            <ul>
                <li>Check sender's email address (not just display name)</li>
                <li>Look for poor grammar and spelling mistakes</li>
                <li>Beware of urgent or threatening language</li>
                <li>Verify unexpected attachments or links</li>
            </ul>
            
            <h4>Identifying Fake Links:</h4>
            <ol>
                <li>Hover over links to see actual destination</li>
                <li>Check for HTTPS and valid certificates</li>
                <li>Look for subtle domain misspellings</li>
                <li>Use URL scanners like VirusTotal</li>
            </ol>
            
            <h4>Educational Site Cloning:</h4>
            <div class="disclaimer">
                <strong>Disclaimer:</strong> Only clone sites you own or have permission to test.
            </div>
            <pre><code># Basic site cloning with wget
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent http://example.com</code></pre>
        `
    },
    'data-modal': {
        title: 'Data Security Methods',
        content: `
            <h4>Excel Security:</h4>
            <ul>
                <li>Password protect sensitive files</li>
                <li>Disable macros from untrusted sources</li>
                <li>Use data validation to prevent injection</li>
                <li>Remove metadata before sharing</li>
            </ul>
            
            <h4>Database Protection:</h4>
            <ol>
                <li>Implement field-level encryption</li>
                <li>Use parameterized queries to prevent SQLi</li>
                <li>Regularly backup with encryption</li>
                <li>Monitor for unusual access patterns</li>
            </ol>
            
            <h4>Data Analysis Security:</h4>
            <p>When working with sensitive statistics:</p>
            <ul>
                <li>Anonymize personally identifiable information</li>
                <li>Use differential privacy techniques</li>
                <li>Implement k-anonymity for datasets</li>
                <li>Secure data pipelines end-to-end</li>
            </ul>
        `
    },
    'dev-modal': {
        title: 'Secure Development Practices',
        content: `
            <h4>Essential Security Principles:</h4>
            <ul>
                <li>Validate all user inputs</li>
                <li>Implement proper authentication and authorization</li>
                <li>Use prepared statements for database queries</li>
                <li>Sanitize output to prevent XSS</li>
                <li>Implement CSRF protection</li>
            </ul>
            
            <h4>OWASP Top 10 to Address:</h4>
            <ol>
                <li>Injection</li>
                <li>Broken Authentication</li>
                <li>Sensitive Data Exposure</li>
                <li>XML External Entities (XXE)</li>
                <li>Broken Access Control</li>
                <li>Security Misconfiguration</li>
                <li>Cross-Site Scripting (XSS)</li>
                <li>Insecure Deserialization</li>
                <li>Using Components with Known Vulnerabilities</li>
                <li>Insufficient Logging & Monitoring</li>
            </ol>
            
            <h4>Secure Coding Resources:</h4>
            <a href="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/" target="_blank">
                <i class='bx bx-link-external'></i> OWASP Secure Coding Practices
            </a>
        `
    },
    'swe-modal': {
        title: 'Secure Software Engineering',
        content: `
            <h4>Key Practices:</h4>
            <ul>
                <li><strong>Input validation & sanitization:</strong> Validate all user inputs on both client and server sides</li>
                <li><strong>Secure authentication flows:</strong> Implement proper session management, MFA, and password policies</li>
                <li><strong>Dependency vulnerability scanning:</strong> Use tools like npm audit, Snyk, or Dependabot</li>
                <li><strong>Secure API design principles:</strong> Proper authentication, rate limiting, and input validation</li>
            </ul>
            
            <h4>Dev Best Practices:</h4>
            <ol>
                <li>Follow the principle of least privilege</li>
                <li>Implement proper error handling (without leaking sensitive info)</li>
                <li>Use security headers (CSP, XSS Protection, HSTS)</li>
                <li>Regularly update dependencies</li>
                <li>Conduct code reviews with security in mind</li>
            </ol>
            
            <h4>Resources:</h4>
            <a href="https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/" target="_blank">
                <i class='bx bx-link-external'></i> OWASP Secure Coding Practices
            </a>
        `
    },
    're-modal': {
        title: 'Reverse Engineering Basics',
        content: `
            <h4>Essential Tools:</h4>
            <div class="tool-list">
                <div class="tool-item">
                    <h4>Ghidra</h4>
                    <p>NSA's open-source reverse engineering tool with decompiler</p>
                </div>
                <div class="tool-item">
                    <h4>IDA Pro</h4>
                    <p>Industry standard disassembler and debugger</p>
                </div>
                <div class="tool-item">
                    <h4>Radare2</h4>
                    <p>Open-source framework for reverse engineering</p>
                </div>
            </div>
            
            <h4>Techniques:</h4>
            <ul>
                <li><strong>Static Analysis:</strong> Examining code without execution (disassembly, decompilation)</li>
                <li><strong>Dynamic Analysis:</strong> Runtime analysis with debuggers and sandboxes</li>
                <li>Control flow analysis</li>
                <li>String extraction and pattern matching</li>
            </ul>
            
            <h4>Get Started:</h4>
            <ol>
                <li>Install Ghidra from <a href="https://ghidra-sre.org/" target="_blank">ghidra-sre.org</a></li>
                <li>Practice with crackmes from <a href="https://crackmes.one/" target="_blank">crackmes.one</a></li>
                <li>Learn assembly basics for your target architecture</li>
            </ol>
        `
    },
    'net-modal': {
        title: 'Network Threat Detection',
        content: `
            <h4>Monitoring Techniques:</h4>
            <ul>
                <li><strong>ARP monitoring:</strong> Detect unknown IP-MAC associations that may indicate spoofing</li>
                <li><strong>Wireshark filters:</strong> Use filters like <code>tcp.flags.syn==1 and tcp.flags.ack==0</code> for SYN scans</li>
                <li><strong>SIEM tools:</strong> Configure alerts for unusual traffic patterns or known attack signatures</li>
            </ul>
            
            <h4>Detection Methods:</h4>
            <ol>
                <li>Establish baseline of normal network behavior</li>
                <li>Monitor for protocol anomalies (e.g., DNS tunneling)</li>
                <li>Watch for unusual port activity or traffic spikes</li>
                <li>Implement IDS/IPS systems</li>
            </ol>
            
            <h4>Useful Commands:</h4>
            <pre><code># ARP watch (Linux)
arpwatch -i eth0

# Detect ARP spoofing
arp -a | sort

# Wireshark filter for suspicious DNS
dns.flags.response == 0 and len(dns.qry.name) > 30</code></pre>
        `
    },
    'stats-modal': {
        title: 'Security Statistics',
        content: `
            <div class="stats-grid">
                <div class="stat-item">
                    <h4>Top Attack Vectors (2024)</h4>
                    <ul>
                        <li>Phishing: 36%</li>
                        <li>Stolen Credentials: 25%</li>
                        <li>Vulnerability Exploits: 18%</li>
                        <li>Misconfigurations: 11%</li>
                    </ul>
                </div>
                <div class="stat-item">
                    <h4>Detection Times</h4>
                    <ul>
                        <li>Average: 207 days</li>
                        <li>Median: 73 days</li>
                        <li>90th percentile: 2+ years</li>
                    </ul>
                </div>
                <div class="stat-item">
                    <h4>Breach Costs</h4>
                    <ul>
                        <li>Average total cost: $4.45M</li>
                        <li>Cost per record: $165</li>
                        <li>Most expensive sector: Healthcare</li>
                    </ul>
                </div>
                <div class="stat-item">
                    <h4>Defense ROI</h4>
                    <ul>
                        <li>Security awareness training reduces risk by 70%</li>
                        <li>MFA blocks 99.9% of bulk attacks</li>
                        <li>Prompt patching prevents 60% of breaches</li>
                    </ul>
                </div>
            </div>
            
            <h4>Sources:</h4>
            <ul>
                <li>Verizon DBIR 2024</li>
                <li>IBM Cost of a Data Breach Report</li>
                <li>Microsoft Digital Defense Report</li>
            </ul>
        `
    },
    'lang-modal': {
        title: 'Hacking Languages Guide',
        content: `
            <div class="language-list">
                <div class="language">
                    <h4>Python</h4>
                    <p><strong>Primary Uses:</strong> Automation, tool development, scripting</p>
                    <p><strong>Key Libraries:</strong> Requests, Scapy, pwntools, BeautifulSoup</p>
                    <p><strong>Learning Resource:</strong> <a href="https://www.learnpython.org/" target="_blank">learnpython.org</a></p>
                </div>
                <div class="language">
                    <h4>Bash</h4>
                    <p><strong>Primary Uses:</strong> Linux system tasks, automation, scripting</p>
                    <p><strong>Key Concepts:</strong> Piping, redirection, process management</p>
                    <p><strong>Learning Resource:</strong> <a href="https://linuxcommand.org/" target="_blank">linuxcommand.org</a></p>
                </div>
                <div class="language">
                    <h4>SQL</h4>
                    <p><strong>Primary Uses:</strong> Database security, injection testing</p>
                    <p><strong>Key Concepts:</strong> Queries, joins, subqueries, blind SQLi</p>
                    <p><strong>Learning Resource:</strong> <a href="https://sqlzoo.net/" target="_blank">SQLZoo</a></p>
                </div>
            </div>
            
            <h4>Learning Path:</h4>
            <ol>
                <li>Start with Python for general scripting</li>
                <li>Learn Bash for Linux system interaction</li>
                <li>Study SQL for database security</li>
                <li>Add C for low-level understanding</li>
                <li>Optional: Learn JavaScript for web-specific testing</li>
            </ol>
            
            <h4>Practice Platforms:</h4>
            <ul>
                <li><a href="https://www.hackthebox.com/" target="_blank">Hack The Box</a></li>
                <li><a href="https://tryhackme.com/" target="_blank">TryHackMe</a></li>
                <li><a href="https://overthewire.org/wargames/" target="_blank">OverTheWire</a></li>
            </ul>
        `
    }
};

// Add click handlers for learn more buttons
document.querySelectorAll('.cyber-learn-more').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modalData = cyberModals[modalId];
        
        const modalHTML = `
            <div class="cyber-modal active">
                <div class="cyber-modal-content">
                    <span class="cyber-modal-close">&times;</span>
                    <h3>${modalData.title}</h3>
                    <div class="cyber-modal-body">
                        ${modalData.content}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add close functionality
        const modal = document.querySelector('.cyber-modal');
        const closeBtn = document.querySelector('.cyber-modal-close');
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    });
});