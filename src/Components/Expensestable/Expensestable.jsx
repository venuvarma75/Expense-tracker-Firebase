
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExpensesTable = ({ expenses }) => {
  const downloadCSV = () => {
    if (!expenses || expenses.length === 0) {
      alert("No expenses to export.");
      return;
    }

    const headers = ["Date", "Category", "Amount", "Description"];
    const rows = expenses.map((exp) => [
      new Date(exp.date).toLocaleDateString(), // Format date
      exp.category,
      exp.amount,
      exp.description,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 14, 10);

    const tableColumn = ["Date", "Category", "Amount", "Description"];
    const tableRows = [];

    expenses.forEach((exp) => {
      const expData = [
        new Date(exp.date).toLocaleDateString(),
        exp.category,
        exp.amount,
        exp.description,
      ];
      tableRows.push(expData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("expenses.pdf");
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export PDF
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{exp.category}</td>
              <td className="py-2 px-4 border-b">₹{exp.amount}</td>
              <td className="py-2 px-4 border-b">{exp.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
