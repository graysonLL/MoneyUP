import React, { useState, useEffect } from "react";
import "../../styles/RecentUpdates.css";

const RecentUpdates = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost:3001/api/transactions?page=${currentPage}&limit=${itemsPerPage}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch transactions');
      }
      
      const { data, hasMore } = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      setTransactions(data);
      setHasMore(hasMore);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recent-updates">
      <div className="updates-header">
        <h2>Recent Updates</h2>
        <div className="updates-filters">
          <select defaultValue="all">
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <select defaultValue="latest">
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <table className="updates-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className={`type-${transaction.type}`}>{transaction.type}</td>
              <td className={`amount-${transaction.type}`}>
                {transaction.type === "expense" ? "-" : "+"}₱
                {transaction.amount.toLocaleString()}.00
              </td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.date} {transaction.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="recentupdates-pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`recentupdates-pagination-btn ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </button>

        <span className="page-info">Page {currentPage}</span>

        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={`recentupdates-pagination-btn ${
            !hasMore ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentUpdates;
