document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Hero Video Control
  const video = document.getElementById("heroVideo");
  const videoControl = document.getElementById("videoControl");
  if (video && videoControl) {
    videoControl.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        videoControl.textContent = "❚❚";
      } else {
        video.pause();
        videoControl.textContent = "▶";
      }
    });
  }

  // Metal Swatches Selection
  const swatches = document.querySelectorAll(".metal-swatches .metal");
  const selectedMetal = document.getElementById("selectedMetal");
  swatches.forEach((swatch) => {
    swatch.addEventListener("click", function () {
      swatches.forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      if (selectedMetal) {
        selectedMetal.textContent = this.getAttribute("data-metal");
      }
    });
  });
});
