import React, { useState, useEffect } from 'react';
import { db } from '../../Configuration/Config';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  getDocs,
} from "firebase/firestore";

const PAGE_SIZE = 5;

const PaginatedExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCursors, setPageCursors] = useState([]); // Stores last visible docs per page
  const [currentPage, setCurrentPage] = useState(0);

  const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
  const userId = loggedInUser?.uid;

  useEffect(() => {
    if (userId) fetchPage(0);
  }, [userId]);

  const fetchPage = async (pageNumber) => {
    if (!userId) return;
    setLoading(true);

    const expensesRef = collection(db, "expenses", userId, "expenses");
    let q;

    if (pageNumber === 0) {
      // First page
      q = query(expensesRef, orderBy("date", "desc"), limit(PAGE_SIZE));
    } else if (pageNumber > currentPage) {
      // Next page, use startAfter cursor
      const lastDoc = pageCursors[pageCursors.length - 1];
      if (!lastDoc) {
        setLoading(false);
        return;
      }
      q = query(expensesRef, orderBy("date", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
    } else if (pageNumber < currentPage) {
      // Previous page, use endBefore cursor + reverse query
      const prevPageCursor = pageCursors[pageNumber - 1]; // cursor of page before prev page
      q = query(
        expensesRef,
        orderBy("date", "asc"),
        endBefore(prevPageCursor),
        limit(PAGE_SIZE)
      );
    }

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      let docs = snapshot.docs;
      if (pageNumber < currentPage) {
        // Since query is reversed for prev page, reverse docs back for display
        docs = docs.reverse();
      }
      setExpenses(docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Manage cursors
      if (pageNumber > currentPage) {
        // Add last visible doc cursor when going forward
        setPageCursors(prev => [...prev, docs[docs.length - 1]]);
      } else if (pageNumber < currentPage) {
        // Remove last cursor if going back
        setPageCursors(prev => prev.slice(0, pageNumber));
      } else if (pageNumber === 0) {
        // Reset cursors on first page
        setPageCursors([docs[docs.length - 1]]);
      }

      setCurrentPage(pageNumber);
    } else {
      // No docs found, might want to handle edge cases
      if (pageNumber < currentPage) {
        // Remove last cursor on failed prev fetch
        setPageCursors(prev => prev.slice(0, pageNumber));
        setCurrentPage(pageNumber);
      }
    }

    setLoading(false);
  };

  const fetchNextPage = () => {
    fetchPage(currentPage + 1);
  };

  const fetchPrevPage = () => {
    if (currentPage === 0) return;
    fetchPage(currentPage - 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>📄 Paginated Expenses</h3>
      {loading && <p>Loading...</p>}
      {!loading && expenses.length === 0 && <p>No expenses found.</p>}

      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            📝 {exp.description} — ₹{exp.amount} — 📅{" "}
            {exp.date?.toDate ? exp.date.toDate().toLocaleDateString() : exp.date || "Invalid Date"}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '15px' }}>
        <button onClick={fetchPrevPage} disabled={loading || currentPage === 0}>
          ⬅ Prev
        </button>
        <button onClick={fetchNextPage} disabled={loading || expenses.length < PAGE_SIZE}>
          Next ➡
        </button>
      </div>
      <p>Page: {currentPage + 1}</p>
    </div>
  );
};

export default PaginatedExpenses;
