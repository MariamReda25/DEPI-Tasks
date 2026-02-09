"use strict";

const container = document.querySelector(".btn__container");
container.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  btn.setAttribute("disabled", true);
  container.insertAdjacentHTML("beforeend", createInstance(btn.dataset.color));
});

const createInstance = function (color) {
  return `
  <div>
        <button class="w-20 h-20 bg-${color}-700 cursor-pointer" data-color="${color}"></button>
  </div>
  `;
};
