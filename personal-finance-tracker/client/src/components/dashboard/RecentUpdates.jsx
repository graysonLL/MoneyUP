import React, { useState, useEffect } from "react";
import "../../styles/RecentUpdates.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';

const RecentUpdates = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    sort: "latest",
  });

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [currentPage, filters, user?.id]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      console.log('User ID:', user.id);
      console.log('Request URL:', `http://localhost:3001/api/transactions/user/${user.id}`);

      if (!token) {
        throw new Error('No authentication token found');
      }

      const config = {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          type: filters.type,
          sort: filters.sort
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('Request config:', config);

      const response = await axios.get(
        `http://localhost:3001/api/transactions/user/${user.id}`,
        config
      );

      console.log('Response:', response.data);

      const { data, hasMore } = response.data;
      
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        throw new Error('Invalid data format received');
      }

      setTransactions(data);
      setHasMore(hasMore);
    } catch (err) {
      console.error('Detailed fetch error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        endpoint: err.config?.url,
        stack: err.stack
      });

      if (err.response) {
        // Server responded with an error
        setError(`Server error: ${err.response.data.error || err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('No response received from server. Please check your connection.');
      } else {
        // Error in request setup
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
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
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="updates-header">
        <h2>Recent Updates</h2>
        <div className="updates-filters">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="table-wrapper">
        {transactions.length === 0 ? (
          <div className="no-data-message">
            No transactions available. Start adding transactions to see updates here.
          </div>
        ) : (
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
                  <td className={`type-${transaction.type}`}>
                    {transaction.type}
                  </td>
                  <td className={`amount-${transaction.type}`}>
                    {transaction.type === "expense" ? "-" : "+"}₱
                    {transaction.amount.toLocaleString()}.00
                  </td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Date(transaction.date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {transactions.length > 0 && (
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
      )}
    </div>
  );  
};

export default RecentUpdates;
