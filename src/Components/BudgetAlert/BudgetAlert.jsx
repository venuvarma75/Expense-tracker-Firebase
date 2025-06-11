import React, { useState, useEffect } from 'react';

const BudgetAlert = ({ expenses = [] }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    return Number(localStorage.getItem('monthlyBudget')) || 10000;
  });

  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const total = (expenses || [])
      .filter(exp => {
        const expDate = new Date(exp.date);
        return (
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    setMonthlyTotal(total);

    // Alert logic
    if (total > monthlyBudget) {
      setAlert(' You have exceeded your monthly budget!');
    } else if (total === monthlyBudget) {
      setAlert(' You have exactly hit your monthly budget limit.');
    } else if (total >= monthlyBudget * 0.8) {
      setAlert(' You have used 80% of your monthly budget.');
    } else {
      setAlert('');
    }
  }, [expenses, monthlyBudget]);

  const handleBudgetChange = e => {
    const value = Number(e.target.value);
    if (value === monthlyTotal) {
      alert("❗ Monthly budget should not be equal to current spending.");
      return;
    }
    setMonthlyBudget(value);
    localStorage.setItem('monthlyBudget', value);
  };

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      border: '2px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      maxWidth: '400px'
    }}>
      <label style={{ fontWeight: 'bold' }}>
        Set Monthly Budget: ₹{" "}
        <input
          type="number"
          value={monthlyBudget}
          onChange={handleBudgetChange}
          min={0}
          step={100}
          style={{ marginLeft: '10px' }}
        />
      </label>

      <p style={{ marginTop: '10px' }}>
        <strong>Current Month Spending:</strong> ₹{monthlyTotal.toFixed(2)} / ₹{monthlyBudget}
      </p>

      {alert && <p style={{ color: 'red', fontWeight: 'bold' }}>{alert}</p>}
    </div>
  );
};

export default BudgetAlert;
