// THREE.js Background Animation
let scene, camera, renderer, particleSystem;

function initThreeBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    const canvas = document.getElementById('bg');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // alpha: true para fondo transparente
    renderer.setSize(window.innerWidth, window.innerHeight);

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

    let material = new THREE.PointsMaterial({ color: 0xe0b0ff, size: 2, transparent: true, opacity: 0.7 }); // Color morado claro
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    animateThreeBackground();
}

function animateThreeBackground() {
    requestAnimationFrame(animateThreeBackground);
    particleSystem.rotation.y += 0.001; // Más lento
    particleSystem.rotation.x += 0.0005; // Un poco de rotación en X
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Tab Switching Logic
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    // 'event' is a global variable in old JS, but better to pass it or get from window.event
    // For simplicity in this context, assuming it's available or using currentTarget
    const clickedButton = event.currentTarget;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Countdown Timer for Free File
function iniciarContador() {
    function obtenerProximoLunes() {
        let ahora = new Date();
        let diaSemana = ahora.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        let diasHastaLunes = (diaSemana === 1) ? 7 : ((8 - diaSemana) % 7); // Si es lunes, el próximo es en 7 días
        
        let proximoLunes = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + diasHastaLunes);
        proximoLunes.setHours(0, 0, 0, 0); // Establecer a medianoche del lunes
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

    actualizarContador();
    setInterval(actualizarContador, 1000);
}

// Data for Files archivos para subir ________________________________________________________________________
const archivos = [
    {
        img: "imagenes/duolingo pro.png",
        title: "Duolingo Pro",
        description: "Duolingo Pro te lleva al siguiente nivel en el aprendizaje de idiomas: sin anuncios, lecciones personalizadas, repeticiones inteligentes y progreso acelerado. Pago único.",
        price: "$5.000",
        whatsappLink: "https://wa.me/+573238632028?text=Hola,%20quiero%20comprar%20Duolingo%20Pro"
    },
    {
        img: "imagenes/videojuegos.webp",
        title: "RetroGamer Pro Android",
        description: "Juega 🎮 TODOS los juegos retro SNES, Sega, PlayStation 1 y 2, PSP, Xbox 360 y más. Solo en Android.",
        price: "$8.000",
        whatsappLink: "https://wa.me/+573238632028?text=Hola,%20quiero%20comprar%20RetroGamer%20Pro"
    },
    {
        img: "imagenes/libros.jpg",
        title: "libros  educacion financiera pdf ",
        description: "mas de cien Libros en PDF con estrategias claras para ahorrar, invertir y generar ingresos. Contenido fácil de entender y aplicar. 📥 Descarga inmediata.",
        price: "$10.000",
        whatsappLink: "https://wa.me/+573238632028?text=Hola,%20quiero%20comprar%20Editor%20Pro"
    },
     {
        img: "imagenes/dibujos para colorear.png",
        title: "Dibujos para colorear en PDF",
        description: "Dibujos para colorear en PDF, listos para descargar e imprimir. Diseños creativos para todas las edades, perfectos para relajarse, divertirse y dejar volar la imaginación.",
        price: "$7.000",
        whatsappLink: "https://wa.me/+573238632028?text=Hola,%20quiero%20comprar%20Editor%20Pro"
    }
];

function mostrarArchivos() {
    const contenedor = document.getElementById("fileStore");
    if (!contenedor) return; // Asegurarse de que el contenedor existe

    contenedor.innerHTML = ""; // Limpiar antes de añadir

    archivos.forEach(archivo => {
        const card = document.createElement("article");
        card.classList.add("file-card");

        card.innerHTML = `
            <img src="${archivo.img}" alt="${archivo.title}" class="file-img">
            <div class="file-info">
                <h3>${archivo.title}</h3>
                <p>${archivo.description}</p>
                <span class="file-price">${archivo.price}</span>
                <a href="${archivo.whatsappLink}" class="whatsapp-btn" target="_blank">📩 Comprar</a>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Initialize everything when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initThreeBackground();
    iniciarContador();
    mostrarArchivos();
});