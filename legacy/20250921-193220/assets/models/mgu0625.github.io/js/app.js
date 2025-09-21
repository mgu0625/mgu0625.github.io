import { initPreloader } from './loader.js';
import { initOnboarding } from './onboarding.js';

window.addEventListener('DOMContentLoaded', () => {
  initPreloader();

  // When loading part 1 finishes, run onboarding (part 2)
  window.addEventListener('preloader:done', () => {
    const onboarding = document.getElementById('onboarding');
    const room       = document.getElementById('room');

    // Kick off Part 2 (10s)
    initOnboarding({ totalMs: 10000 });

    // When Part 2 ends, hide it and show the homepage
    window.addEventListener('onboarding:done', () => {
      if (onboarding) onboarding.remove();
      if (room) room.hidden = false;
    }, { once: true });
  });
});

['assets/images/moomin1_sticker.png','assets/images/moomin2_sticker.png'].forEach(src=>{
  const i = new Image(); i.src = src;
});

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("room");

// --------------------- renderer ---------------------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// --------------------- scene/camera -----------------
const scene = new THREE.Scene();
scene.background = null; // keep page bg visible

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  2000
);
camera.position.set(2.5, 1.5, 3.5);

// soft lights (safe for baked textures too)
const sun = new THREE.DirectionalLight(0xffffff, 2.0);
sun.position.set(5, 8, 5);
scene.add(sun, new THREE.AmbientLight(0xffffff, 0.6));


// --------------------- loading ----------------------
const manager = new THREE.LoadingManager();
manager.onError = (url) => console.error("Asset failed:", url);


const loader = new GLTFLoader(manager);

function loadStill() {
  loader.load(
    "./assets/models/homepage_still.glb",
    (gltf) => {
      const root = gltf.scene;
      root.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = false;
          o.receiveShadow = false;
          // Ensure baked textures render correctly
          if (o.material && o.material.map) {
            o.material.map.anisotropy = 8;
          }
        }
      });
      scene.add(root);
      frameCameraToObject(root, 1.15); // fit view

      animate();
    },
    (xhr) => {
      // progress (optional)
      // console.log(`still: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (err) => console.error(err)
  );
}

// Utility: position camera & controls to frame any object
function frameCameraToObject(object3D, fitPadding = 1.2) {
  const box = new THREE.Box3().setFromObject(object3D);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // move camera to fit vertically
  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.tan((camera.fov * Math.PI) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitPadding * Math.max(fitHeightDistance, fitWidthDistance);

  const dir = new THREE.Vector3()
    .subVectors(camera.position, center)
    .normalize()
    .multiplyScalar(distance);

  camera.position.copy(center).add(dir);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.lookAt(center);
}

// --------------------- render loop ------------------
let raf;
function animate() {
  raf = requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// --------------------- resize -----------------------
function onResize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);