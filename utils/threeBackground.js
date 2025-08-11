import * as THREE from 'three';

export const initThreeBackground = (canvasId) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId) });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const numParticles = 500;

  for (let i = 0; i < numParticles; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;
    vertices.push(x, y, z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  const animate = () => {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.002;
    renderer.render(scene, camera);
  };

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  animate();
};