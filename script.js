// Hero video ko automatically play karna
// Video ka source/change nahi kiya gaya hai.

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  heroVideo.muted = true;

  heroVideo.play().catch(() => {
    console.log("Video autoplay browser ke dwara blocked hai.");
  });
}


// Featured ring hover effect
const ringImage = document.querySelector(".real-ring img");

if (ringImage) {
  ringImage.addEventListener("mouseenter", () => {
    ringImage.style.transform = "scale(1.08)";
    ringImage.style.transition = "0.5s ease";
  });

  ringImage.addEventListener("mouseleave", () => {
    ringImage.style.transform = "scale(1)";
  });
}
