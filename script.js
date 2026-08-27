/* =========================================================
   ORVÉN JEWELS
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

  });

}


/* =========================================================
   HERO VIDEO
   IMPORTANT:
   VIDEO SOURCE IS NOT CHANGED.
========================================================= */

const heroVideo = document.querySelector(".hero-video");
const videoControl = document.getElementById("videoControl");

if (heroVideo) {

  heroVideo.muted = true;

  const playVideo = () => {

    heroVideo.play().catch(() => {
      console.log("Autoplay blocked by browser.");
    });

  };

  playVideo();


  if (videoControl) {

    videoControl.addEventListener("click", () => {

      if (heroVideo.paused) {

        heroVideo.play();

        videoControl.textContent = "❚❚";

      } else {

        heroVideo.pause();

        videoControl.textContent = "▶";

      }

    });

  }

}


/* =========================================================
   METAL SELECTOR
========================================================= */

const metalButtons = document.querySelectorAll(".metal");
const selectedMetal = document.getElementById("selectedMetal");

metalButtons.forEach(button => {

  button.addEventListener("click", () => {

    metalButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    if (selectedMetal) {

      selectedMetal.textContent =
        button.dataset.metal;

    }

  });

});


/* =========================================================
   REAL RING IMAGE HOVER
========================================================= */

const realRing = document.querySelector(".real-ring img");

if (realRing) {

  realRing.addEventListener("mouseenter", () => {

    realRing.style.transform = "scale(1.07)";

  });


  realRing.addEventListener("mouseleave", () => {

    realRing.style.transform = "scale(1)";

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".category, .quiz-card, .ring-card, .custom-studio, .collection-card"
);

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {

  observer.observe(element);

});
