"use strict";

const formStudent = document.querySelector(".form__student");
const inputNameEl = document.querySelector(".input__name");
const inputGradeEl = document.querySelector(".input__grade");
const selectedSortEl = document.querySelector(".select__sort");
const selectedFilterEl = document.querySelector(".select__filter");
const errorMessage = document.querySelector(".error");
const tabel = document.querySelector(".tabel__body");
const students = [];

const capitalizeName = function (name) {
  return name.at(0).toUpperCase().concat(name.slice(1).toLowerCase());
};

formStudent.addEventListener("submit", function (e) {
  e.preventDefault();
  errorMessage.textContent = "";

  try {
    const department = document.querySelector(
      `input[name="department"]:checked`,
    )?.dataset?.option;
    if (!department) throw new Error(`Please select one of three departments`);
    const name = capitalizeName(inputNameEl.value);
    const grade = +inputGradeEl.value;

    if (students.some((student) => student.name === name)) {
      throw new Error("Name duplicated");
    } else {
      const student = { name, grade, department };
      const markup = generateMarkup(student);
      students.push(student);
      tabel.insertAdjacentHTML("beforeend", markup);
    }

    formStudent.reset();
  } catch (err) {
    errorMessage.textContent = err.message;
  }
});

selectedSortEl.addEventListener("change", function () {
  const sort = selectedSortEl.value;
  if (sort === "grades") {
    generateTable(students.sort((a, b) => a.grade - b.grade));
  }
  if (sort === "name") {
    generateTable(students.sort((a, b) => a.name.localeCompare(b.name)));
  }
});

selectedFilterEl.addEventListener("change", function () {
  const filter = selectedFilterEl.value;
  filter === "success" &&
    generateTable(students.filter((student) => student.grade >= 60));
  filter === "fail" &&
    generateTable(students.filter((student) => student.grade < 60));
  filter === "all" && generateTable(students);
});

tabel.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn__delete");
  if (!btn) return;

  const studentName = btn
    .closest("tr")
    .querySelector(".student__name").textContent;

  const studentIndex = students.findIndex(
    (student) => student.name === studentName,
  );
  students.splice(studentIndex, 1);
  generateTable(students);
});

const generateTable = function (students) {
  const markup = students.map((student) => generateMarkup(student)).join("");
  tabel.innerHTML = "";
  tabel.insertAdjacentHTML("beforeend", markup);
};

const generateMarkup = function (student) {
  return `
   <tr class="grid grid-cols-3 gap-1 border-collapse ">
            <td class=" bg-red-300 student__name">${student.name}</td>
            <td class=" bg-red-300">${student.grade}</td>
            <td class=" bg-red-300">
              <button class="cursor-pointer btn__delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentcolor"
                  class="size-6 fill-red-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>
  `;
};

const unionOfArray = function (arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set1.union(set2)];
};
console.log(unionOfArray([1, 2, 3, 2, 1], [3, 2, 2, 3, 3, 2]));
