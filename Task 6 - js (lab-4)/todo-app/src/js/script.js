"use strict";
const taskForm = document.querySelector(".form__task");
const taskInputEl = document.querySelector(".input__task");
const tasksTable = document.querySelector(".tabel__tasks");
const filter = document.querySelector(".btn__filters");
const clearBtn = document.querySelector(".btn__clear");
const filtersBtn = document.querySelectorAll(".btn__filter");
const numOfTasksEl = document.querySelector(".tasks__number");

const random = () => Math.floor(Math.random() * 1000);

class Task {
  constructor(taskName, status) {
    this.taskName = taskName;
    this.id = this._generateId();
    this.status = status;
  }

  _generateId() {
    const id = Date.now() + random();
    return id;
  }
}

class Todos {
  #todos = [];

  constructor() {
    taskForm.addEventListener("submit", this._addTask.bind(this));
    filter.addEventListener("click", this._filter.bind(this));
    clearBtn.addEventListener("click", this._clearCompleted.bind(this));

    tasksTable.addEventListener("click", this._deleteTask.bind(this));
    tasksTable.addEventListener("change", this._changeStatus.bind(this));
    this._getLocalStorage();
    this._generateMarkup(this.#todos);
  }

  _addTask(e) {
    e.preventDefault();

    const taskName = taskInputEl.value;
    const task = new Task(taskName, "active");
    this.#todos.push(task);

    this._generateMarkup(this.#todos);

    taskForm.reset();
  }

  _deleteTask(e) {
    e.stopPropagation();

    const clickedTask = e.target.closest(".btn__delete");
    if (!clickedTask) return;

    const taskId = +clickedTask.closest("tr").querySelector(".task__name")
      .dataset.id;
    const taskIndex = this.#todos.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;
    this.#todos.splice(taskIndex, 1);

    this._generateMarkup(this.#todos);
  }

  _filter(e) {
    const btn = e.target.closest(".btn__filter");
    if (!btn) return;

    filtersBtn.forEach((filter) => filter.classList.remove("active__btn"));

    btn.classList.add("active__btn");
    const filter = btn.dataset.filter;
    if (filter !== "all")
      this._generateMarkup(
        this.#todos.filter((task) => task.status === filter),
      );
    else this._generateMarkup(this.#todos);
  }

  _changeStatus(e) {
    const checkedTask = e.target;
    const task = checkedTask.closest("tr").querySelector(".task__name");
    const taskId = +task.dataset.id;

    this.#todos = this.#todos.map((task) =>
      task.id === taskId ? { ...task, status: "completed" } : task,
    );

    task.classList.add("active__task");
    checkedTask.setAttribute("disabled", true);
    this._updateActiveItems();
    this._setLocalStorage();
  }

  _clearCompleted() {
    this.#todos = this.#todos.filter((task) => task.status !== "completed");
    this._generateMarkup(this.#todos);
  }

  _generateMarkup(todos) {
    const markup = todos
      .map(
        (task) => `
       <tr class="odd:bg-white even:bg-gray-100">
            <td class="border-r-2 border-white">
              <input type="checkbox" class="task__status cursor-pointer" ${task.status === "completed" ? "disabled checked" : ""} />
            </td>
            <td class="border-r-2 border-white">
              <span class="task__name ${task.status === "completed" ? "active__task" : ""}" data-id=${task.id}>${task.taskName}</span>
            </td>
            <td>
              <button
                class="inline-flex justify-center items-center cursor-pointer btn__delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
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
    `,
      )
      .join("");
    tasksTable.innerHTML = "";
    tasksTable.insertAdjacentHTML("beforeend", markup);
    this._updateActiveItems();
    this._setLocalStorage();
  }

  _updateActiveItems() {
    numOfTasksEl.textContent = this.#todos.filter(
      (task) => task.status === "active",
    ).length;
  }

  _setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.#todos));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (!data) return;
    this.#todos = data.map((task) => new Task(task.taskName, task.status));
  }
}

const todo = new Todos();
