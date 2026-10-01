const slides = document.querySelector('.aboutUsImages');
const images = document.querySelectorAll('.aboutUsImages img');

let current = 0;

function nextSlide() {
    current++;

    if (current >= images.length) {
        current = 0;
    }

    slides.style.transition = "transform 0.8s ease";
    slides.style.transform = `translateX(-${current * 100}%)`;
}

// Auto change every 3 seconds
setInterval(nextSlide, 3000);