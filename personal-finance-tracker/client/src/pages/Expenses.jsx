import React, { useState, useEffect } from "react";
import ExpenseTrendChart from "../components/expenses/ExpenseTrendChart";
import ExpenseModal from "../components/expenses/ExpenseModal";
import "../styles/Expenses.css";
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';

function Expenses({ isSidebarOpen }) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchExpenses = async () => {
    if (!user?.id) {
      console.log('No user ID available');
      return;
    }

    try {
      console.log('Fetching expenses for user:', user.id);
      const response = await axios.get(`http://localhost:3001/api/expense/user/${user.id}`);
      console.log('Received expenses:', response.data);
      setExpenses(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to fetch expenses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  const handleModalSubmit = async (newExpense) => {
    console.log('New expense added:', newExpense);
    await fetchExpenses(); // Fetch fresh data after adding new expense
    setIsModalOpen(false);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className={`expenses-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
        <div className="expenses-container">
          <div className="expenses-header">
            <h1>Expenses</h1>
          </div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`expenses-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="expenses-container">
        <div className="expenses-header">
          <h1>Expenses</h1>
          <button className="add-expenses-btn" onClick={() => setIsModalOpen(true)}>
            Add Expense
          </button>
        </div>

        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />

        {expenses.length === 0 ? (
          <div className="no-expenses-message">No expenses found. Add some expenses to see them here!</div>
        ) : (
          <div className="expenses-table-container">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((expense) => (
                  <tr key={expense.expense_id}>
                    <td className="amount">-₱{Number(expense.amount).toFixed(2)}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category.name}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {expenses.length > itemsPerPage && (
          <div className="expenses-pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`expenses-pagination-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              Previous
            </button>
            <div className="expenses-pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`expenses-pagination-number ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`expenses-pagination-btn ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              Next
            </button>
          </div>
        )}

        <ExpenseTrendChart userId={user?.id} expenses={expenses} />
      </div>
    </div>
  );
}

export default Expenses;
