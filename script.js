const topBtn = document.getElementById("topBtn");
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector(".header");
const progressBar = document.getElementById("progress-bar");
const loader = document.getElementById("loader");
const slides = document.querySelectorAll(".slide");
const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");
const galleryButtons = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightboxBtn = document.querySelector(".close-lightbox");
const contactForm = document.querySelector(".contact-form");

let currentSlide = 0;

function updateScrollUI(){
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;
    topBtn.style.display = window.scrollY > 360 ? "grid" : "none";
    header.classList.toggle("scrolled", window.scrollY > 40);
}

function revealOnScroll(){
    reveals.forEach((item) => {
        const revealPoint = 120;
        const elementTop = item.getBoundingClientRect().top;

        if(elementTop < window.innerHeight - revealPoint){
            item.classList.add("active");
        }
    });
}

function updateActiveLink(){
    let current = "home";

    sections.forEach((section) => {
        if(window.scrollY >= section.offsetTop - 140){
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

function handleScroll(){
    updateScrollUI();
    revealOnScroll();
    updateActiveLink();
}

function closeMenu(){
    navMenu.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.querySelector("i").className = "fa-solid fa-bars";
}

function toggleMenu(){
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

function changeSlide(){
    if(slides.length === 0){
        return;
    }

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

function openLightbox(src, alt){
    lightbox.classList.add("active");
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Gallery preview";
    document.body.style.overflow = "hidden";
}

function closeLightbox(){
    lightbox.classList.remove("active");
    lightboxImg.src = "";
    document.body.style.overflow = "";
}

window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 500);
});

window.addEventListener("scroll", handleScroll, { passive:true });

topBtn.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
});

menuBtn.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const image = button.querySelector("img");
        openLightbox(image.src, image.alt);
    });
});

closeLightboxBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
    if(event.target === lightbox){
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if(event.key === "Escape"){
        closeLightbox();
        closeMenu();
    }
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    alert("Thank you. Your message has been received.");
});

setInterval(changeSlide, 4200);
handleScroll();