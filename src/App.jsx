import React from "react";
import { Routes, Route } from "react-router-dom";

// Import components properly
import Navbar from "./Components/Navbar/Navbar";
// import ExpensesTable from "./Components/ExpensesTable/ExpensesTable"; // <-- Correct import
import ExpensesChart from "./Components/Expenseschart/Expenseschart";
import TransactionsList from "./Components/TransactionsList/TransactionsList";


// Pages
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Receipt from "./Pages/Receipt/Receipt";
import Logout from "./Pages/Logout/Logout";
import AddExpense from "./Pages/AddExpense";
import Dashboard from "./Pages/DashBoard/DashBoard";
import PaginatedExpenses from './Pages/PaginatedExpenses/PaginatedExpenses';
import BudgetAlert from "./Components/BudgetAlert/BudgetAlert";

const App = () => {
  return (
    <div>
      <Navbar />
         <PaginatedExpenses />
      {/* <ExpensesTable /> Use the right component name */}
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

        <Route path="/budgetAlert" element={<BudgetAlert/>}/>
        {/* <Route path="/expensestable" element={<ExpensesTable />} /> */}


      </Routes>
    </div>
  );
};

export default App;
