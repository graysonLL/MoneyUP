// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.category} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
