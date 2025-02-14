let scene, camera, renderer, particleSystem;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BufferGeometry();
    let vertices = [];
    let numParticles = 500;

    for (let i = 0; i < numParticles; i++) {
        let x = (Math.random() - 0.5) * 400;
        let y = (Math.random() - 0.5) * 400;
        let z = (Math.random() - 0.5) * 400;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    let material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.002;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();

/* MENU */
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

/* CONTADOR REGRESIVO */
function iniciarContador() {
    function obtenerProximoLunes() {
        let ahora = new Date();
        let diaSemana = ahora.getDay(); // 0 (Dom) - 6 (Sáb)
        let diferenciaDias = (diaSemana === 1) ? 7 : ((8 - diaSemana) % 7); // Cuántos días faltan para el próximo lunes

        let proximoLunes = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + diferenciaDias);
        proximoLunes.setHours(0, 0, 0, 0); // Lunes a las 12 AM

        return proximoLunes;
    }

    function actualizarContador() {
        let ahora = new Date();
        let tiempoRestante = obtenerProximoLunes() - ahora;

        if (tiempoRestante <= 0) {
            document.getElementById("tiempo-restante").innerText = "¡Tiempo agotado!";
            return;
        }

        let dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        let horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        document.getElementById("tiempo-restante").innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    actualizarContador(); // Ejecutar al cargar
    setInterval(actualizarContador, 1000); // Actualizar cada segundo
}

document.addEventListener("DOMContentLoaded", iniciarContador);




