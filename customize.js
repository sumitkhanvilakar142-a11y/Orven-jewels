/* =========================================================
   ORVÉN JEWELS
   CUSTOM JEWELLERY CONFIGURATOR
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

// Replace this with your actual ORVÉN WhatsApp number.
// Country code +91, without + or spaces.
const WHATSAPP_NUMBER = "919999999999";


/* =========================================================
   STATE
========================================================= */

const state = {

  metal: "Silver 925",

  metalColor: "#c9c9c9",

  ring: "Classic Solitaire",

  stone: "Round",

  setting: "Four Prong",

  sizeSystem: "US",

  size: "7",

  zoom: 1,

  rotation: 0

};


/* =========================================================
   DIAMOND SHAPES
========================================================= */

const diamondShapes = [

  ["Round", "round"],

  ["Oval", "oval"],

  ["Pear", "pear"],

  ["Cushion Modified", "cushion"],

  ["Cushion Brilliant", "cushion"],

  ["Emerald", "emerald"],

  ["Radiant", "radiant"],

  ["Princess", "princess"],

  ["Asscher", "asscher"],

  ["Square", "princess"],

  ["Marquise", "marquise"],

  ["Heart", "heart"],

  ["Trilliant", "trilliant"],

  ["Baguette", "baguette"],

  ["Half Moon", "halfmoon"],

  ["Trapezoid", "trapezoid"],

  ["Kite", "kite"],

  ["Shield", "shield"],

  ["Hexagonal", "hexagonal"],

  ["Octagonal", "octagonal"],

  ["Portuguese", "octagonal"],

  ["Star", "star"],

  ["Capsule", "capsule"],

  ["Lozenge", "kite"],

  ["Bullets", "trilliant"],

  ["Flanders", "square"],

  ["Tap Bag", "trapezoid"],

  ["Criss Cut", "radiant"],

  ["Cadillac", "trapezoid"],

  ["Moval Cut", "oval"],

  ["Lily", "pear"],

  ["Oval Step", "oval"],

  ["Pear Step", "pear"],

  ["Calf Head", "shield"],

  ["Dutch Marquise", "marquise"]

];


/* =========================================================
   DOM
========================================================= */

const shapeGrid =
  document.getElementById("shapeGrid");

const sizeGrid =
  document.getElementById("sizeGrid");

const metalSelected =
  document.getElementById("metalSelected");

const ringSelected =
  document.getElementById("ringSelected");

const stoneSelected =
  document.getElementById("stoneSelected");

const settingSelected =
  document.getElementById("settingSelected");

const sizeSelected =
  document.getElementById("sizeSelected");

const summaryMetal =
  document.getElementById("summaryMetal");

const summaryRing =
  document.getElementById("summaryRing");

const summaryStone =
  document.getElementById("summaryStone");

const summarySetting =
  document.getElementById("summarySetting");

const summarySize =
  document.getElementById("summarySize");

const previewMetal =
  document.getElementById("previewMetal");

const previewStone =
  document.getElementById("previewStone");

const previewSetting =
  document.getElementById("previewSetting");

const previewSize =
  document.getElementById("previewSize");

const ringBand =
  document.getElementById("ringBand");

const ringSetting =
  document.getElementById("ringSetting");

const diamond =
  document.getElementById("diamond");

const ringPreview =
  document.getElementById("ringPreview");

const designNumber =
  document.getElementById("designNumber");


/* =========================================================
   CREATE DIAMOND SHAPE BUTTONS
========================================================= */

function renderShapes() {

  shapeGrid.innerHTML = "";

  diamondShapes.forEach((shape, index) => {

    const [name, cssClass] = shape;

    const button =
      document.createElement("button");

    button.className =
      "shape-option";

    if (index === 0) {
      button.classList.add("active");
    }

    button.dataset.shape = name;

    button.dataset.css =
      cssClass;

    button.innerHTML = `
      <span class="shape-visual shape-${cssClass}"></span>
      <span class="shape-name">${name}</span>
    `;

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".shape-option")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");

      state.stone = name;

      diamond.className =
        "diamond";

      diamond.classList.add(
        `shape-${cssClass}`
      );

      updateUI();

    });

    shapeGrid.appendChild(button);

  });

}


/* =========================================================
   RING SIZES
========================================================= */

const sizes = {

  US: [
    "6",
    "7",
    "8",
    "9",
    "10"
  ],

  IND: [
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21"
  ]

};


function renderSizes() {

  sizeGrid.innerHTML = "";

  sizes[state.sizeSystem]
    .forEach((size, index) => {

      const button =
        document.createElement("button");

      button.className =
        "size-option";

      if (
        String(state.size) ===
        String(size)
      ) {
        button.classList.add("active");
      }

      button.textContent = size;

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".size-option")
            .forEach(item =>
              item.classList.remove("active")
            );

          button.classList.add("active");

          state.size = size;

          updateUI();

        }
      );

      sizeGrid.appendChild(button);

    });

}


/* =========================================================
   METAL SELECTION
========================================================= */

document
  .querySelectorAll(".metal-option")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".metal-option")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        state.metal =
          button.dataset.metal;

        state.metalColor =
          button.dataset.color;

        updateMetal();

        updateUI();

      }
    );

  });


/* =========================================================
   RING / BAND
========================================================= */

document
  .querySelectorAll(".choice-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".choice-card")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        state.ring =
          button.dataset.ring;

        updateUI();

      }
    );

  });


/* =========================================================
   SETTING
========================================================= */

document
  .querySelectorAll(".setting-option")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".setting-option")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        state.setting =
          button.dataset.setting;

        updateSetting();

        updateUI();

      }
    );

  });


/* =========================================================
   SIZE SYSTEM
========================================================= */

document
  .querySelectorAll(".size-system")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".size-system")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        state.sizeSystem =
          button.dataset.system;

        state.size =
          sizes[state.sizeSystem][0];

        renderSizes();

        updateUI();

      }
    );

  });


/* =========================================================
   UPDATE METAL VISUAL
========================================================= */

function updateMetal() {

  ringBand.style.borderColor =
    state.metalColor;

  ringSetting.style.borderColor =
    state.metalColor;

}


/* =========================================================
   UPDATE SETTING VISUAL
========================================================= */

function updateSetting() {

  switch (state.setting) {

    case "Four Prong":

      ringSetting.style.width = "95px";
      ringSetting.style.height = "95px";

      ringSetting.style.borderWidth = "14px";

      break;


    case "Six Prong":

      ringSetting.style.width = "105px";
      ringSetting.style.height = "105px";

      ringSetting.style.borderWidth = "11px";

      break;


    case "Bezel":

      ringSetting.style.width = "91px";
      ringSetting.style.height = "91px";

      ringSetting.style.borderWidth = "8px";

      break;


    case "Halo":

      ringSetting.style.width = "110px";
      ringSetting.style.height = "110px";

      ringSetting.style.borderWidth = "8px";

      break;

  }

}


/* =========================================================
   UPDATE UI
========================================================= */

function updateUI() {

  metalSelected.textContent =
    state.metal;

  ringSelected.textContent =
    state.ring;

  stoneSelected.textContent =
    state.stone;

  settingSelected.textContent =
    state.setting;

  sizeSelected.textContent =
    `${state.sizeSystem} ${state.size}`;


  summaryMetal.textContent =
    state.metal;

  summaryRing.textContent =
    state.ring;

  summaryStone.textContent =
    state.stone;

  summarySetting.textContent =
    state.setting;

  summarySize.textContent =
    `${state.sizeSystem} ${state.size}`;


  previewMetal.textContent =
    state.metal;

  previewStone.textContent =
    state.stone;

  previewSetting.textContent =
    state.setting;

  previewSize.textContent =
    `${state.sizeSystem} ${state.size}`;


  updateMetal();

  updateSetting();

}


/* =========================================================
   DESIGN NUMBER
========================================================= */

function generateDesignNumber() {

  const number =
    Math.floor(
      1000 +
      Math.random() * 9000
    );

  designNumber.textContent =
    `ORV-${number}`;

}

generateDesignNumber();


/* =========================================================
   ROTATION
========================================================= */

let rotating = false;

document
  .getElementById("rotateBtn")
  .addEventListener(
    "click",
    () => {

      state.rotation += 45;

      ringPreview.style.transform =
        `
        perspective(900px)
        rotateX(62deg)
        rotateZ(${state.rotation - 18}deg)
        scale(${state.zoom})
        `;

    }
  );


/* =========================================================
   RESET
========================================================= */

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {

      state.rotation = 0;

      state.zoom = 1;

      ringPreview.style.transform =
        `
        perspective(900px)
        rotateX(62deg)
        rotateZ(-18deg)
        scale(1)
        `;

    }
  );


/* =========================================================
   ZOOM
========================================================= */

document
  .getElementById("zoomIn")
  .addEventListener(
    "click",
    () => {

      state.zoom =
        Math.min(
          1.25,
          state.zoom + .1
        );

      applyZoom();

    }
  );


document
  .getElementById("zoomOut")
  .addEventListener(
    "click",
    () => {

      state.zoom =
        Math.max(
          .65,
          state.zoom - .1
        );

      applyZoom();

    }
  );


function applyZoom() {

  ringPreview.style.transform =
    `
    perspective(900px)
    rotateX(62deg)
    rotateZ(${state.rotation - 18}deg)
    scale(${state.zoom})
    `;

}


/* =========================================================
   MOUSE DRAG ROTATION
========================================================= */

const stage =
  document.getElementById("ringStage");

let startX = null;

stage.addEventListener(
  "pointerdown",
  event => {

    startX = event.clientX;

    stage.setPointerCapture(
      event.pointerId
    );

  }
);


stage.addEventListener(
  "pointermove",
  event => {

    if (startX === null) return;

    const movement =
      event.clientX - startX;

    if (Math.abs(movement) < 2) {
      return;
    }

    state.rotation +=
      movement * .4;

    startX =
      event.clientX;

    applyZoom();

  }
);


stage.addEventListener(
  "pointerup",
  () => {

    startX = null;

  }
);


stage.addEventListener(
  "pointercancel",
  () => {

    startX = null;

  }
);


/* =========================================================
   WHATSAPP
========================================================= */

function requestDesign() {

  const design =
    designNumber.textContent;

  const message =

`Hello ORVÉN JEWELS,

I would like to request this custom jewellery design.

Design ID: ${design}

Metal: ${state.metal}
Ring / Band: ${state.ring}
Diamond Shape: ${state.stone}
Setting: ${state.setting}
Ring Size: ${state.sizeSystem} ${state.size}

Please share the quotation and next steps.

Thank you.
ORVÉN JEWELS`;

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


document
  .getElementById("requestDesign")
  .addEventListener(
    "click",
    requestDesign
  );


document
  .getElementById("mobileRequestDesign")
  .addEventListener(
    "click",
    requestDesign
  );


/* =========================================================
   SIZE GUIDE
========================================================= */

const sizeModal =
  document.getElementById("sizeModal");

const sizeGuideBtn =
  document.getElementById("sizeGuideBtn");

const modalClose =
  document.getElementById("modalClose");

const modalOverlay =
  document.getElementById("modalOverlay");


function openSizeGuide() {

  sizeModal.classList.add("show");

  sizeModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeSizeGuide() {

  sizeModal.classList.remove("show");

  sizeModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


sizeGuideBtn.addEventListener(
  "click",
  openSizeGuide
);

modalClose.addEventListener(
  "click",
  closeSizeGuide
);

modalOverlay.addEventListener(
  "click",
  closeSizeGuide
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeSizeGuide();

    }

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

renderShapes();

renderSizes();

updateMetal();

updateSetting();

updateUI();


/* =========================================================
   FUTURE 3D MODEL HOOK
========================================================= */

/*
   LATER:

   When you have a real .GLB/.GLTF ring model,
   replace the CSS preview with Three.js.

   Example future structure:

   assets/
     models/
       ring.glb
       round.glb
       oval.glb
       pear.glb

   The selected:

   metal
   ring
   stone
   setting
   size

   can then control the actual 3D model.

*/