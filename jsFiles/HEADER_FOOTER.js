// import the function "loadComponent" from the include.js file
import { loadComponent } from "./include.js";

// leadComponent function
loadComponent("#header", "HEADER_FOOTER/HEADER.html", () => {
    // get the mobile menu and save it as a variable
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    // give the mobile menus a action (click to open/close)
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
});

// load the footer to the page
loadComponent("#footer", "HEADER_FOOTER/FOOTER.html");

