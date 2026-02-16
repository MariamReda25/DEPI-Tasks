"use strict";
const btnFetch = document.querySelector(".btn__posts--fetch");
const containerEL = document.querySelector(".app__container");
const popupEl = document.querySelector(".popup");
const popupContentEl = document.querySelector(".popup__content");
const popupClosBtn = document.querySelector(".popup__close");
const state = {
  posts: [],
  comments: {
    postId: "",
    postComments: [],
  },
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

const renderPosts = function (posts) {
  const markup = `
  <h1 class="text-3xl font-semibold text-text-primary mb-5">Posts List</h1>
    <ul class="flex flex-col gap-3">
    ${posts
      .map(
        (post) => ` 
      <li class="bg-secondary flex flex-col p-4 gap-2 rounded-2xl" data-postid=${post.id}>
          <div class="flex justify-between items-start post">
            <h2
              class="text-lg font-semibold text-text-primary sm:text-xl lg:text-2xl"
            >
              ${post.title}
            </h2>
            <ion-icon
              name="chevron-down-outline"
              class=" btn__post btn__post--down h-8 w-8 cursor-pointer text-text-primary sm:h-5 sm:w-5"
            ></ion-icon>
            <ion-icon
              name="chevron-up-outline"
              class=" btn__post btn__post--up h-8 w-8 text-text-primary sm:h-5 sm:w-5 cursor-pointer hidden"
            ></ion-icon>
          </div>
          <div class="post__body flex flex-col items-end gap-2 hidden">
            <p
              class= "text-lg sm:text-xl lg:text-2xl text-text-secondary "
            >
              ${post.body}
            </p>
            <button
              class="text-lg text-btn font-semibold cursor-pointer sm:text-xl lg:text-2xl btn__comments"
            >
              Show comments
            </button>
          </div>
        </li>
      `,
      )
      .join("")}   
    </ul> 
  `;
  clear(containerEL);
  containerEL.insertAdjacentHTML("afterbegin", markup);
};

const renderComments = function (comments) {
  const markup = `
    ${comments
      .map(
        (comment) => `
      <li class="flex flex-col gap-1 bg-secondary p-3 rounded-2xl">
            <p
              class="text-lg text-text-primary font-semibold sm:text-xl lg:text-2xl"
            >
              ${comment.name}:
            </p>
            <p class="text-lg text-text-secondary sm:text-xl lg:text-2xl px-4">
             ${comment.body}
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
const getPosts = async function () {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    if (!response.ok) throw new Error(`Could not get posts ${response.status}`);
    const data = await response.json();
    if (!data) throw new Error(`No posts found`);

    state.posts = data;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getComments = async function (postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    if (!response.ok) throw new Error(`Could not get posts ${response.status}`);
    const data = await response.json();
    if (!data) throw new Error(`No comments found`);

    state.comments.postId = postId;
    state.comments.postComments = data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/** CONTROLLER FUNCTIONS */
const showComments = async function (postId) {
  try {
    renderLoader(popupContentEl);
    await getComments(postId);
    renderComments(state.comments.postComments);
  } catch (error) {
    renderError(error.message, popupContentEl);
  }
};

const addHandlerContainer = function (e) {
  if (e.target.classList.contains("btn__post")) {
    const parentLi = e.target.closest("li");
    Array.from(parentLi.querySelectorAll(".btn__post")).forEach((btn) =>
      btn.classList.toggle("hidden"),
    );
    parentLi.querySelector(".post__body").classList.toggle("hidden");
  }

  if (e.target.classList.contains("btn__comments")) {
    const postId = e.target.closest("li").dataset.postid;
    popupEl.classList.remove("hidden");

    if (postId === state.comments.postId) {
      renderComments(state.comments.postComments);
      return;
    }
    showComments(postId);
  }
};

const addHandlerFetchBtn = async function () {
  try {
    renderLoader(containerEL);
    await getPosts();
    renderPosts(state.posts);
  } catch (error) {
    renderError(error.message, containerEL);
  }
};

containerEL.addEventListener("click", addHandlerContainer);
btnFetch.addEventListener("click", addHandlerFetchBtn);
popupClosBtn.addEventListener("click", function () {
  popupEl.classList.add("hidden");
});
