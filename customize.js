/* ORVEN JEWELS — Ring Customizer
   Real-time 3D ring preview (Three.js) + design summary, pricing,
   and WhatsApp / request handoff. */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

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
    metal: { value: "Silver 925", color: "#C9CCD1", price: 0 },
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
    state.metal = { value: btn.dataset.value, color: btn.dataset.color, price: Number(btn.dataset.price) };
    updateMetalMaterial();
    render();
  });

  wireGroup("bandOptions", (btn) => {
    state.band = { value: btn.dataset.value, style: btn.dataset.style, price: Number(btn.dataset.price) };
    updateBandStyle();
    render();
  });

  wireGroup("stoneQuality", (btn) => {
    state.quality = btn.dataset.value;
    render();
  });

  wireGroup("shapeOptions", (btn) => {
    state.stone = { value: btn.dataset.value, price: Number(btn.dataset.price) };
    updateGemShape();
    render();
  });

  wireGroup("settingOptions", (btn) => {
    state.setting = { value: btn.dataset.value, price: Number(btn.dataset.price) };
    updateSettingStyle();
    render();
  });

  wireGroup("sizeSystem", (btn) => {
    state.sizeSystem = btn.dataset.value;
    populateSizes();
    render();
  });

  function populateSizes() {
    const list = SIZE_LISTS[state.sizeSystem];
    sizeSelect.innerHTML = list.map((s) => `<option value="${s}">${state.sizeSystem} - ${s}</option>`).join("");
    state.size = list[0];
  }
  sizeSelect.addEventListener("change", (e) => {
    state.size = e.target.value;
    render();
  });

  // ================= 3D SCENE =================
  const stage = $("#ringStage");
  const canvas = $("#ringCanvas");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 1.1, 4.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Studio environment for realistic metal reflections
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // Lights (supplement the environment for crisp highlights)
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
  fillLight.position.set(-4, 2, -2);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0xffffff, 0.8);
  rimLight.position.set(0, -2, -3);
  scene.add(rimLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 2.4;
  controls.maxDistance = 6.5;
  controls.enablePan = false;
  controls.target.set(0, 0.15, 0);
  controls.maxPolarAngle = Math.PI * 0.85;
  controls.minPolarAngle = Math.PI * 0.15;

  // ---------- Ring group ----------
  const ringGroup = new THREE.Group();
  ringGroup.rotation.x = -0.15; // slight tilt like a product photo
  scene.add(ringGroup);

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(state.metal.color),
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 1.3
  });

  // Band (torus), stood upright so the hole faces the viewer
  const bandGeometry = new THREE.TorusGeometry(1, 0.14, 48, 160);
  const bandMesh = new THREE.Mesh(bandGeometry, metalMaterial);
  bandMesh.rotation.x = Math.PI / 2;
  ringGroup.add(bandMesh);

  // Optional pave' sparkle ring / engraved groove, toggled by band style
  const paveGeometry = new THREE.TorusGeometry(1, 0.045, 16, 160);
  const paveMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 0.3, ior: 2.2, envMapIntensity: 1.4
  });
  const paveMesh = new THREE.Mesh(paveGeometry, paveMaterial);
  paveMesh.rotation.x = Math.PI / 2;
  paveMesh.position.y = 0.16;
  paveMesh.visible = false;
  ringGroup.add(paveMesh);

  const engraveGeometry = new THREE.TorusGeometry(1, 0.02, 8, 160);
  const engraveMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6, roughness: 0.5 });
  const engraveMesh = new THREE.Mesh(engraveGeometry, engraveMaterial);
  engraveMesh.rotation.x = Math.PI / 2;
  engraveMesh.position.y = -0.03;
  engraveMesh.visible = false;
  ringGroup.add(engraveMesh);

  function updateBandStyle() {
    paveMesh.visible = state.band.style === "pave";
    engraveMesh.visible = state.band.style === "engraved";
  }

  // Gem — swappable geometry for brilliant vs step cuts, scaled per shape
  const gemMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfefeff,
    metalness: 0,
    roughness: 0.02,
    transmission: 1,
    thickness: 0.6,
    ior: 2.42,
    envMapIntensity: 1.6,
    clearcoat: 1,
    clearcoatRoughness: 0.03
  });

  const brilliantGeometry = new THREE.OctahedronGeometry(0.42, 0);
  const stepGeometry = new THREE.BoxGeometry(0.55, 0.55, 0.4);

  const gemMesh = new THREE.Mesh(brilliantGeometry, gemMaterial);
  gemMesh.position.set(0, 1.02, 0.02);
  ringGroup.add(gemMesh);

  const SHAPE_CONFIG = {
    Round: { geo: brilliantGeometry, scale: [1, 1, 1] },
    Oval: { geo: brilliantGeometry, scale: [0.8, 1.3, 0.8] },
    Pear: { geo: brilliantGeometry, scale: [0.75, 1.35, 0.75] },
    Marquise: { geo: brilliantGeometry, scale: [0.55, 1.5, 0.55] },
    Heart: { geo: brilliantGeometry, scale: [0.95, 1.05, 0.85] },
    Princess: { geo: stepGeometry, scale: [1, 1, 1] },
    Cushion: { geo: stepGeometry, scale: [1, 1, 0.9] },
    Emerald: { geo: stepGeometry, scale: [0.85, 1.25, 0.85] }
  };

  function updateGemShape() {
    const cfg = SHAPE_CONFIG[state.stone.value] || SHAPE_CONFIG.Round;
    gemMesh.geometry = cfg.geo;
    gemMesh.scale.set(cfg.scale[0], cfg.scale[1], cfg.scale[2]);
  }

  // Prongs / halo / bezel — swap based on setting
  const prongGroup = new THREE.Group();
  const prongGeo = new THREE.ConeGeometry(0.045, 0.22, 8);
  const prongPositions = [
    [0.32, 0.9, 0.28], [-0.32, 0.9, 0.28], [0.32, 0.9, -0.24], [-0.32, 0.9, -0.24]
  ];
  prongPositions.forEach((p) => {
    const prong = new THREE.Mesh(prongGeo, metalMaterial);
    prong.position.set(p[0], p[1], p[2]);
    prongGroup.add(prong);
  });
  ringGroup.add(prongGroup);

  const haloGeometry = new THREE.TorusGeometry(0.55, 0.05, 16, 64);
  const haloMesh = new THREE.Mesh(haloGeometry, metalMaterial);
  haloMesh.position.set(0, 1.0, 0.02);
  haloMesh.visible = false;
  ringGroup.add(haloMesh);

  const bezelGeometry = new THREE.TorusGeometry(0.46, 0.06, 16, 64);
  const bezelMesh = new THREE.Mesh(bezelGeometry, metalMaterial);
  bezelMesh.position.set(0, 1.0, 0.02);
  bezelMesh.visible = false;
  ringGroup.add(bezelMesh);

  function updateSettingStyle() {
    const s = state.setting.value;
    prongGroup.visible = s.startsWith("Prong") || s.startsWith("Solitaire") || s.startsWith("Cathedral");
    haloMesh.visible = s.startsWith("Halo");
    bezelMesh.visible = s.startsWith("Bezel") || s.startsWith("Tension");
  }

  function updateMetalMaterial() {
    metalMaterial.color.set(state.metal.color);
  }

  // ---------- Resize ----------
  function resizeRenderer() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener("resize", resizeRenderer);
  if (window.ResizeObserver) {
    new ResizeObserver(resizeRenderer).observe(stage);
  }

  // ---------- Animation loop ----------
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  // ---------- Toolbar ----------
  $("#rotateBtn").addEventListener("click", () => {
    controls.autoRotate = !controls.autoRotate;
    controls.autoRotateSpeed = 6;
  });

  let zoomed = false;
  $("#zoomBtn").addEventListener("click", () => {
    zoomed = !zoomed;
    const targetDistance = zoomed ? 2.6 : 4.2;
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.copy(controls.target).addScaledVector(dir, targetDistance);
  });

  // ---------- Price / summary / whatsapp (unchanged logic) ----------
  function computePrice() {
    let total = BASE_PRICE + state.metal.price + state.band.price + state.stone.price + state.setting.price;
    if (state.quality === "Natural") total += 45000;
    return total;
  }

  function renderSummary() {
    $("#sumMetal").textContent = state.metal.value;
    $("#sumBand").textContent = state.band.value;
    $("#sumStone").textContent = `${state.stone.value} (${state.quality})`;
    $("#sumSetting").textContent = state.setting.value;
    $("#sumSize").textContent = `${state.sizeSystem} - ${state.size}`;

    const price = computePrice();
    $("#priceTotal").textContent = "\u20B9" + price.toLocaleString("en-IN");
    return price;
  }

  function renderWhatsappLink(price) {
    const msg =
      `Hi ORVEN JEWELS, I'd like to request this custom ring design:%0A` +
      `Metal: ${state.metal.value}%0A` +
      `Band: ${state.band.value}%0A` +
      `Stone: ${state.stone.value} (${state.quality})%0A` +
      `Setting: ${state.setting.value}%0A` +
      `Ring Size: ${state.sizeSystem} - ${state.size}%0A` +
      `Estimated Price: \u20B9${price.toLocaleString("en-IN")}`;
    $("#whatsappBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  function render() {
    const price = renderSummary();
    renderWhatsappLink(price);
  }

  $("#requestDesignBtn").addEventListener("click", () => {
    const price = computePrice();
    alert(
      `Design request captured!\n\n` +
      `Metal: ${state.metal.value}\nBand: ${state.band.value}\n` +
      `Stone: ${state.stone.value} (${state.quality})\nSetting: ${state.setting.value}\n` +
      `Size: ${state.sizeSystem} - ${state.size}\nEstimated Price: \u20B9${price.toLocaleString("en-IN")}\n\n` +
      `Connect this button to your backend/email service to actually send the request.`
    );
  });

  // ---------- INIT ----------
  populateSizes();
  updateMetalMaterial();
  updateBandStyle();
  updateGemShape();
  updateSettingStyle();
  render();
  resizeRenderer();
  animate();
})();