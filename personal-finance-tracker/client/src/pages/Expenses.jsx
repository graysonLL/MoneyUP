import React, { useState, useEffect } from "react";
import ExpenseTrendChart from "../components/expenses/ExpenseTrendChart";
import ExpenseModal from "../components/expenses/ExpenseModal";
import "../styles/Expenses.css";
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Expenses({ isSidebarOpen }) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/expense/user/${user.id}`);
        setExpenses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch expenses');
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user.id]);

  const handleModalSubmit = async (expenseData) => {
    try {
      if (selectedExpense) {
        // Update existing expense
        console.log('Updating expense with data:', expenseData);
        const response = await axios.put(
          `http://localhost:3001/api/expense/${selectedExpense.expense_id}`,
          {
            ...expenseData,
            user_id: user.id
          }
        );
        console.log('Update response:', response.data);
        setExpenses(prevExpenses =>
          prevExpenses.map(expense =>
            expense.expense_id === selectedExpense.expense_id ? response.data : expense
          )
        );
      } else {
        // Create new expense - Fixed URL
        console.log('Creating new expense with data:', expenseData);
        const response = await axios.post(
          `http://localhost:3001/api/expense`, // Removed /user/${user.id}
          {
            ...expenseData,
            user_id: user.id
          }
        );
        console.log('Create response:', response.data);
        setExpenses(prevExpenses => [response.data, ...prevExpenses]);
      }
      setIsModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: expenseData,
        endpoint: error.config?.url
      });
      
      let errorMessage = 'Failed to save expense';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense entry?')) {
      try {
        await axios.delete(`http://localhost:3001/api/expense/${expenseId}`);
        setExpenses(prevExpenses => 
          prevExpenses.filter(expense => expense.expense_id !== expenseId)
        );
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={`expenses-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="expenses-container">
        <div className="expenses-header">
          <h1>Expenses</h1>
          <button 
            className="add-expenses-btn" 
            onClick={() => {
              setSelectedExpense(null);
              setIsModalOpen(true);
            }}
          >
            + Add Expense
          </button>
        </div>

        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExpense(null);
          }}
          onSubmit={handleModalSubmit}
          initialData={selectedExpense}
        />

        <div className="expenses-table-container">
          {expenses.length === 0 ? (
            <div className="no-expenses-message">
              <p>No expense entries found. Click the "Add Expense" button to add your first expense.</p>
            </div>
          ) : (
            <>
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((expense) => (
                    <tr key={expense.expense_id}>
                      <td className="amount">₱{Number(expense.amount).toFixed(2)}</td>
                      <td>{expense.description}</td>
                      <td>{expense.category.name}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(expense)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(expense.expense_id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="expenses-pagination">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className={`expenses-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                >
                  Previous
                </button>

                <div className="expenses-pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`expenses-pagination-number ${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`expenses-pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <ExpenseTrendChart userId={user.id} expenses={expenses} />
      </div>
    </div>
  );
}

export default Expenses;
