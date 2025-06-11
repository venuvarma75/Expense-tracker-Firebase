
// src/utils/helpers.js

/**
 * Filter expenses by category
 * @param {Array} expenses
 * @param {string} category
 * @returns {Array}
 */
export function filterByCategory(expenses, category) {
  if (!category) return expenses;
  return expenses.filter((exp) => exp.category === category);
}

/**
 * Filter expenses by date range (ISO date strings)
 * @param {Array} expenses
 * @param {string} fromDate - 'YYYY-MM-DD' or ''
 * @param {string} toDate - 'YYYY-MM-DD' or ''
 * @returns {Array}
 */
export function filterByDateRange(expenses, fromDate, toDate) {
  if (!fromDate && !toDate) return expenses;

  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  return expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    if (from && expDate < from) return false;
    if (to && expDate > to) return false;
    return true;
  });
}

/**
 * Search expenses by title or note (case-insensitive)
 * @param {Array} expenses
 * @param {string} searchText
 * @returns {Array}
 */
export function searchExpenses(expenses, searchText) {
  if (!searchText) return expenses;

  const lowerSearch = searchText.toLowerCase();

  return expenses.filter(
    (exp) =>
      (exp.title && exp.title.toLowerCase().includes(lowerSearch)) ||
      (exp.note && exp.note.toLowerCase().includes(lowerSearch))
  );
}

/**
 * Calculate total amount from expenses array
 * @param {Array} expenses
 * @returns {number}
 */
export function calculateTotalExpenses(expenses) {
  return expenses.reduce((total, exp) => total + parseFloat(exp.amount || 0), 0);
}
