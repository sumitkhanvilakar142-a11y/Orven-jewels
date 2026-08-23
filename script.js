/* ============================================
   ORVEN JEWELS — complete JavaScript
   (interactivity & demo feedback)
   ============================================ */

(function() {
  'use strict';

  // ── console greeting ──
  console.log('✨ ORVEN JEWELS — timeless elegance');

  // ── helper: add click feedback with scale/opacity ──
  function addClickFeedback(elements) {
    elements.forEach(el => {
      el.addEventListener('click', function(e) {
        // prevent default for # links
        if (this.tagName === 'A' && this.getAttribute('href') === '#') {
          e.preventDefault();
        }
        // apply subtle feedback
        this.style.transform = 'scale(0.96)';
        this.style.opacity = '0.7';
        setTimeout(() => {
          this.style.transform = '';
          this.style.opacity = '';
        }, 180);
      });
    });
  }

  // ── collect all interactive elements ──
  const interactive = [
    ...document.querySelectorAll('.btn'),
    ...document.querySelectorAll('.view-link'),
    ...document.querySelectorAll('.nav-links a'),
    ...document.querySelectorAll('.nav-actions i'),
    ...document.querySelectorAll('.social-icons i'),
    ...document.querySelectorAll('.footer-links span'),
  ];
  addClickFeedback(interactive);

  // ── collection cards: log which collection is viewed ──
  document.querySelectorAll('.collection-card .view-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.collection-card');
      const label = card?.querySelector('h4')?.innerText || 'collection';
      console.log(`🔍 Viewing ${label} collection (demo)`);
    });
  });

  // ── story button ──
  const storyBtn = document.querySelector('.story-content .btn');
  if (storyBtn) {
    storyBtn.addEventListener('click', function() {
      console.log('📖 Learn more about ORVEN (demo)');
    });
  }

  // ── custom design button ──
  const customBtn = document.querySelector('.custom-section .btn');
  if (customBtn) {
    customBtn.addEventListener('click', function() {
      console.log('✏️ Request custom design (demo)');
    });
  }

  // ── hero buttons ──
  document.querySelectorAll('.hero-btns .btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const text = this.innerText.trim();
      console.log(`🛒 ${text} (demo action)`);
    });
  });

  // ── footer "shop on whatsapp" ──
  const whatsappBtn = document.querySelector('.footer-follow .btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      console.log('📲 Shop on WhatsApp (demo)');
    });
  }

  // ── extra: collection cards themselves (click on card) ──
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', function() {
      const label = this.querySelector('h4')?.innerText || 'item';
      console.log(`🪄 ${label} card clicked (demo)`);
    });
  });

  // ── nav brand logo click ──
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🏠 ORVEN home (demo)');
    });
  }

  console.log('✅ ORVEN interface ready');

})();
