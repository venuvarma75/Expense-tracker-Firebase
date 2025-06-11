
// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../Configuration/Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { formatCurrency, formatDate } from '../../utils/format';

import {
  isValidExpense,
  isValidBudget
} from '../../utils/validation';

import {
  calculateTotalExpenses,
  isBudgetExceeded,
  getRemainingBudget
} from '../../utils/budget';

import {
  downloadCSV
} from '../../utils/export';

import useCurrentMonthExpenses from "../../hooks/useCurrentMonthExpenses";
import BudgetAlert from "../../Components/BudgetAlert/BudgetAlert";

import {
  filterByCategory,
  filterByDateRange,
  searchExpenses
} from "../../utils/helpers";

const Dashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
  const userId = loggedInUser?.uid;
  const navigate = useNavigate();

  const { loading } = useCurrentMonthExpenses(userId);

  const [allExpenses, setAllExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!userId) return;
    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    applyFilters();
  }, [allExpenses, selectedCategory, searchText, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const expensesArray = data.expenses || [];
        setAllExpenses(expensesArray);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const applyFilters = () => {
    let filtered = allExpenses;
    filtered = filterByCategory(filtered, selectedCategory);
    filtered = searchExpenses(filtered, searchText);
    filtered = filterByDateRange(filtered, startDate, endDate);
    setFilteredExpenses(filtered);
    setTotal(calculateTotalExpenses(filtered));
  };

  const handleDelete = async (expenseToDelete) => {
    if (!userId) return;
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const currentExpenses = userSnap.data()?.expenses || [];
      const updatedExpenses = currentExpenses.filter(
        (exp) => exp.createdAt !== expenseToDelete.createdAt
      );
      await updateDoc(userRef, { expenses: updatedExpenses });
      setAllExpenses(updatedExpenses);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleExport = () => {
    downloadCSV(filteredExpenses, 'FilteredExpenses.csv');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expense Dashboard</h2>

      <BudgetAlert expenses={allExpenses} />

      <h5>Total Expense: {formatCurrency(total)}</h5>

      <div className="row g-3 my-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or note"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        {filteredExpenses.length === 0 ? (
          <p>No expenses found for selected filters.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.title || "-"}</td>
                  <td>{formatCurrency(exp.amount)}</td>
                  <td>{exp.category || "-"}</td>
                  <td>{formatDate(exp.date)}</td>
                  <td>{exp.note || "-"}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate("/edit", { state: exp })}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(exp)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button
          variant="primary"
          onClick={() => window.open("/receipt", "_blank")}
        >
          🧾 View & Print Receipt
        </Button>

        <Button
          variant="success"
          onClick={handleExport}
        >
          ⬇️ Export CSV
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
