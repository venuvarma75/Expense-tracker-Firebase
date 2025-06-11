import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Configuration/Config';

const useCurrentMonthExpenses = (userId) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentMonthExpenses = async () => {
      if (!userId) return;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const allExpenses = userSnap.data().expenses || [];
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const currentExpenses = allExpenses.filter(exp => {
          const date = new Date(exp.date);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        setExpenses(currentExpenses);
      }

      setLoading(false);
    };

    fetchCurrentMonthExpenses();
  }, [userId]);

  return { expenses, loading };
};

export default useCurrentMonthExpenses;
