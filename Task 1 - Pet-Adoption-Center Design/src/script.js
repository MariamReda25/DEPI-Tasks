"use strict";

// SMOOTH SCROLLING
const btnCTA = document.querySelector(".btn--cta");

btnCTA.addEventListener("click", function (e) {
  e.preventDefault();

  const href = e.target.getAttribute("href");
  const refrencedEl = document.querySelector(href);
  refrencedEl.scrollIntoView({
    behavior: "smooth",
  });
});
 
