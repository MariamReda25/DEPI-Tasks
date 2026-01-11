"use strict";

/**
 * 1- Create a function called ‘capitalizeWords’ that takes a string
 * and returns the string with the first letter of each word capitalized.
 * @param {string} str
 * @returns {string} capitalized string
 */
const capitalizeWords = function (str) {
  const capitalizeStr = str
    .split(" ")
    .map((word) => (word = word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join(" ");
  return capitalizeStr;
};

/**
 * 2- Create a function called ‘mergeSortedArrays’ that takes two
 * sorted arrays and returns a single sorted array by merging them.
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns  {Array} sorted array by merging arr1 - arr2
 */
const mergeSortedArray = function (arr1, arr2) {
  return [...arr1, ...arr2].toSorted((a, b) => a - b);
};

/**
 * 3- Write a function called ‘sumOfSquares’ that takes an array of
 * numbers and returns the sum of their squares.
 * @param {Array} arr
 * @returns {number} Sum of squers of array elements
 */
const sumOfSquers = function (arr) {
  return arr.map((el) => el * el).reduce((acc, cur) => acc + cur);
};

/**
 * 4- Create a function called ‘filterArray’ that takes an array and a
 * callback function. The filterArray function should return a new array
 * that contains only the elements for which the callback function
 * returns true.
 * Hint : do not use built in methods
 * @param {Array} arr
 * @param {Function} callback : callback function that will be applied on elements of array
 * @returns {Array}  Filtered Array of elements which return true from callback
 */
const filterArray = function (arr, callback) {
  let filteredArray = [];
  arr.forEach((el) => {
    callback(el) && filteredArray.push(el);
  });
  return filteredArray;
};

/**
 * 5- Create a function called ‘mapArray’ that takes an array and a
 * callback function. The mapArray function should return a new array
 * where each element is the result of the callback function applied to
 * the corresponding element of the input array.
 * Hint : do not use built in methods
 * @param {Array} arr
 * @param {Function} callback : callback function that will be applied on elements of array
 * @returns {Array}  mapped Array which conatines elements of original array afte apply callback on it
 */
const mapArray = function (arr, callback) {
  let mappedArray = [];
  arr.forEach((el) => mappedArray.push(callback(el)));
  return mappedArray;
};

/**
 * 6- Create a function called ‘reduceArray’ that takes an array, a 
 * callback function, and an initial value. The reduceArray function 
 * should return a single value that is the result of applying the
 * callback function to each element of the array, using the initial 
 * value as the starting point.
 * Hint : do not use built in methods

 * @param {Array} arr
 * @param {Function} callback : callback function that will be applied on elements of array
 * @returns {number} Reduced value
 */
const reduceArray = function (arr, callback) {
  let reducedValue = null;
  arr.forEach((el) => (reducedValue = callback(reducedValue, el, arr[0])));
  return reducedValue;
};

/**
 * 7- Create a function called forEachArray that takes an array and a
 * callback function. The forEachArray function should apply the
 * callback function to each element of the array.
 * Hint : do not use built in methods
 * @param {Array} arr
 * @param {Function} callback
 */
const forEachArray = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = callback(arr[i]);
  }
};

/**
 * 8- Write a function called findMax that takes an array of numbers and
 * returns the maximum number in the array.
 * Hint : use Math.max()
 * @param {Array} arr
 * @returns {number} Maximum number in array
 */
const findMax = function (arr) {
  return Math.max(...arr);
};

/**
 * 9- Write a function called mergeObjects that takes two objects and
 * returns a new object that combines the properties of both. If a
 * property exists in both objects, the value from the second object
 * should be used.
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object} new object merged of object1 - object2
 */
const mergeObjects = function (obj1, obj2) {
  return { ...obj1, ...obj2 };
};

/**
 *  10- Write a function called invertObject that takes an object and
 * returns a new object where the keys and values are swapped.
 * @param {Object} obj
 * @returns {Object} : inverted Object
 */
const invertObject = function (obj) {
  const invertedObject = {};
  for (const entry of Object.entries(obj)) {
    invertedObject[entry[1]] = entry[0];
  }
  return invertedObject;
};

/**
 * 11- Write a function called omitKeys that takes an object and an
 * array of keys, and returns a new object that omits the specified keys.
 * @param {Object} obj : Original Object
 * @param {Array} keys : Array of omitted keys
 * @returns {Object}   : new object that not include omitted keys
 */
const omitKeys = function (obj, keys) {
  const newObject = {};

  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) newObject[key] = obj[key];
  }
  return newObject;
};
/**
 * 12- Write a function called pickKeys that takes an object and an array of keys, and returns a new object that includes only the
 * specified keys.
 * @param {Object} obj
 * @param {Array} keys : pick keys that will be exist in new Object.
 * @returns {Object}   : new object with only picked keys
 */
const pickKeys = function (obj, keys) {
  const newObject = {};
  keys.forEach((key) => {
    newObject[key] = obj[key];
  });

  return newObject;
};

/**
 * 13- Write a function called reverseArray that takes an array and
 * returns a new array with the elements in reverse order.
 * @param {Array} arr
 * @returns  {Array} Reversed Array
 */
const reverseArray = function (arr) {
  const reversedArray = arr.toReversed();
  return reversedArray;
};

/**
 * 14- Write a function called countOccurrences that takes an array and
 * a value, and returns the number of times the value appears in the array
 * @param {Array} arr
 * @param {number} value : value wanted to be count it's occurrence
 * @returns {number}  count of occurence of certian value
 */
const countOccurrences = function (arr, value) {
  const count = arr.reduce((acc, cur) => {
    if (cur === value) acc++;
    return acc;
  }, 0);
  return count;
};
