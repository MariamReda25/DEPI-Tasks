"use strict";
const API_KEY = `adc92b69f2884051b00182336261002`;
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

const containerEl = document.querySelector(".app__container");

/** Helper Function */
const getDay = function (date) {
  return new Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
  }).format(new Date(date));
};

/** Rendering Functions */
const renderError = function (errorMessage) {
  const markup = `
   <div class="flex justify-center items-center text-red-500 text-2xl font-semibold">
    <p class="">${errorMessage} 💥❗❗</p>
   </div>
  
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

const renderLoader = function () {
  const markup = `
  <div class="flex justify-center items-center animate-spin">
    <ion-icon name="reload-outline" class="w-14 h-14 text-gray-700"></ion-icon>
  </div>
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

const renderForecast = function (temperature, dailyForecast, condition) {
  const markup = `
  <div
        class="temperature__box flex flex-col items-center py-9 text-gray-600 gap-3 lg:gap-5"
      >
        <p
          class="temperatuer__value text-6xl font-semibold sm:text-7xl md:text-8xl xl:text-9xl"
        >${temperature}&deg;C</p>
        <p
          class="temperatuer__status text-2xl font-semibold md:text-4xl text-gray-500"
        >${condition}</p>
      </div>
      <div
        class="w-full grid grid-cols-[repeat(auto-fit,10rem)] gap-5 text-gray-600 px-5 md:px-9 place-content-center dailyforecast__box"
      >
      ${dailyForecast
        .map(
          (day) => `
      <div
          class="flex flex-col items-center py-3 gap-1 rounded-2xl border border-gray-300 md:gap-2 md:py-5"
        >
          <p class="text-lg md:text-2xl xl:text-2xl">${getDay(day.date) === getDay(new Date()) ? "Today" : getDay(day.date)}</p>
          <div class="flex gap-3">
            <p class="text-xl font-bold md:text-xl xl:text-2xl">${day.maxTemp}&deg;</p>
            <p class="text-xl font-bold md:text-xl xl:text-2xl">${day.minTemp}&deg;</p>
          </div>
          <p class="text-lg md:text-2xl xl:text-2xl text-gray-400">${day.condition}</p>
        </div>
    `,
        )
        .join("")}
      </div> 
  `;
  containerEl.innerHTML = "";
  containerEl.insertAdjacentHTML("afterbegin", markup);
};

/** Main Functions */
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
    );
  });
};

const getWeather = function () {
  renderLoader();
  getPosition()
    .then((res) => {
      const { latitude, longitude } = res.coords;
      return fetch(`${API_URL}&q=${latitude},${longitude}&days=7`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Could not fetch weather ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const {
        current: {
          temp_c: temperature,
          condition: { text: condition },
        },
        forecast: { forecastday },
      } = data;

      const dailyForecast = forecastday.map((day) => {
        return {
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          date: day.date,
          condition: day.day.condition.text,
        };
      });
      renderForecast(temperature, dailyForecast, condition);
    })
    .catch((error) => renderError(error.message));
};

getWeather();
