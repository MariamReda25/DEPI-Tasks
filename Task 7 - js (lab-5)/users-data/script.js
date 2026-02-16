"use strict";
const form = document.querySelector(".form");
const inputId = document.querySelector(".input__id");
const containerEL = document.querySelector(".app__container");
const popupEl = document.querySelector(".popup");
const popupContentEl = document.querySelector(".popup__content");
const popupClosBtn = document.querySelector(".popup__close");
const state = {
  user: {},
  posts: [],
};
/** VIEW FUNCTIONS */
const clear = function (el) {
  el.innerHTML = "";
};

const renderLoader = function (container) {
  const markup = `
  <div class="flex justify-center items-center grow ">
    <ion-icon name="reload-outline" class="w-14 h-14 animate-spin text-gray-700"></ion-icon>
  </div>
  `;
  clear(container);
  container.insertAdjacentHTML("afterbegin", markup);
};

const renderError = function (errorMessage, container) {
  const markup = `
   <div class="flex justify-center items-center grow text-red-500 text-2xl font-semibold">
    <p class="">${errorMessage} 💥❗❗</p>
   </div>
  `;
  clear(container);
  container.insertAdjacentHTML("afterbegin", markup);
};

const renderUser = function (user) {
  const {
    address: { street, suit, city },
  } = user;
  const markup = `
  <h1 class="text-3xl font-semibold text-text-primary mb-5">Users List</h1>
       <article
          class="bg-secondary flex flex-col p-4 gap-2 rounded-2xl"
          data-userid="${user.id}"
        >
          <div class="flex justify-between items-start mb-3">
            <figure>
              <img src="default-user.jpg" alt="user" class="rounded-full" />
              <figcaption>
                <h2
                  class="text-lg font-semibold text-text-primary sm:text-xl lg:text-2xl"
                >
                  ${user.name}
                </h2>
              </figcaption>
            </figure>

            <ion-icon
              name="chevron-down-outline"
              class="btn__user btn__user--down h-8 w-8 cursor-pointer text-text-primary sm:h-5 sm:w-5"
            ></ion-icon>
            <ion-icon
              name="chevron-up-outline"
              class="btn__user btn__user--up h-8 w-8 text-text-primary sm:h-5 sm:w-5 cursor-pointer hidden"
            ></ion-icon>
          </div>
          <ul
            class="user__body grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] justify-start gap-2 items-start hidden"
          >
            <li class="flex items-center gap-2">
              <ion-icon
                name="mail-unread-outline"
                class="h-8 w-8 text-text-primary sm:h-5 sm:w-5"
              ></ion-icon>
              <span>${user.email || "user has no mail"}</span>
            </li>
            <li class="flex items-center gap-2">
              <ion-icon
                name="call-outline"
                class="h-8 w-8 text-text-primary sm:h-5 sm:w-5"
              ></ion-icon>
              <span>+${user.phone || "unavailable"}</span>
            </li>
            <li class="flex items-center gap-2">
              <ion-icon
                name="location-outline"
                class="h-8 w-8 text-text-primary sm:h-5 sm:w-5"
              ></ion-icon>
              <span>${suit || ""}@${street || ""},${city || ""}</span>
            </li>
            <li class="flex items-center gap-2">
              <ion-icon
                name="earth-outline"
                class="h-8 w-8 text-text-primary sm:h-5 sm:w-5"
              ></ion-icon>
              <span>${user.website || "No website avaliable"}</span>
            </li>
            <li class="flex items-center gap-2">
              <ion-icon
                name="business-outline"
                class="h-8 w-8 text-text-primary sm:h-5 sm:w-5"
              ></ion-icon>
              <span>${user.company.name || "No Company avaliable"}</span>
            </li>
            <button
              class="col-span-full justify-self-end text-lg text-btn font-semibold cursor-pointer sm:text-xl lg:text-2xl btn__posts"
            >
              Show posts
            </button>
          </ul>
        </article>
    
  `;
  clear(containerEL);
  containerEL.insertAdjacentHTML("afterbegin", markup);
};

const renderPosts = function (posts) {
  const markup = `
    ${posts
      .map(
        (post) => `
      <li class="flex flex-col gap-1 bg-secondary p-3 rounded-2xl">
            <p
              class="text-lg text-text-primary font-semibold sm:text-xl lg:text-2xl"
            >
              ${post.title}:
            </p>
            <p class="text-lg text-text-secondary sm:text-xl lg:text-2xl px-4">
             ${post.body}
            </p>
          </li>
      `,
      )
      .join("")}
  `;
  clear(popupContentEl);
  popupContentEl.insertAdjacentHTML("afterbegin", markup);
};

/** MODEL FUNCTIONS */
const getData = async function (userId) {
  try {
    const [response, response2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);
    if (!response.ok) throw new Error(`Could not get data ${response.status}`);
    const usersData = await response.json();
    const postsData = await response2.json();
    state.user = usersData;
    state.posts = postsData;
  } catch (error) {
    throw new Error(error.message);
  }
};

/** CONTROLLER FUNCTIONS */
const showPosts = function (userId) {
  const userPosts = state.posts.filter((post) => post.userId === userId);
  state.posts;
  renderPosts(userPosts);
};

const addHandlerContainer = function (e) {
  if (e.target.classList.contains("btn__user")) {
    const parentLi = e.target.closest("article");
    Array.from(parentLi.querySelectorAll(".btn__user")).forEach((btn) =>
      btn.classList.toggle("hidden"),
    );
    parentLi.querySelector(".user__body").classList.toggle("hidden");
  }

  if (e.target.classList.contains("btn__posts")) {
    const userId = +e.target.closest("article").dataset.userid;
    popupEl.classList.remove("hidden");
    showPosts(userId);
  }
};

const addHandlerFetchBtn = async function (userId) {
  try {
    renderLoader(containerEL);
    await getData(userId);
    renderUser(state.user);
  } catch (error) {
    renderError(error.message, containerEL);
  }
};

containerEL.addEventListener("click", addHandlerContainer);
form.addEventListener("submit", function () {
  const userId = +inputId.value;
  addHandlerFetchBtn(userId);
});
popupClosBtn.addEventListener("click", function () {
  popupEl.classList.add("hidden");
});
