/* ORVÉN JEWELS — Ring Customizer logic
   Handles: option selection, live SVG ring preview, price calc,
   design summary, and WhatsApp / request handoff. */

(function () {
  "use strict";

  // ---------- CONFIG ----------
  const BASE_PRICE = 22450; // base solitaire estimate
  const WHATSAPP_NUMBER = "917085628953"; // your business WhatsApp number

  const SIZE_LISTS = {
    US: [6, 7, 8, 9, 10],
    IND: [13, 14, 15, 16, 17, 18, 19, 20, 21]
  };

  // ---------- STATE ----------
  const state = {
    metal: { value: "Silver 925", color: "#C9CCD1", hi: "#F4F5F7", lo: "#8C8F94", price: 0 },
    band: { value: "Classic Plain Band", style: "plain", price: 0 },
    quality: "Lab-Grown",
    stone: { value: "Round", price: 0 },
    setting: { value: "Prong Setting", price: 0 },
    sizeSystem: "US",
    size: 6
  };

  // ---------- DOM ----------
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const sizeSelect = $("#sizeSelect");

  // ---------- GENERIC SELECTABLE GROUPS ----------
  function wireGroup(containerId, onSelect) {
    const container = $("#" + containerId);
    if (!container) return;
    $$("button", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("button", container).forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        onSelect(btn);
      });
    });
  }

  wireGroup("metalOptions", (btn) => {
    state.metal = {
      value: btn.dataset.value,
      color: btn.dataset.color,
      hi: btn.dataset.hi,
      lo: btn.dataset.lo,
      price: Number(btn.dataset.price)
    };
    render();
  });

  wireGroup("bandOptions", (btn) => {
    state.band = { value: btn.dataset.value, style: btn.dataset.style, price: Number(btn.dataset.price) };
    render();
  });

  wireGroup("stoneQuality", (btn) => {
    state.quality = btn.dataset.value;
    render();
  });

  wireGroup("shapeOptions", (btn) => {
    state.stone = { value: btn.dataset.value, price: Number(btn.dataset.price) };
    render();
  });

  wireGroup("settingOptions", (btn) => {
    state.setting = { value: btn.dataset.value, price: Number(btn.dataset.price) };
    render();
  });

  wireGroup("sizeSystem", (btn) => {
    state.sizeSystem = btn.dataset.value;
    populateSizes();
    render();
  });

  function populateSizes() {
    const list = SIZE_LISTS[state.sizeSystem];
    sizeSelect.innerHTML = list
      .map((s) => `<option value="${s}">${state.sizeSystem} - ${s}</option>`)
      .join("");
    state.size = list[0];
  }
  sizeSelect.addEventListener("change", (e) => {
    state.size = e.target.value;
    render();
  });

  // ---------- STONE SHAPE PATHS (mirrors the icon SVGs, scaled for the ring) ----------
  const STONE_PATHS = {
    Round: '<circle cx="0" cy="0" r="34"/>',
    Oval: '<ellipse cx="0" cy="0" rx="26" ry="36"/>',
    Pear: '<path d="M0 -34 C20 -8 24 10 12 24 C2 34 -12 28 -18 16 C-26 -2 -14 -26 0 -34 Z"/>',
    Princess: '<rect x="-24" y="-24" width="48" height="48"/>',
    Cushion: '<rect x="-26" y="-26" width="52" height="52" rx="16"/>',
    Emerald: '<rect x="-20" y="-30" width="40" height="60" rx="6"/>',
    Marquise: '<path d="M0 -36 C20 -18 20 18 0 36 C-20 18 -20 -18 0 -36 Z"/>',
    Heart: '<path d="M0 30 C-30 8 -26 -18 -8 -22 C-2 -22 0 -14 0 -10 C0 -14 2 -22 8 -22 C26 -18 30 8 0 30 Z"/>'
  };

  // ---------- RENDER ----------
  const ringSvg = $("#ringSvg");
  const stoneShape = $("#stoneShape");
  const prongs = $("#prongs");
  const gradHi = $("#gradHi");
  const gradMid = $("#gradMid");
  const gradLo = $("#gradLo");

  function renderRing() {
    // metal gradient
    gradHi.setAttribute("stop-color", state.metal.hi);
    gradMid.setAttribute("stop-color", state.metal.color);
    gradLo.setAttribute("stop-color", state.metal.lo);

    // stone shape
    stoneShape.innerHTML = STONE_PATHS[state.stone.value] || STONE_PATHS.Round;

    // setting: prongs visible for Prong/Solitaire/Cathedral, halo ring for Halo, bezel outline for Bezel/Tension
    prongs.innerHTML = "";
    const s = state.setting.value;
    if (s.startsWith("Prong") || s.startsWith("Solitaire") || s.startsWith("Cathedral")) {
      const positions = [[-26, -26], [26, -26], [-26, 26], [26, 26]];
      prongs.innerHTML = positions
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${state.metal.color}" stroke="#00000022"/>`)
        .join("");
    } else if (s.startsWith("Halo")) {
      prongs.innerHTML = `<circle cx="0" cy="0" r="46" fill="none" stroke="${state.metal.color}" stroke-width="10" stroke-dasharray="4 3"/>`;
    } else if (s.startsWith("Bezel") || s.startsWith("Tension")) {
      prongs.innerHTML = `<circle cx="0" cy="0" r="40" fill="none" stroke="${state.metal.color}" stroke-width="6"/>`;
    }
  }

  function computePrice() {
    let total = BASE_PRICE + state.metal.price + state.band.price + state.stone.price + state.setting.price;
    if (state.quality === "Natural") total += 45000; // natural diamonds priced higher
    return total;
  }

  function renderSummary() {
    $("#sumMetal").textContent = state.metal.value;
    $("#sumBand").textContent = state.band.value;
    $("#sumStone").textContent = `${state.stone.value} (${state.quality})`;
    $("#sumSetting").textContent = state.setting.value;
    $("#sumSize").textContent = `${state.sizeSystem} - ${state.size}`;

    const price = computePrice();
    $("#priceTotal").textContent = "₹" + price.toLocaleString("en-IN");
    return price;
  }

  function renderWhatsappLink(price) {
    const msg =
      `Hi ORVÉN JEWELS, I'd like to request this custom ring design:%0A` +
      `Metal: ${state.metal.value}%0A` +
      `Band: ${state.band.value}%0A` +
      `Stone: ${state.stone.value} (${state.quality})%0A` +
      `Setting: ${state.setting.value}%0A` +
      `Ring Size: ${state.sizeSystem} - ${state.size}%0A` +
      `Estimated Price: ₹${price.toLocaleString("en-IN")}`;
    $("#whatsappBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  function render() {
    renderRing();
    const price = renderSummary();
    renderWhatsappLink(price);
  }

  // ---------- TOOLBAR ----------
  $("#rotateBtn").addEventListener("click", () => {
    ringSvg.classList.remove("spin");
    void ringSvg.offsetWidth; // restart animation
    ringSvg.classList.add("spin");
  });

  let zoomed = false;
  $("#zoomBtn").addEventListener("click", () => {
    zoomed = !zoomed;
    ringSvg.style.transform = zoomed ? "scale(1.35)" : "scale(1)";
  });

  // ---------- REQUEST BUTTON ----------
  $("#requestDesignBtn").addEventListener("click", () => {
    const price = computePrice();
    alert(
      `Design request captured!\n\n` +
      `Metal: ${state.metal.value}\nBand: ${state.band.value}\n` +
      `Stone: ${state.stone.value} (${state.quality})\nSetting: ${state.setting.value}\n` +
      `Size: ${state.sizeSystem} - ${state.size}\nEstimated Price: ₹${price.toLocaleString("en-IN")}\n\n` +
      `Connect this button to your backend/email service to actually send the request.`
    );
  });

  // ---------- INIT ----------
  populateSizes();
  render();
})();