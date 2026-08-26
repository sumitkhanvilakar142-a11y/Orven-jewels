const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
  menuBtn.textContent = mobileNav.classList.contains("show") ? "×" : "☰";
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
    menuBtn.textContent = "☰";
  });
});

const quizModal = document.getElementById("quizModal");
const quizBtn = document.getElementById("quizBtn");
const closeModal = document.getElementById("closeModal");
const startQuiz = document.getElementById("startQuiz");

quizBtn.addEventListener("click", () => {
  quizModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  quizModal.classList.remove("show");
});

startQuiz.addEventListener("click", () => {
  alert("Quiz feature coming soon!");
  quizModal.classList.remove("show");
});

quizModal.addEventListener("click", event => {
  if (event.target === quizModal) {
    quizModal.classList.remove("show");
  }
});

document.querySelectorAll(".metal").forEach(metal => {
  metal.addEventListener("click", () => {
    document.querySelectorAll(".metal").forEach(item => {
      item.style.outline = "none";
    });

    metal.style.outline = "2px solid #f0d3a2";
    metal.style.outlineOffset = "4px";
  });
});

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
  });
});
