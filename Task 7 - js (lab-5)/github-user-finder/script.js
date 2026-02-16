"use strict";
const API_URL = `https://api.github.com/users/`;
const formEl = document.querySelector(".form__username");
const inputEl = document.querySelector(".input__username");
const containerEl = document.querySelector(".app__container");

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = inputEl.value;
  if (username === "") {
    renderError("Please enter username");
    return;
  }
  getUser(username);
  formEl.reset();
});

const formatNumber = function (number) {
  return new Intl.NumberFormat().format(number);
};

const renderError = function (errorMessage) {
  const markup = `
   <div class="flex justify-center items-center grow text-red-500 text-2xl font-semibold">
    <p class="">${errorMessage} 💥❗❗</p>
   </div>
  
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

const renderLoader = function () {
  const markup = `
  <div class="flex justify-center items-center grow ">
    <ion-icon name="reload-outline" class="w-14 h-14 animate-spin text-gray-700"></ion-icon>
  </div>
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

const renderUserData = function (data) {
  const {
    followers,
    following,
    avatar_url: avatar,
    blog,
    location,
    twitter_username: twitterUsername,
    public_repos: repos,
    company,
    public_gists: gists,
    login: username,
  } = data;
  const markup = `
  
  <figure class="flex flex-col gap-6 items-center">
        <img
          src=${avatar || "default-user.jpg"}
          alt="user"
          class="rounded-full cursor-pointer md:w-[50%]"
        />
        <figcaption class="">
          <span class="text-4xl font-semibold text-gray-600">${username}</span>
        </figcaption>
      </figure>
      <div class="flex flex-col gap-8 w-full">
        <ul class="flex flex-wrap gap-3 items-center justify-evenly">
          <li class="text-2xl text-center bg-white p-2 rounded-2xl grow">
            ${formatNumber(followers) || 0} Followers
          </li>
          <li class="text-2xl text-center bg-white p-2 rounded-2xl grow">
            <span></span>
            <span>${formatNumber(following) || 0} Following</span>
          </li>
          <li class="text-2xl text-center bg-white p-2 rounded-2xl grow">
            ${formatNumber(repos) || 0} Repos
          </li>
          <li class="text-2xl text-center bg-white p-2 rounded-2xl grow">
            ${formatNumber(gists) || 0} Gists
          </li>
        </ul>
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap gap-2 items-center">
            <ion-icon
              name="business-outline"
              class="w-8 h-8 text-gray-700"
            ></ion-icon>
            <span class="text-2xl text-gray-700">Company:</span>
            <span class="text-2xl">${company || "Not found"}</span>
          </div>
          <div class="flex gap-2 flex-wrap items-center">
            <ion-icon
              name="location-outline"
              class="w-8 h-8 text-gray-800"
            ></ion-icon>
            <span class="text-2xl text-gray-800">Location:</span>
            <span class="text-2xl">${location || "Not found"}</span>
          </div>
          <div class="flex gap-2 flex-wrap items-center">
            <ion-icon
              name="logo-twitter"
              class="w-8 h-8 text-gray-700"
            ></ion-icon>
            <span class="text-2xl text-gray-800">Twitter:</span>
            <span class="text-2xl">${twitterUsername || "Not found"}</span>
          </div>
          <div class="flex gap-2 flex-wrap items-center text-gray-800">
            <ion-icon name="people-circle-outline" class="w-8 h-8"></ion-icon>
            <span class="text-2xl text-gray-800">Blog:</span>
            <a
              href=${blog}
              class="text-2xl text-gray-900"
              target="_blank"
              >${username}_blog</a
            >
          </div>
        </div>
      </div>
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

const getUser = function (username) {
  renderLoader();
  fetch(`${API_URL}${username}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Couldn't get user data ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (!data) throw new Error(`data not found`);
      renderUserData(data);
    })
    .catch((error) => renderError(error.message));
};
