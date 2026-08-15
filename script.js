document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Shadow
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-xl', 'border-white/20');
        } else {
            header.classList.remove('shadow-xl', 'border-white/20');
        }
    });

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        revealObserver.observe(element);
    });

    // WhatsApp Dynamic Link Routing
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    const phoneNumber = "919876543210"; // Aapka Phone Number

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const message = encodeURIComponent("Hello ORVÉN JEWELS, I would like to inquire about your custom jewelry collection.");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

});
