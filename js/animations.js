
// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animation
    gsap.from('#home h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('#home p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.7
    });
    
    gsap.from('#home .btn-primary, #home .btn-secondary', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.9,
        stagger: 0.1
    });
    
    gsap.from('#home img', {
        duration: 1.5,
        x: 50,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.7
    });
    
    // Section animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
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
    
    // Product cards animation
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Testimonial cards animation
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Floating elements animation
    gsap.to('.animate-float', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    
    ScrollTrigger.create({
        start: 100,
        onUpdate: (self) => {
            if (self.direction === -1) {
                navbar.classList.remove('shadow-sm');
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
                navbar.classList.add('shadow-sm');
            }
        }
    });
});
