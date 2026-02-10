/**1. Rectangle *************************************************************
 * Create a constructor function Rectangle that takes width and height as parameters.
 * @param {number} width
 * @param {number} height
 * @returns {Object}
 */
const Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
/**
 * Add an instance method getArea to the prototype that calculates the area of the rectangle.
 * @returns {number} Area of rectangle object
 */
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
/**
 * Add a static method isSquare to the constructor that checks if a rectangle is a square.
 * @param {number} width
 * @param {number} height
 * @returns {Boolean}
 */
Rectangle.isSquare = function (width, height) {
  return width === height;
};

/******************************************************************************** */
/**
 * 2.Bank Account ****************************************************************
 * Create a constructor function BankAccount that takes accountNumber and balance as parameters.
 * @param {number} accountNumber
 * @param {number} balance
 * @returns {Object} new BankAccount created object
 */
const BankAccount = function (accountNumber, balance) {
  this._accountNumber = accountNumber;
  this._balance = balance;
};

/**
 * Add an Instance Method ‘deposit‘ that takes an amount and adds it to the balance.
 * @param {number} amount
 */
BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

/**
 * Add a Static method ‘transferFunds ‘ to transfer funds from one account to another
 * @param {Object} accountFrom
 * @param {Object} accountTo
 * @param {number} amount
 */
BankAccount.transferFunds = function (accountFrom, accountTo, amount) {
  accountFrom.balance -= amount;
  accountTo.balance += amount;
};
/**
 * Use getters and setters for the properties.
 */
Object.defineProperties(BankAccount.prototype, {
  balance: {
    get: function () {
      return this._balance;
    },
    set: function (balance) {
      this._balance = balance;
    },
  },
  accountNumber: {
    get: function () {
      return this._accountNumber;
    },
    set: function (accountNumber) {
      this._accountNumber = accountNumber;
    },
  },
});
