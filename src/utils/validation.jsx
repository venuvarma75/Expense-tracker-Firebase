// utils/validation.js
export const isValidExpense = (expense) => {
  return (
    expense.title?.trim() !== '' &&
    !isNaN(expense.amount) &&
    Number(expense.amount) > 0 &&
    expense.category?.trim() !== '' &&
    expense.date
  );
};

export const isValidBudget = (budget) => {
  return !isNaN(budget) && Number(budget) > 0;
};
