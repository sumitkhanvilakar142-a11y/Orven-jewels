// ==========================================
// ORVÉN JEWELS - Main JavaScript Functions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log("ORVÉN JEWELS Storefront Initialized.");

  // Interactive Live Rate Ticker subtle pulse or update effects can go here
  initLiveTickerEffects();
});

// Smooth scroll functionality for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Helper function for live rates ticker animation or interaction
function initLiveTickerEffects() {
  const ticker = document.querySelector('.live-rates-ticker');
  if (ticker) {
    // Optional: add dynamic visual enhancements if needed
  }
}

// Global utility to check if a user is logged in via LocalStorage
function getCurrentUser() {
  return localStorage.getItem('orven_current_user') || null;
}
