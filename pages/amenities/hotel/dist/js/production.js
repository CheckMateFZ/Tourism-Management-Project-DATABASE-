// production.js

document.addEventListener("DOMContentLoaded", function () {
    // Reference to the window object
    window;

    // Reference to the HTML's <html> element
    const e = document.documentElement;

    // Remove "no-js" class and add "js" class to <html> element
    if (e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations")) {
        // If body has "has-animations" class, initialize ScrollReveal
        (window.sr = ScrollReveal()).reveal(".reveal-on-scroll", {
            duration: 600,
            distance: "20px",
            easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
            origin: "left",
            interval: 100
        });
    }
});
