// ==================================
// MÚSICA
// ==================================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let isPlaying = false;

async function playMusic() {

    try {

        await music.play();

        isPlaying = true;
        musicIcon.textContent = "♫";
        musicText.textContent = "PAUSAR MÚSICA";

    } catch (error) {

        isPlaying = false;
        musicIcon.textContent = "▶";
        musicText.textContent = "REPRODUCIR MÚSICA";

    }

}

musicButton.addEventListener("click", async () => {

    if (isPlaying) {

        music.pause();

        isPlaying = false;
        musicIcon.textContent = "▶";
        musicText.textContent = "REPRODUCIR MÚSICA";

    } else {

        await playMusic();

    }

});

// Intentar reproducción automática.
playMusic();


// ==================================
// CUENTA REGRESIVA
// ==================================

const eventDate = new Date("2026-12-26T21:15:00-03:00").getTime();

function updateCountdown() {

    const now = Date.now();
    const distance = eventDate - now;

    if (distance <= 0) {

        document.getElementById("countdown").innerHTML =
            "<h2>¡Llegó el gran día!</h2>";

        return;

    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==================================
// ANIMACIONES DE APARICIÓN
// ==================================

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".section-reveal").forEach(element => {

    revealObserver.observe(element);

});


// ==================================
// CARRUSEL
// ==================================

const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const progress = document.getElementById("carouselProgress");

let currentSlide = 0;
let carouselTimer;

function moveCarousel(index) {

    currentSlide = (index + slides.length) % slides.length;

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    progress.style.transform =
        `translateX(${currentSlide * 100}%)`;

}

function startCarousel() {

    clearInterval(carouselTimer);

    carouselTimer = setInterval(() => {

        moveCarousel(currentSlide + 1);

    }, 5000);

}

document.getElementById("nextSlide").addEventListener("click", () => {

    moveCarousel(currentSlide + 1);
    startCarousel();

});

document.getElementById("prevSlide").addEventListener("click", () => {

    moveCarousel(currentSlide - 1);
    startCarousel();

});

startCarousel();


// ==================================
// MAPA
// ==================================

const mapModal = document.getElementById("mapModal");

document.getElementById("openMap").addEventListener("click", () => {

    mapModal.classList.add("active");

    document.body.classList.add("no-scroll");

});

function closeMap() {

    mapModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

document.getElementById("closeMap").addEventListener("click", closeMap);

mapModal.addEventListener("click", (event) => {

    if (event.target === mapModal) {

        closeMap();

    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMap();

    }

});