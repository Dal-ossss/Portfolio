// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.createElement('button');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');

// Theme Toggle Setup
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '☀️';
themeToggle.setAttribute('aria-label', 'Toggle light mode');
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
}

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? '' : 'light';
    
    if (newTheme) {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    }
    themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Down Button
const scrollDown = document.querySelector('.hero-scroll');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = aboutSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
            
            // Animate text elements in the section
            const textElements = entry.target.querySelectorAll('h2, h3, .project-title, .about-text p, .skill-name, .contact-info p');
            textElements.forEach((el, index) => {
                el.classList.add('animate-text', `delay-${(index % 5) + 1}`);
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, 50);
            });
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Add hidden class and observe sections
sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Make hero section visible immediately
document.querySelector('.hero').classList.remove('hidden');
document.querySelector('.hero').classList.add('visible');

// Animate hero text on page load
window.addEventListener('load', () => {
    const heroText = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
    heroText.forEach((el, index) => {
        el.classList.add('animate-text', `delay-${index + 1}`);
        setTimeout(() => {
            el.classList.add('animate-in');
        }, 50);
    });
});

// Animate Skill Bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Active Navigation Link Highlighting
const navObserverOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// Add active state styles for navigation
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Send email using EmailJS
        sendEmail(name, email, subject, message);
    });
}

// EmailJS Configuration and Email Sending Function
function sendEmail(name, email, subject, message) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // EmailJS Template Parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        to_name: 'David Seth Yaba',
        subject: subject,
        message: message,
        reply_to: email
    };
    
    // EmailJS Configuration
    // IMPORTANT: Replace these with your own EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID  
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key
    
    // Check if EmailJS is initialized
    if (typeof emailjs === 'undefined') {
        showNotification('Email service not available. Please try again later.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Initialize EmailJS with your public key
    emailjs.init(publicKey);
    
    // Send the email
    emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.log('FAILED...', error);
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Poppins', sans-serif;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Particle Background Effect for Hero Section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background-color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
    
    // Add particle animation styles
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);
}

// Initialize particles
createParticles();

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
                card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Project Card Lightbox Modal
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalClose = document.querySelector('.modal-close');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click event to open lightbox
    card.addEventListener('click', (e) => {
        // Get the image and title from the card
        const imgElement = card.querySelector('.project-image img');
        const titleElement = card.querySelector('.project-title');
        const categoryElement = card.querySelector('.project-category');
        
        if (imgElement && titleElement) {
            // Set modal content
            modalImage.src = imgElement.src;
            modalImage.alt = imgElement.alt;
            modalTitle.textContent = titleElement.textContent;
            modalCategory.textContent = categoryElement ? categoryElement.textContent : '';
            
            // Show modal
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
    
    // Make cursor indicate clickability
    card.style.cursor = 'pointer';
});

// Close modal functionality
function closeModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close button
modalClose.addEventListener('click', closeModal);

// Close when clicking outside the image
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeModal();
    }
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const target = parseInt(text);
        const suffix = hasPlus ? '+' : hasPercent ? '%' : '';
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Observe stats section for animation
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add copy to clipboard functionality for email
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    const link = item.querySelector('.contact-link');
    if (link && link.href.startsWith('mailto:')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const email = link.textContent;
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy email', 'error');
            });
        });
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (imageModal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Prevent zoom on double tap for mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Console greeting
console.log('%c Welcome to my Portfolio! 🚀', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c Built with HTML, CSS, and JavaScript', 'color: #a0d0a0; font-size: 14px;');

// Ripple Effect on Button Click
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        if (!button.style.position || button.style.position === 'static') {
            button.style.position = 'relative';
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Typing Effect for Hero Section (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}