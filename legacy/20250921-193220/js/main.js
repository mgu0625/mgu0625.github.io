import "./css/layout.css";
import * as THREE from 'three';



// scene
const canvas = document.querySelector('#experience-canvas'); 
const scene = new THREE.Scene();

function getSize() {
    const el = canvas.parentElement ?? canvas;
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    return { w, h };
}

let { w, h } = getSize();
 
// camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);



const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 80FF80 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}


// Event Listeners
window.addEventListener('resize', () => {
  ({ w, h } = getSize());
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
});

