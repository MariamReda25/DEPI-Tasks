"use strict";
const generateRandom = function () {
  const rand = Math.round(Math.random() * 1000000000);
  return rand;
};

/**
 * 1. Write a Function to Create a new bank account with validation for required fields.
 **Rules**:
 * - Must have **`firstName`**, **`lastName`**, **`initialDeposit`** (min $50)
 * - Generate a unique 10-digit account number
 * @param {Object} account
 * @returns {Object || String} return opend account object or error message
 */

const createAccount = function (account) {
  console.log(account.firstName);
  if (
    account.firstName !== "" &&
    account.lastName !== "" &&
    account.initialDeposit >= 50
  )
    return {
      accountNumber: generateRandom(),
      firstName: account.firstName,
      lastName: account.lastName,
      balance: account.initialDeposit,
      createdAt: new Date().toISOString(),
    };
  else
    return "Can not open account please send all required info. (first name - last name - min deposite 50)";
};

/**
 * 2. Write the Function to Deposit money into an account with transaction recording.
 **Rules**:
 * - Amount must be positive
 * - Update balance and transaction history
 * @param {Object} account
 * @param {number} amount
 * @returns {Object}  : Updated accpunt after deposit.
 */
const deposit = function (account, amount) {
  if (amount < 0) return account;
  else {
    const transaction = {
      type: "DEPOSIT",
      amount: amount,
      date: new Date().toISOString(),
      newBalance: account.balance + amount,
    };
    return {
      ...account,
      balance: account.balance + amount,
      transactions:
        account.transactions?.length > 0
          ? [...account.transactions, transaction]
          : [transaction],
    };
  }
};

const PENALTY = 5;
/**
 * 3. Write a Function to Process withdrawals with overdraft protection.
 **Rules**:
 * - Reject if insufficient funds
 * - $5 penalty for overdraft attempts
 * @param {Object} account
 * @param {number} amount
 * @returns {Object} : updated account after withdraw operation
 */
const withdraw = function (account, amount) {
  if (amount <= account.balance) {
    const transaction = {
      type: "WITHDRAWAL",
      amount: amount,
      date: new Date().toISOString(),
      newBalance: account.balance - amount,
    };
    return {
      ...account,
      balance: account.balance - amount,
      transactions:
        account.transactions?.length > 0
          ? [...account.transactions, transaction]
          : [transaction],
    };
  } else {
    const penalty = {
      type: "OVERDRAFT_ATTEMPT",
      amount: amount,
      date: new Date().toISOString(),
      penalty: PENALTY,
    };
    return {
      ...account,
      balance: account.balance - PENALTY,
      penaltytransactions:
        account.penaltytransactions?.length > 0
          ? [...account.penaltytransactions, penalty]
          : [penalty],
    };
  }
};

/**
 * 4. Write a function to Transfer money between accounts with validation.
 **Rules**:
 * - Both accounts must exist
 * - No negative transfers
 * - Transaction recorded in both accounts
 * @param {Object} fromAccount
 * @param {Object} toAccount
 * @param {number} amount
 * @returns {Array} : Array of Both accounts with new operations if both accounts exist
 */
const transferMoney = function (fromAccount = {}, toAccount = {}, amount = -1) {
  if (
    Object.keys(fromAccount).length !== 0 &&
    Object.keys(toAccount).length !== 0 &&
    amount > 0
  ) {
    const transferOut = {
      type: "TRANSFER_OUT",
      to: toAccount.accountNumber,
      amount: amount,
      date: new Date().toISOString(),
    };
    const transferIn = {
      type: "TRANSFER_IN",
      to: fromAccount.accountNumber,
      amount: amount,
      date: new Date().toISOString(),
    };
    return [
      {
        ...fromAccount,
        balance: fromAccount.balance - amount,
        transactions: fromAccount.transactions?.length
          ? [...fromAccount.transactions, transferOut]
          : [transferOut],
      },

      {
        ...toAccount,
        balance: toAccount.balance + amount,
        transactions: toAccount.transactions?.length
          ? [...toAccount.transactions, transferIn]
          : [transferIn],
      },
    ];
  } else if (
    (Object.keys(fromAccount).length !== 0 &&
      Object.keys(toAccount).length !== 0 &&
      amount < 0) ||
    amount > fromAccount.balance
  )
    return [{ ...fromAccount }, { ...toAccount }];
  else return `One of accounts not exist`;
};

/**
 * 5. Write a Function to Calculate monthly interest (compound) for savings accounts.
 **Rules**:
 * - 2% annual interest (0.167% monthly)
 * - Applied only if balance > $500
 * @param {Object} account
 * @returns {Object} : account
 */
const monthlyIntersetCalc = function (account) {
  if (account.balance >= 500) {
    const transaction = {
      type: "INTEREST",
      amount: 1.67,
      date: new Date().toISOString(),
    };
    return {
      ...account,
      balance: account.balance * (1 + 0.00167),
      transactions: account.transactions?.length
        ? [...account.transactions, transaction]
        : [transaction],
    };
  } else return account;
};

/**
 * 6. Write a Function to Retrieve transactions within a date range.
 **Rules**:
 * - Support filtering by type (deposit/withdrawal/etc.)
 * - Sort by date descending
 * @param {Object} account : User Account
 * @param {Object} dateRange : startDate - endDate - type of transaction
 * @returns {Array}
 */
const retrieveTransctions = function (account, dateRange) {
  const filteredTransactions = account.transactions
    ?.filter((transaction) => {
      if (
        transaction.date >= dateRange.startDate &&
        transaction.date <= dateRange.endDate &&
        transaction.type === dateRange.type
      )
        return transaction;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return filteredTransactions;
};

/**
 * 7. Write a function to manage account freeze/unfreeze , toggle account status with security checks.
 **Rules**:
 * - Require manager approval for freeze
 * @param {Object} account
 * @param {String} action
 * @param {String} manager
 * @returns {Object}
 */
const manageAccount = function (account, action, manager) {
  if (!manager) return account;
  const currentStatus = {
    action: action,
    by: manager,
    date: new Date().toISOString(),
  };
  return {
    ...account,
    status: action === "UNFREEZE" ? "ACTIVE" : "FROZEN",
    statusHistory: account.statusHistory?.length
      ? [...account.statusHistory, currentStatus]
      : [{ currentStatus }],
  };
};
const formatDate = function (date) {
  return new Intl.DateTimeFormat({
    year: "numeric",
    day: "numeric",
    month: "numeric",
  }).format(new Date(date));
};
/**
 * 8. Write a function to Enforce $500 daily withdrawal limit.
 **Rules**
 * - Calculate sum of today's withdrawals
 * - Reject if limit exceeded
 * @param {Object} account
 * @param {number} amount
 * @returns {Object | String}
 */
const limitWithdraw = function (account, amount) {
  const now = formatDate(Date.now());
  const todayWithdrawals = account.transactions?.reduce(
    (sum, transaction) =>
      formatDate(transaction.date) === now ? sum + transaction.amount : sum,
    0,
  );

  if (todayWithdrawals >= 500)
    return "Error: Daily withdrawal limit exceeded ($500 max)";

  if (account.balance >= amount) {
    const transaction = {
      type: "WITHDRAWAL",
      amount: amount,
      date: new Date().toISOString(),
      newBalance:
        account.balance >= amount ? account.balance - amount : account.balance,
    };
    return {
      ...account,
      balance:
        account.balance >= amount ? account.balance - amount : account.balance,
      transactions: account.transactions?.length
        ? [...account.transactions, transaction]
        : [transaction],
    };
  }
  return account;
};

/**
 * 9. Write a function to validate password
 **Rules**:
 *- Minimum 12 characters
 *- Require uppercase, lowercase, number, and special character
 *- No common passwords
 * @param {String} password
 * @returns {Object} : validation object
 */
function validatePassword(password) {
  if (password.length < 12 || password.length > 20) {
    return {
      valid: false,
      reasns: ["Password must be at least 12 characters"],
    };
  }

  let hasDigit = false;
  let hasLowercase = false;
  let hasUppercase = false;
  let hasSpecialChar = false;
  const specialChars = "!@#$%^&*()-+.";

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (/[0-9]/.test(char)) {
      hasDigit = true;
    } else if (/[a-z]/.test(char)) {
      hasLowercase = true;
    } else if (/[A-Z]/.test(char)) {
      hasUppercase = true;
    } else if (specialChars.includes(char)) {
      hasSpecialChar = true;
    }

    if (hasDigit && hasLowercase && hasUppercase && hasSpecialChar) {
      return { valid: true };
    }
  }
  const reasons = [];
  !hasDigit && reasons.push("Password must contain a digits");
  !hasLowercase && reasons.push("Password must contain lowercase character");
  !hasUppercase && reasons.push("Password must contain uppercase character");
  !hasSpecialChar && reasons.push("Password must contain a special character");
  return {
    valid: false,
    reasons,
  };
}
/**
 * 10. Write a function to check and detect suspicious activities, and flags unusual transaction patterns
 **Rules**:
 *- Alert on transactions >$10,000
 *- Alert on rapid sequence of small transactions (3+ in 5 minutes)
 * @param {Object} account
 * @returns {Object} alerts
 */
const checkForSuspiciousActivity = function (account) {
  const MAX_RAPID_TRANS = 3;
  const MIN_RAPID_MIN = 5;
  let alert = {};
  let min = 0,
    trans = 0;
  const dailyTransactions = account.transactions?.map(
    (transaction) => new Date(transaction.date),
  );

  account.transactions?.forEach((transaction) => {
    if (transaction.amount > 1000)
      alert = {
        ...alert,
        isSuspicious: true,
        alerts: alert.alerts?.length
          ? [...alert.alerts, "High-value transaction: $15000 transfer"]
          : ["High-value transaction: $15000 transfer"],
      };
  });
  dailyTransactions
    .sort((a, b) => a - b)
    .forEach((date, i) => {
      if (
        date.getDate() === dailyTransactions[i + 1]?.getDate() &&
        date.getHours() === dailyTransactions[i + 1]?.getHours()
      ) {
        min += (dailyTransactions[i + 1] - date) / (1000 * 60);
        trans++;
        console.log(min, trans);
        if (min >= MIN_RAPID_MIN && trans >= MAX_RAPID_TRANS)
          alert = {
            ...alert,
            isSuspicious: true,
            alerts: alert.alerts?.length
              ? [
                  ...alert.alerts,
                  "Rapid withdrawals: 3 transactions within 5 minutes",
                ]
              : ["Rapid withdrawals: 3 transactions within 5 minutes"],
          };
      } else {
        min = 0;
      }
    });

  return alert;
};
