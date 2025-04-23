// Preloader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate Links
    navLinkItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        navLinkItems.forEach(item => {
            item.style.animation = '';
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Cursor Effects
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button, .portfolio-item, .service-card, .tab-btn').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Tab System
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
const testimonialSlider = new Swiper('.testimonial-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        const submitIcon = submitBtn.querySelector('i');
        
        // Change button text and icon
        submitBtn.querySelector('span').textContent = 'Mengirim...';
        submitIcon.classList.remove('fa-paper-plane');
        submitIcon.classList.add('fa-spinner', 'fa-spin');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Terkirim!';
            submitIcon.classList.remove('fa-spinner', 'fa-spin');
            submitIcon.classList.add('fa-check');
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitIcon.classList.remove('fa-check');
                submitIcon.classList.add('fa-paper-plane');
            }, 3000);
        }, 2000);
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
const animateOnScroll = () => {
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out'
        });
    });
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out'
        });
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Animate skill bars
    gsap.to('.skill-progress', {
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        width: '100%',
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2
    });
});

// Tilt effect for hero image
VanillaTilt.init(document.querySelector(".tilt"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Floating action button click event
const fab = document.querySelector('.fab');
if (fab) {
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    });
}
