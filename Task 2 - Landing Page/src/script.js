"use strict";

// HANDLING NAVIGATION
const btnMenu = document.querySelector(".header__nav--btn-menu");
const btnClose = document.querySelector(".header__nav--btn-close");
const headerEl = document.querySelector(".header");

headerEl.addEventListener("click", function (e) {
  const btn = e.target.closest(".header__nav--btn");
  if (!btn) return;

  headerEl.classList.toggle("open");
});

// SMOOTH SCROLLING
const btnCTA = Array.from(document.querySelectorAll(".cta__btn"));

btnCTA.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Prevent immdeiately
    e.preventDefault();

    const href = e.target.getAttribute("href");
    const refrencedEl = document.querySelector(href);

    refrencedEl.scrollIntoView({
      behavior: "smooth",
    });

    // Close Navbar for small responsive design
    headerEl.classList.contains("open") && headerEl.classList.remove("open");
  });
});

// STICKY NAVIGATION
const sectionHero = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      headerEl.classList.add("sticky");
    } else headerEl.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHero);
