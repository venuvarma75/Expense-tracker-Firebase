// import React, { useEffect, useState } from "react";
// import { db } from "../../Configuration/Config";
// import { doc, getDoc } from "firebase/firestore";
// import "./Receipt.css"; 

// const Receipt = () => {
//   const [latestExpense, setLatestExpense] = useState(null);

//   useEffect(() => {
//     const fetchLatestExpense = async () => {
//       const userData = localStorage.getItem("LoggedInUser");
//       if (!userData) return;

//       const user = JSON.parse(userData);
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         const data = userSnap.data();
//         const expensesArray = data.expenses || [];
//         if (expensesArray.length > 0) {
//           const last = expensesArray[expensesArray.length - 1];
//           setLatestExpense(last);
//         }
//       }
//     };

//     fetchLatestExpense();
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       window.print();
//     }, 1000); 
//   }, []);

//   return (
//     <div className="receipt printable">
//       <h2>🧾 Expense Receipt</h2>
//       <p>Date: {new Date().toLocaleDateString()}</p>
//       <hr />
//       {latestExpense ? (
//         <table>
//           <tbody>
//             <tr>
//               <td><strong>Title:</strong></td>
//               <td>{latestExpense.title}</td>
//             </tr>
//             <tr>
//               <td><strong>Amount:</strong></td>
//               <td>₹{parseFloat(latestExpense.amount).toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td><strong>Category:</strong></td>
//               <td>{latestExpense.category}</td>
//             </tr>
//             <tr>
//               <td><strong>Date:</strong></td>
//               <td>{latestExpense.date}</td>
//             </tr>
//             <tr>
//               <td><strong>Note:</strong></td>
//               <td>{latestExpense.note}</td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>No recent expense found.</p>
//       )}
//     </div>
//   );
// };

// export default Receipt;




















import React, { useEffect, useState } from "react";
import { db } from "../../Configuration/Config";
import { doc, getDoc } from "firebase/firestore";
import "./Receipt.css";

const Receipt = () => {
  const [latestExpense, setLatestExpense] = useState(null);

  useEffect(() => {
    const fetchLatestExpense = async () => {
      const userData = localStorage.getItem("LoggedInUser");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const expensesArray = data.expenses || [];
        if (expensesArray.length > 0) {
          const last = expensesArray[expensesArray.length - 1];
          setLatestExpense(last);
        }
      }
    };

    fetchLatestExpense();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt printable" id="printable-section">
      <h2>🧾 Expense Receipt</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <hr />
      {latestExpense ? (
        <table>
          <tbody>
            <tr><td><strong>Title:</strong></td><td>{latestExpense.title}</td></tr>
            <tr><td><strong>Amount:</strong></td><td>₹{parseFloat(latestExpense.amount).toFixed(2)}</td></tr>
            <tr><td><strong>Category:</strong></td><td>{latestExpense.category}</td></tr>
            <tr><td><strong>Date:</strong></td><td>{latestExpense.date}</td></tr>
            <tr><td><strong>Note:</strong></td><td>{latestExpense.note}</td></tr>
          </tbody>
        </table>
      ) : (
        <p>No recent expense found.</p>
      )}

      <button onClick={handlePrint} style={{ marginTop: "20px" }}>🖨️ Print Receipt</button>
    </div>
  );
};

export default Receipt;

