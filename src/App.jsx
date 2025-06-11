import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar/Navbar";
import ExpensesChart from "./Components/Expenseschart/Expenseschart";
import TransactionsList from "./Components/TransactionsList/TransactionsList";
import BudgetAlert from "./Components/BudgetAlert/BudgetAlert";

// Pages
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Receipt from "./Pages/Receipt/Receipt";
import Logout from "./Pages/Logout/Logout";
import AddExpense from "./Pages/AddExpense";
import Dashboard from "./Pages/DashBoard/DashBoard";
import PaginatedExpenses from './Pages/PaginatedExpenses/PaginatedExpenses';

const App = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenseschart" element={<ExpensesChart />} />
        <Route path="/transactionList" element={<TransactionsList />} />
        <Route path="/budgetAlert" element={<BudgetAlert />} />
      </Routes>

      {/*  Show only on /dashboard */}
      {isDashboardPage && <PaginatedExpenses />}
    </div>
  );
};

export default App;

