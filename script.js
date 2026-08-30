document.addEventListener("DOMContentLoaded", function() {
  // Ensure background video plays smoothly on mobile and desktop
  const bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    bgVideo.play().catch(error => {
      console.log("Auto-play was prevented by browser policy:", error);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== "#" && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
