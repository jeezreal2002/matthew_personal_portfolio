// ===================================
// Preloader
// ===================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Remove loading class from body
    body.classList.remove('loading');
    
    // Fade out preloader
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Show preloader for 1.5 seconds
});

// Add loading class to body initially
document.body.classList.add('loading');

// ===================================
// Navigation Bar Scroll Effect & Active Links
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Combined scroll handler for better performance
function handleScroll() {
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // If at the very top, activate home
    if (window.scrollY < 300) {
        current = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
}

// Attach scroll event
window.addEventListener('scroll', handleScroll);

// Call once on page load
document.addEventListener('DOMContentLoaded', handleScroll);

// ===================================
// Mobile Menu Toggle
// ===================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll for CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = ctaButton.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ===================================
// Back to Top Button
// ===================================

const backToTopButton = document.getElementById('back-to-top');

// Back to top button functionality (scroll detection is now in main handleScroll function)
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Scroll Animations (Fade In on Scroll)
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Observe cards and items
const animatedElements = document.querySelectorAll(
    '.timeline-item, .skill-card, .certificate-card, .reference-card, .experience-card, .about-content'
);
animatedElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Skills Progress Bar Animation
// ===================================

const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            const skillProgress = document.querySelectorAll('.skill-progress');
            skillProgress.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===================================
// Contact Form Submission
// ===================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link (as a simple solution)
        const mailtoLink = `mailto:matthewfermil@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Show success message
        showNotification('Thank you for your message! Opening your email client...', 'success');
        
        // Open mailto link
        setTimeout(() => {
            window.location.href = mailtoLink;
            contactForm.reset();
        }, 1000);
    });
}

// ===================================
// Notification Function
// ===================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: 'Lato', sans-serif;
        animation: slideInRight 0.5s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// ===================================
// Add CSS animations for notifications
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Active Navigation Link on Scroll
// ===================================

function updateActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // If at the very top, activate home
    if (window.scrollY < 100) {
        current = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Call on scroll
window.addEventListener('scroll', updateActiveNav);

// Call on page load
window.addEventListener('load', updateActiveNav);

// ===================================
// Parallax Effect for Hero Section
// ===================================

const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Timeline Animation on Scroll
// ===================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===================================
// Certificate Cards Stagger Animation
// ===================================

const certificateCards = document.querySelectorAll('.certificate-card');

const certificateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            certificateObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

certificateCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    certificateObserver.observe(card);
});

// ===================================
// Reference Cards Animation
// ===================================

const referenceCards = document.querySelectorAll('.reference-card');

const referenceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
            referenceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

referenceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'all 0.5s ease';
    referenceObserver.observe(card);
});

// ===================================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     window.addEventListener('load', () => {
//         typeWriter(heroSubtitle, originalText, 50);
//     });
// }

// ===================================
// Loading Animation
// ===================================

window.addEventListener('load', () => {
    // Add loaded class to body for any load-based animations
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroText.style.transition = 'all 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===================================
// Prevent Flash of Unstyled Content
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ===================================
// Console Message
// ===================================

console.log('%c👔 Matthew D. Fermil - Portfolio', 'color: #CDA349; font-size: 20px; font-weight: bold;');
console.log('%cHospitality Professional | Passionate about Service Excellence', 'color: #223A5E; font-size: 14px;');
console.log('%c📧 matthewfermil@gmail.com', 'color: #5D6D7E; font-size: 12px;');

