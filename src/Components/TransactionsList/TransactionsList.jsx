// import React, { useEffect, useState } from "react";
// import { db } from "../../Configuration/Config";
// import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
// import { Table, Button, Form } from "react-bootstrap";

// const TransactionsList = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     title: "",
//     amount: "",
//     category: "",
//     date: "",
//     note: "",
//   });

//   const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       if (!loggedInUser?.uid) return;
//       const userRef = doc(db, "users", loggedInUser.uid);
//       const docSnap = await getDoc(userRef);
//       if (docSnap.exists()) {
//         setExpenses(docSnap.data().expenses || []);
//       }
//     };
//     fetchExpenses();
//   }, [loggedInUser?.uid]);

//   const handleDelete = async (item) => {
//     if (!loggedInUser?.uid) return;
//     const userRef = doc(db, "users", loggedInUser.uid);
//     try {
//       await updateDoc(userRef, {
//         expenses: arrayRemove(item),
//       });
//       // Update local state
//       setExpenses((prev) => prev.filter((exp) => exp !== item));
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Failed to delete transaction.");
//     }
//   };

//   const handleEditClick = (index) => {
//     setEditingIndex(index);
//     setEditFormData({ ...expenses[index] });
//   };

//   const handleCancelEdit = () => {
//     setEditingIndex(null);
//     setEditFormData({
//       title: "",
//       amount: "",
//       category: "",
//       date: "",
//       note: "",
//     });
//   };

//   const handleEditChange = (e) => {
//     setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
//   };

//   const handleSaveEdit = async () => {
//     if (!loggedInUser?.uid) return;
//     const userRef = doc(db, "users", loggedInUser.uid);
//     const oldItem = expenses[editingIndex];
//     const updatedItem = { ...editFormData };

//     try {
//       // Remove old item
//       await updateDoc(userRef, {
//         expenses: arrayRemove(oldItem),
//       });
//       // Add updated item
//       await updateDoc(userRef, {
//         expenses: arrayUnion(updatedItem),
//       });

//       // Update local state
//       setExpenses((prev) => {
//         const newExpenses = [...prev];
//         newExpenses[editingIndex] = updatedItem;
//         return newExpenses;
//       });

//       setEditingIndex(null);
//       alert("Transaction updated!");
//     } catch (error) {
//       console.error("Edit error:", error);
//       alert("Failed to update transaction.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Transaction History</h2>
//       {expenses.length > 0 ? (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Expenses</th>
//               <th>Amount (₹)</th>
//               <th>Category</th>
//               <th>Date</th>
//               <th>Note</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((exp, index) =>
//               editingIndex === index ? (
//                 <tr key={index}>
//                   <td>
//                     <Form.Control
//                       type="text"
//                       name="title"
//                       value={editFormData.title}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       name="amount"
//                       value={editFormData.amount}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="text"
//                       name="category"
//                       value={editFormData.category}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="date"
//                       name="date"
//                       value={editFormData.date}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="text"
//                       name="note"
//                       value={editFormData.note}
//                       onChange={handleEditChange}
//                     />
//                   </td>
//                   <td>
//                     <Button variant="success" size="sm" onClick={handleSaveEdit} className="me-2">
//                       Save
//                     </Button>
//                     <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
//                       Cancel
//                     </Button>
//                   </td>
//                 </tr>
//               ) : (
//                 <tr key={index}>
//                   <td>{exp.title}</td>
//                   <td>₹{parseFloat(exp.amount).toFixed(2)}</td>
//                   <td>{exp.category}</td>
//                   <td>{exp.date}</td>
//                   <td>{exp.note}</td>
//                   <td>
//                     <Button variant="warning" size="sm" onClick={() => handleEditClick(index)} className="me-2">
//                       Edit
//                     </Button>
//                     <Button variant="danger" size="sm" onClick={() => handleDelete(exp)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </Table>
//       ) : (
//         <p>No transactions available.</p>
//       )}
//     </div>
//   );
// };

// export default TransactionsList;
   


import React, { useEffect, useState } from "react";
import { db } from "../../Configuration/Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Table, Button, Form } from "react-bootstrap";

const TransactionsList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
    createdAt: "", // keep id for update reference
  });
  const [saving, setSaving] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!loggedInUser?.uid) return;
      const userRef = doc(db, "users", loggedInUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setExpenses(docSnap.data().expenses || []);
      }
    };
    fetchExpenses();
  }, [loggedInUser?.uid]);

  // Toggle edit mode: if same index clicked again, cancel edit, else start editing
  const toggleEdit = (index) => {
    if (editingIndex === index) {
      // Cancel edit mode
      setEditingIndex(null);
      resetEditForm();
    } else {
      // Start edit mode
      setEditingIndex(index);
      setEditFormData({ ...expenses[index] });
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      note: "",
      createdAt: "",
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!loggedInUser?.uid) return;

    // Validation
    if (!editFormData.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!editFormData.amount || isNaN(editFormData.amount) || Number(editFormData.amount) <= 0) {
      alert("Amount should be a positive number");
      return;
    }
    if (!editFormData.category.trim()) {
      alert("Category is required");
      return;
    }
    if (!editFormData.date) {
      alert("Date is required");
      return;
    }

    setSaving(true);
    try {
      const userRef = doc(db, "users", loggedInUser.uid);
      const updatedExpenses = expenses.map((exp, idx) =>
        idx === editingIndex ? { ...editFormData } : exp
      );
      await updateDoc(userRef, { expenses: updatedExpenses });
      setExpenses(updatedExpenses);
      setEditingIndex(null);
      resetEditForm();
      alert("Transaction updated!");
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to update transaction.");
    }
    setSaving(false);
  };

  const handleDelete = async (indexToDelete) => {
    if (!loggedInUser?.uid) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    setDeletingIndex(indexToDelete);
    try {
      const userRef = doc(db, "users", loggedInUser.uid);
      const updatedExpenses = expenses.filter((_, idx) => idx !== indexToDelete);
      await updateDoc(userRef, { expenses: updatedExpenses });
      setExpenses(updatedExpenses);
      // If deleting the row being edited, reset edit mode
      if (editingIndex === indexToDelete) {
        setEditingIndex(null);
        resetEditForm();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete transaction.");
    }
    setDeletingIndex(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Transaction History</h2>
      {expenses.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Expenses</th>
              <th>Amount (₹)</th>
              <th>Category</th>
              <th>Date</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) =>
              editingIndex === index ? (
                <tr key={exp.createdAt || index}>
                  <td>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      disabled={saving}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={editFormData.amount}
                      onChange={handleEditChange}
                      disabled={saving}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      disabled={saving}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="date"
                      value={editFormData.date}
                      onChange={handleEditChange}
                      disabled={saving}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="note"
                      value={editFormData.note}
                      onChange={handleEditChange}
                      disabled={saving}
                    />
                  </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleSaveEdit}
                      disabled={saving}
                      className="me-2"
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleEdit(index)}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ) : (
                <tr key={exp.createdAt || index}>
                  <td>{exp.title}</td>
                  <td>₹{parseFloat(exp.amount).toFixed(2)}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                  <td>{exp.note}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => toggleEdit(index)}
                      className="me-2"
                      disabled={deletingIndex === index}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      disabled={deletingIndex === index}
                    >
                      {deletingIndex === index ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionsList;



