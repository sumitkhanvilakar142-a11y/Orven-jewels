// Global Variables for Scene Components
let scene, camera, renderer, ringMesh, gemMesh;
let metalMat, gemMat;

function init3DCustomizer() {
  const container = document.getElementById('canvas-container');

  // 1. Scene Setup
  scene = new THREE.Scene();

  // 2. Camera Setup
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 7);

  // 3. Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // 4. Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
  mainLight.position.set(5, 8, 5);
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0xffffff, 1.5);
  fillLight.position.set(-5, -2, -3);
  scene.add(fillLight);

  // 5. Create 3D Ring Mesh
  createRingGeometry();

  // 6. Responsive Window Resize Event
  window.addEventListener('resize', onWindowResize);

  // 7. Start Render Loop
  animate();
}

function createRingGeometry() {
  // Ring Band Material
  metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Default Yellow Gold
    metalness: 0.95,
    roughness: 0.1
  });

  const ringGeo = new THREE.TorusGeometry(1.8, 0.22, 32, 100);
  ringMesh = new THREE.Mesh(ringGeo, metalMat);
  ringMesh.rotation.x = Math.PI / 2.8;
  scene.add(ringMesh);

  // Gemstone Diamond Material
  gemMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.92, // Glass/Refraction transparency
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 2.417,          // Real Diamond Refractive Index
    reflectivity: 0.9
  });

  const gemGeo = new THREE.OctahedronGeometry(0.45, 2);
  gemMesh = new THREE.Mesh(gemGeo, gemMat);
  gemMesh.position.set(0, 1.9, 0.5);
  scene.add(gemMesh);
}

// Interactive Customizer Functions
function changeMetal(colorHex, metalness, roughness, element) {
  metalMat.color.set(colorHex);
  metalMat.metalness = metalness;
  metalMat.roughness = roughness;
  updateActiveState(element);
}

function changeDiamondColor(colorHex, element) {
  gemMat.color.set(colorHex);
  updateActiveState(element);
}

function updateActiveState(element) {
  const siblings = element.parentElement.querySelectorAll('.btn');
  siblings.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
}

// Animation Render Loop (Auto Rotation Effect)
function animate() {
  requestAnimationFrame(animate);
  if (ringMesh) ringMesh.rotation.z += 0.003;
  if (gemMesh) gemMesh.rotation.y += 0.008;
  renderer.render(scene, camera);
}

// Window Resize Handler
function onWindowResize() {
  const container = document.getElementById('canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize on Load
window.onload = init3DCustomizer;
