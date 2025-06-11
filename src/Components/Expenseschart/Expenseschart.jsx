// import React, { useState } from "react";
// import { CSVLink } from "react-csv";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { db } from "../../Configuration/Config";
// import { doc, getDoc } from "firebase/firestore";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { parseISO, format } from "date-fns";

// const COLORS = [
//   "#8884d8",
//   "#82ca9d",
//   "#ffc658",
//   "#ff7f50",
//   "#00bfff",
//   "#ff69b4",
// ];

// const ExpenseChart = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);

//   const fetchExpenses = async () => {
//     const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
//     if (!loggedInUser) return alert("No user logged in");

//     const userRef = doc(db, "users", loggedInUser.uid);
//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//       const expenses = userSnap.data().expenses || [];

//       const categoryTotals = {};
//       const monthTotals = {};

//       expenses.forEach((exp) => {
//         const category = exp.category;
//         const amount = parseFloat(exp.amount) || 0;
//         categoryTotals[category] = (categoryTotals[category] || 0) + amount;

//         if (exp.date) {
//           try {
//             const month = format(parseISO(exp.date), "MMMM yyyy");
//             monthTotals[month] = (monthTotals[month] || 0) + amount;
//           } catch (error) {
//             console.warn("Invalid date format:", exp.date);
//           }
//         }
//       });

//       const catData = Object.entries(categoryTotals).map(
//         ([category, total]) => ({
//           name: category,
//           value: total,
//         })
//       );

//       const monthData = Object.entries(monthTotals).map(([month, total]) => ({
//         name: month,
//         total,
//       }));

//       setCategoryData(catData);
//       setMonthlyData(monthData);
//     }
//   };

//   const categoryHeaders = [
//     { label: "Category", key: "name" },
//     { label: "Total", key: "value" },
//   ];

//   return (
//     <div className="container mt-5">
//       <h2>Expense Charts</h2>
//       <button className="btn btn-primary mb-3" onClick={fetchExpenses}>
//         Show Expense Charts
//       </button>

//       {categoryData.length > 0 && (
//         <>
//           <CSVLink
//             data={categoryData}
//             headers={categoryHeaders}
//             filename="category-expenses.csv"
//             className="btn btn-success mb-3"
//           >
//             Export Category CSV
//           </CSVLink>

//           <div className="row mt-4">
//             <div className="col-md-6">
//               <h4>Category-wise Expenses</h4>
//               <PieChart width={400} height={300}>
//                 <Pie
//                   data={categoryData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={100}
//                   label
//                 >
//                   {categoryData.map((_, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </div>

//             <div className="col-md-6">
//               <h4>Monthly Expenses</h4>
//               <BarChart width={500} height={300} data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="total" fill="#8884d8" />
//               </BarChart>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ExpenseChart;

import React, { useState } from "react";
import { db } from "../../Configuration/Config";
import { doc, getDoc } from "firebase/firestore";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { parseISO, format } from "date-fns";
import { CSVLink } from "react-csv";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff", "#ff69b4"];

const ExpenseChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchExpenses = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    if (!loggedInUser) return alert("No user logged in");

    const userRef = doc(db, "users", loggedInUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const expenses = userSnap.data().expenses || [];

      const categoryTotals = {};
      const monthTotals = {};

      expenses.forEach((exp) => {
        const category = exp.category;
        const amount = parseFloat(exp.amount) || 0;
        categoryTotals[category] = (categoryTotals[category] || 0) + amount;

        if (exp.date) {
          try {
            const month = format(parseISO(exp.date), "MMMM yyyy");
            monthTotals[month] = (monthTotals[month] || 0) + amount;
          } catch (error) {
            console.warn("Invalid date format:", exp.date);
          }
        }
      });

      const catData = Object.entries(categoryTotals).map(([category, total]) => ({
        name: category,
        value: total,
      }));

      const monthData = Object.entries(monthTotals).map(([month, total]) => ({
        name: month,
        total,
      }));

      setCategoryData(catData);
      setMonthlyData(monthData);
    }
  };

  const categoryHeaders = [
    { label: "Category", key: "name" },
    { label: "Total", key: "value" },
  ];

  const monthHeaders = [
    { label: "Month", key: "name" },
    { label: "Total", key: "total" },
  ];

  return (
    <div className="container mt-5">
      <h2>Expense Charts</h2>
      <button className="btn btn-primary mb-3" onClick={fetchExpenses}>
        Show Expense Charts
      </button>

      {categoryData.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h4>Category-wise Expenses</h4>
            <CSVLink
              data={categoryData}
              headers={categoryHeaders}
              filename="category-expenses.csv"
              className="btn btn-success mb-3"
            >
              Export Category CSV
            </CSVLink>
            <PieChart width={400} height={300}>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="col-md-6">
            <h4>Monthly Expenses</h4>
            <CSVLink
              data={monthlyData}
              headers={monthHeaders}
              filename="monthly-expenses.csv"
              className="btn btn-success mb-3"
            >
              Export Monthly CSV
            </CSVLink>
            <BarChart width={500} height={300} data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
// import React, { useState } from "react";
// import { CSVLink } from "react-csv";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { db } from "../../Configuration/Config";
// import { doc, getDoc } from "firebase/firestore";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { parseISO, format } from "date-fns";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff", "#ff69b4"];

// const ExpenseChart = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);

//   const fetchExpenses = async () => {
//     const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
//     if (!loggedInUser) return alert("No user logged in");

//     const userRef = doc(db, "users", loggedInUser.uid);
//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//       const expenses = userSnap.data().expenses || [];

//       const categoryTotals = {};
//       const monthTotals = {};

//       expenses.forEach((exp) => {
//         const category = exp.category;
//         const amount = parseFloat(exp.amount) || 0;
//         categoryTotals[category] = (categoryTotals[category] || 0) + amount;

//         if (exp.date) {
//           try {
//             const month = format(parseISO(exp.date), "MMMM yyyy");
//             monthTotals[month] = (monthTotals[month] || 0) + amount;
//           } catch (error) {
//             console.warn("Invalid date format:", exp.date);
//           }
//         }
//       });

//       const catData = Object.entries(categoryTotals).map(([category, total]) => ({
//         name: category,
//         value: total,
//       }));

//       const monthData = Object.entries(monthTotals).map(([month, total]) => ({
//         name: month,
//         total,
//       }));

//       setCategoryData(catData);
//       setMonthlyData(monthData);
//     }
//   };

//   const categoryHeaders = [
//     { label: "Category", key: "name" },
//     { label: "Total", key: "value" },
//   ];

//   const monthHeaders = [
//     { label: "Month", key: "name" },
//     { label: "Total", key: "total" },
//   ];

//   return (
//     <div className="container mt-5">
//       <h2>Expense Charts</h2>
//       <button className="btn btn-primary mb-3" onClick={fetchExpenses}>
//         Show Expense Charts
//       </button>

//       {categoryData.length > 0 && (
//         <div className="row mt-4">
//           <div className="col-md-6">
//             <h4>Category-wise Expenses</h4>
//             <CSVLink
//               data={categoryData}
//               headers={categoryHeaders}
//               filename="category-expenses.csv"
//               className="btn btn-success mb-3"
//             >
//               Export Category CSV
//             </CSVLink>
//             <PieChart width={400} height={300}>
//               <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
//                 {Array.isArray(categoryData) &&
//                   categoryData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </div>

//           <div className="col-md-6">
//             <h4>Monthly Expenses</h4>
//             <CSVLink
//               data={monthlyData}
//               headers={monthHeaders}
//               filename="monthly-expenses.csv"
//               className="btn btn-success mb-3"
//             >
//               Export Monthly CSV
//             </CSVLink>
//             <BarChart width={500} height={300} data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="total" fill="#8884d8" />
//             </BarChart>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpenseChart;
