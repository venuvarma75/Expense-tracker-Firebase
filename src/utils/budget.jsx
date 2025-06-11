// utils/budget.js
  export const calculateTotalExpenses = (expenses) => {
    return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  };
  
  export const isBudgetExceeded = (expenses, budget) => {
    const total = calculateTotalExpenses(expenses);
    return total > budget;
  };
  
  export const getRemainingBudget = (expenses, budget) => {
    return budget - calculateTotalExpenses(expenses);
  };
