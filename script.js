document.addEventListener('DOMContentLoaded', () => {

  // ---------- Hero Video Autoplay & Fallback Fix ----------
  const heroVideo = document.querySelector('.hero-video');

  if (heroVideo) {
    // Ensure video properties are set correctly for mobile browsers
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    // Force video play command
    const playVideo = () => {
      heroVideo.play().then(() => {
        console.log("Hero video playing successfully");
      }).catch(error => {
        console.log("Autoplay blocked by browser, attempting muted re-play:", error);
        heroVideo.muted = true;
        heroVideo.play();
      });
    };

    playVideo();

    // Re-trigger play on user interaction if browser blocked initial autoplay
    const handleFirstInteraction = () => {
      if (heroVideo.paused) {
        heroVideo.play();
      }
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
  }

  // ---------- Smooth Scroll for Navigation Links ----------
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
