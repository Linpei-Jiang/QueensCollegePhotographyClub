window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--scroll-y", window.scrollY + "px");
});

window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight - 90) {
        document.body.classList.add("transparent");
    } else {
        document.body.classList.remove("transparent");
    }
});