document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Background Blur on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-pure-black/95', 'shadow-lg');
        } else {
            header.classList.remove('bg-pure-black/95', 'shadow-lg');
        }
    });

    // 2. Scroll Reveal Animation for Luxury Sections
    const observerOptions = {
        root: null,
        threshold: 0.15
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

    // 3. Dynamic WhatsApp Order Handler
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    const phoneNumber = "919876543210"; // Apna WhatsApp Number yahan dalein

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const message = encodeURIComponent("Hello ORVÉN JEWELS team, I would like to inquire about your custom jewelry collection.");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

});
