// // import React, { useState } from "react";
// // import { Form, Button } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";
// // import { db } from "../Configuration/Config";
// // import {
// //   collection,
// //   getDoc,
// //   setDoc,
// //   updateDoc,
// //   doc,
// //   arrayUnion,
// // } from "firebase/firestore";

// // const AddExpense = () => {
// //   const [expense, setExpense] = useState({
// //     title: "",
// //     amount: "",
// //     category: "",
// //     startDate: "",
// //     endDate: "",
// //     note: "",
// //   });

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const user = JSON.parse(localStorage.getItem("LoggedInUser"));
// //       console.log("LoggedInUser:", user);
// //       if (!user || !user.uid) {
// //         return;
// //       }

// //       const userRef = doc(db, "users", user.uid);
// //       const userSnap = await getDoc(userRef);

// //       if (!userSnap.exists()) {
// //         await setDoc(userRef, {
// //           email: user.email || "",
// //           expenses: [],
// //         });
// //       }

// //       const newExpense = {
// //         ...expense,
// //         amount: parseFloat(expense.amount),
// //         createdAt: new Date().toISOString(),
// //       };

// //       console.log("Expense data to save:", newExpense);

// //       await updateDoc(userRef, {
// //         expenses: arrayUnion(newExpense),
// //       });

// //       alert("Expense added successfully!");

// //       setExpense({
// //         title: "",
// //         amount: "",
// //         category: "",
// //         startDate: "",
// //         endDate: "",
// //         note: "",
// //       });
// //       navigate("/DashBoard");
// //     } catch (err) {
// //       console.error("Error adding expense:", err);
// //     }
// //   };

// //   return (
// //     <div className="expense">
// //       <h2>Add Expense</h2>
// //       <div>
// //         <Form onSubmit={handleSubmit}>
// //           <Form.Group className="mb-3" controlId="expenseTitle">
// //             <Form.Label>Title</Form.Label>
// //             <Form.Control
// //               type="text"
// //               placeholder="Enter title"
// //               value={expense.title}
// //               onChange={(e) => setExpense({ ...expense, title: e.target.value })}
// //               required
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3" controlId="expenseAmount">
// //             <Form.Label>Amount</Form.Label>
// //             <Form.Control
// //               type="number"
// //               placeholder="Enter amount"
// //               value={expense.amount}
// //               onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
// //               required
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3" controlId="expenseCategory">
// //             <Form.Label>Category</Form.Label>
// //             <Form.Select
// //               value={expense.category}
// //               onChange={(e) => setExpense({ ...expense, category: e.target.value })}
// //               required
// //             >
// //               <option value="">Select Category</option>
// //               <option value="Food">Food</option>
// //               <option value="Travel">Travel</option>
// //               <option value="Shopping">Shopping</option>
// //               <option value="Utilities">Utilities</option>
// //               <option value="Others">Others</option>
// //             </Form.Select>
// //           </Form.Group>

// //           <Form.Group className="mb-3" controlId="startDate">
// //             <Form.Label>Start Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               value={expense.startDate}
// //               onChange={(e) => setExpense({ ...expense, startDate: e.target.value })}
// //               required
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3" controlId="endDate">
// //             <Form.Label>End Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               value={expense.endDate}
// //               onChange={(e) => setExpense({ ...expense, endDate: e.target.value })}
// //               required
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-3" controlId="expenseNote">
// //             <Form.Label>Note</Form.Label>
// //             <Form.Control
// //               type="text"
// //               placeholder="Enter note"
// //               value={expense.note}
// //               onChange={(e) => setExpense({ ...expense, note: e.target.value })}
// //               required
// //             />
// //           </Form.Group>

// //           <Button variant="success" type="submit" className="w-100">
// //             Add Expense
// //           </Button>
// //         </Form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddExpense;


// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { db } from "../Configuration/Config";
// import { collection, getDoc, setDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

// const AddExpense = () => {
//   const [expense, setExpense] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//     note: "",
//     currency: "₹", // Default currency
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = JSON.parse(localStorage.getItem("LoggedInUser"));
//       if (!user || !user.uid) {
//         return;
//       }

//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       // Create user doc if it doesn't exist
//       if (!userSnap.exists()) {
//         await setDoc(userRef, {
//           email: user.email || "",
//           expenses: [],
//         });
//       }

//       const newExpense = {
//         ...expense,
//         amount: parseFloat(expense.amount),
//         createdAt: new Date().toISOString(),
//       };

//       await updateDoc(userRef, {
//         expenses: arrayUnion(newExpense),
//       });

//       alert("Expense added successfully!");

//       // Reset form
//       setExpense({
//         title: "",
//         amount: "",
//         category: "",
//         date: "",
//         note: "",
//         currency: "₹", // Reset currency to default
//       });

//       navigate("/DashBoard");
//     } catch (err) {
//       console.error("Error adding expense:", err);
//     }
//   };

//   return (
//     <div className="expense">
//       <h2>Add Expense</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="expenseTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter title"
//             value={expense.title}
//             onChange={(e) => setExpense({ ...expense, title: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseAmount">
//           <Form.Label>Amount</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter amount"
//             value={expense.amount}
//             onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseCategory">
//           <Form.Label>Category</Form.Label>
//           <Form.Select
//             value={expense.category}
//             onChange={(e) => setExpense({ ...expense, category: e.target.value })}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Food">Food</option>
//             <option value="Travel">Travel</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Utilities">Utilities</option>
//             <option value="Others">Others</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseDate">
//           <Form.Label>Date</Form.Label>
//           <Form.Control
//             type="date"
//             value={expense.date}
//             onChange={(e) => setExpense({ ...expense, date: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseNote">
//           <Form.Label>Note</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter note"
//             value={expense.note}
//             onChange={(e) => setExpense({ ...expense, note: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseCurrency">
//           <Form.Label>Currency</Form.Label>
//           <Form.Select
//             value={expense.currency}
//             onChange={(e) => setExpense({ ...expense, currency: e.target.value })}
//             required
//           >
//             <option value="₹">₹ INR</option>
//             <option value="$">$ USD</option>
//             <option value="€">€ EUR</option>
//             <option value="£">£ GBP</option>
//             <option value="¥">¥ JPY</option>
//           </Form.Select>
//         </Form.Group>

//         <Button variant="success" type="submit" className="w-100">
//           Add Expense
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default AddExpense;
// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { db } from "../Configuration/Config";
// import { collection, getDoc, setDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

// const AddExpense = () => {
//   const [expense, setExpense] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//     note: "",
//     currency: "₹",           // Default currency
//     isRecurring: false,      // New: recurring flag
//     recurrence: "monthly",   // New: recurrence frequency
//     recurrenceEndDate: "",   // New: optional recurrence end date
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = JSON.parse(localStorage.getItem("LoggedInUser"));
//       if (!user || !user.uid) {
//         alert("User not logged in!");
//         return;
//       }

//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         await setDoc(userRef, {
//           email: user.email || "",
//           expenses: [],
//         });
//       }

//       const newExpense = {
//         ...expense,
//         amount: parseFloat(expense.amount),
//         createdAt: new Date().toISOString(),
//         isRecurring: expense.isRecurring,
//         recurrence: expense.isRecurring ? expense.recurrence : null,
//         recurrenceEndDate: expense.isRecurring ? expense.recurrenceEndDate : null,
//       };

//       await updateDoc(userRef, {
//         expenses: arrayUnion(newExpense),
//       });

//       alert("Expense added successfully!");

//       // Reset form fields
//       setExpense({
//         title: "",
//         amount: "",
//         category: "",
//         date: "",
//         note: "",
//         currency: "₹",
//         isRecurring: false,
//         recurrence: "monthly",
//         recurrenceEndDate: "",
//       });

//       navigate("/DashBoard");
//     } catch (err) {
//       console.error("Error adding expense:", err);
//     }
//   };

//   return (
//     <div className="expense">
//       <h2>Add Expense</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="expenseTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter title"
//             value={expense.title}
//             onChange={(e) => setExpense({ ...expense, title: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseAmount">
//           <Form.Label>Amount</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter amount"
//             value={expense.amount}
//             onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseCategory">
//           <Form.Label>Category</Form.Label>
//           <Form.Select
//             value={expense.category}
//             onChange={(e) => setExpense({ ...expense, category: e.target.value })}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Food">Food</option>
//             <option value="Travel">Travel</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Utilities">Utilities</option>
//             <option value="Others">Others</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseDate">
//           <Form.Label>Date</Form.Label>
//           <Form.Control
//             type="date"
//             value={expense.date}
//             onChange={(e) => setExpense({ ...expense, date: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseNote">
//           <Form.Label>Note</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter note"
//             value={expense.note}
//             onChange={(e) => setExpense({ ...expense, note: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="expenseCurrency">
//           <Form.Label>Currency</Form.Label>
//           <Form.Select
//             value={expense.currency}
//             onChange={(e) => setExpense({ ...expense, currency: e.target.value })}
//             required
//           >
//             <option value="₹">₹ INR</option>
//             <option value="$">$ USD</option>
//             <option value="€">€ EUR</option>
//             <option value="£">£ GBP</option>
//             <option value="¥">¥ JPY</option>
//           </Form.Select>
//         </Form.Group>

//         {/* Recurring expense toggle */}
//         <Form.Group controlId="expenseIsRecurring" className="mb-3">
//           <Form.Check
//             type="checkbox"
//             label="Is this a recurring expense?"
//             checked={expense.isRecurring}
//             onChange={(e) => setExpense({ ...expense, isRecurring: e.target.checked })}
//           />
//         </Form.Group>

//         {/* Recurrence details only shown if recurring */}
//         {expense.isRecurring && (
//           <>
//             <Form.Group controlId="expenseRecurrence" className="mb-3">
//               <Form.Label>Recurrence Frequency</Form.Label>
//               <Form.Select
//                 value={expense.recurrence}
//                 onChange={(e) => setExpense({ ...expense, recurrence: e.target.value })}
//                 required
//               >
//                 <option value="daily">Daily</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group controlId="expenseRecurrenceEndDate" className="mb-3">
//               <Form.Label>Recurrence End Date (optional)</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={expense.recurrenceEndDate}
//                 onChange={(e) => setExpense({ ...expense, recurrenceEndDate: e.target.value })}
//               />
//             </Form.Group>
//           </>
//         )}

//         <Button variant="success" type="submit" className="w-100">
//           Add Expense
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default AddExpense;



import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../Configuration/Config";
import { collection, getDoc, setDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
    currency: "₹",
    isRecurring: false,
    recurrence: "monthly",
    recurrenceEndDate: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("LoggedInUser"));
      if (!user || !user.uid) {
        alert("User not logged in!");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email || "",
          expenses: [],
        });
      }

      const newExpense = {
        ...expense,
        amount: parseFloat(expense.amount),
        createdAt: new Date().toISOString(),
        isRecurring: expense.isRecurring,
        recurrence: expense.isRecurring ? expense.recurrence : null,
        recurrenceEndDate: expense.isRecurring ? expense.recurrenceEndDate : null,
      };

      await updateDoc(userRef, {
        expenses: arrayUnion(newExpense),
      });

      alert("Expense added successfully!");

      // Reset
      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
        currency: "₹",
        isRecurring: false,
        recurrence: "monthly",
        recurrenceEndDate: "",
      });

      navigate("/DashBoard");
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f2f5f9",
      padding: "20px",
    }}>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "black",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center mb-4">Add Expense</h3>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter note"
            value={expense.note}
            onChange={(e) => setExpense({ ...expense, note: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Currency</Form.Label>
          <Form.Select
            value={expense.currency}
            onChange={(e) => setExpense({ ...expense, currency: e.target.value })}
            required
          >
            <option value="₹">₹ INR</option>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="£">£ GBP</option>
            <option value="¥">¥ JPY</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Is this a recurring expense?"
            checked={expense.isRecurring}
            onChange={(e) =>
              setExpense({ ...expense, isRecurring: e.target.checked })
            }
          />
        </Form.Group>

        {expense.isRecurring && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Recurrence Frequency</Form.Label>
              <Form.Select
                value={expense.recurrence}
                onChange={(e) =>
                  setExpense({ ...expense, recurrence: e.target.value })
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recurrence End Date (optional)</Form.Label>
              <Form.Control
                type="date"
                value={expense.recurrenceEndDate}
                onChange={(e) =>
                  setExpense({ ...expense, recurrenceEndDate: e.target.value })
                }
              />
            </Form.Group>
          </>
        )}

        <Button variant="success" type="submit" className="w-100">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
