class RingCustomizer {
  constructor() {
    this.ringBand = document.getElementById('ringBand');
    this.ringStone = document.getElementById('ringStone');
    this.engravingDisplay = document.getElementById('engravingDisplay');
  }

  setMetal(color, targetBtn) {
    this.ringBand.style.borderColor = color;
    this.toggleActive(targetBtn);
  }

  setStone(color, rotation, targetBtn) {
    this.ringStone.style.backgroundColor = color;
    this.ringStone.style.transform = `rotate(${rotation})`;
    this.toggleActive(targetBtn);
  }

  setBandThickness(width, targetBtn) {
    this.ringBand.style.borderWidth = width;
    this.toggleActive(targetBtn);
  }

  updateEngraving(text) {
    this.engravingDisplay.innerText = text.toUpperCase();
  }

  toggleActive(element) {
    const siblings = element.parentElement.querySelectorAll('.opt-btn');
    siblings.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
  }
}

// Initialize Customizer
const customizer = new RingCustomizer();
