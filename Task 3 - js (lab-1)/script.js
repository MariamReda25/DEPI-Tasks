"use strict";
/************ LAB -1  ************************/
/**
 * 1- Create a function that accepts a variable and returns its type
 * @param {*} variable
 * @returns {typeof}
 */
const checkType = function (variable) {
  return typeof variable;
};

/**
 * 2- Create functions for addition, subtraction, multiplication, and division
 * @param {number} num1
 * @param {number} num2
 * @param {string} operation
 * @returns result of required operation between two numbers
 */
const calc = function (num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};

/**
 * 3- Create a function that checks if a value is NaN.
 * @param {*} value
 * @returns {boolean} true if value is( NaN ) and false for any type
 */
const checkIsNaN = function (value) {
  return Number.isNaN(value);
};

/**
 * 4- Create a function that returns true if a number is even and false if odd
 * @param {number} number
 * @returns {boolean} : true for even numbers - false for odd numbers
 */
const checkIsEven = function (number) {
  return number % 2 === 0;
};

/**
 * 5- Create a function to concatenate two strings with a space in between
 * @param {string} str1
 * @param {string} str2
 * @returns {string} concatenated two strings with space
 */
const concatTwoStrings = function (str1, str2) {
  return str1.concat(` ${str2}`);
};

/**
 * 6- Create a function that takes a string and returns its uppercase version
 * @param {string} str
 * @returns {string} uppercase of string
 */
const strToUppercase = function (str) {
  return str.toUpperCase();
};

/**
 * 7- Create a function that takes a string and an index then returns
 * the character at a given index in the string
 * @param {string} str
 * @param {number} index
 * @returns  {string}  character for valid indecies or invalid index for out of boud index
 */
const getCharacter = function (str, index) {
  if (index >= str.length) return "invalid index";
  return str.at(index);
};

/**
 * 8- Create a functions greet() that takes a name of a person and then
 * returns “Hello , name”
 * @param {string} name
 * @returns {string}
 */
const greet = function (name) {
  return `Hello ${name}`;
};

/**
 * 9- Create a function that checks if a value is null or undefined
 * @param {*} value
 * @returns {boolean} True: value is null or undefined
 */
const checkValue = function (value) {
  return value === undefined || value === null;
};

/**
 * 10- Create a function that generates a random number between two values.
 * @param {number} min
 * @param {number} max
 * @returns  {number} random number between min - max
 */
const generateRandoms = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

/**
 * 11- Create a function that takes a number , checks its value and
 * return “Positive” or “Negative” or “Zero”
 * @param {number} number
 * @returns {string} "Positive" | "Negative" | "Zero"
 */
const checkNumber = function (number) {
  if (number > 0) return "Positive";
  if (number < 0) return "Negative";
  if (number === 0) return "Zero";
};

/**
 * 12- Create a function that safely evaluates a mathematical expression
 * and handles errors gracefully.
 * @param {*} expression
 * @returns  Error || evaluation of expression
 */
const evaluateExpression = function (expression) {
  try {
    return eval(expression);
  } catch (error) {
    throw new Error(error);
  }
};
