import React, { useState, useEffect } from "react";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import IncomeModal from "../components/income/IncomeModal";
import "../styles/Income.css";
import {useAuth} from "../contexts/AuthContext";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

function Income({ isSidebarOpen }) {
  const {user} = useAuth();
  console.log(user);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const itemsPerPage = 10;

  // Fetch incomes when component mounts
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/income/user/${user.id}`);
        setIncomes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch incomes');
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [user.id]);

  const handleModalSubmit = async (incomeData) => {
    try {
      if (selectedIncome) {
        // Update existing income
        console.log('Updating income with data:', incomeData);
        const response = await axios.put(
          `http://localhost:3001/api/income/${selectedIncome.income_id}`,
          {
            ...incomeData,
            user_id: user.id
          }
        );
        console.log('Update response:', response.data);
        setIncomes(prevIncomes =>
          prevIncomes.map(income =>
            income.income_id === selectedIncome.income_id ? response.data : income
          )
        );
      } else {
        // Create new income - Fixed URL
        console.log('Creating new income with data:', incomeData);
        const response = await axios.post(
          `http://localhost:3001/api/income`,  // Removed /user/${user.id}
          {
            ...incomeData,
            user_id: user.id
          }
        );
        console.log('Create response:', response.data);
        setIncomes(prevIncomes => [response.data, ...prevIncomes]);
      }
      setIsModalOpen(false);
      setSelectedIncome(null);
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: incomeData,
        endpoint: error.config?.url
      });
      
      let errorMessage = 'Failed to save income';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
    }
  };

  const handleEdit = (income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleDelete = async (incomeId) => {
    if (window.confirm('Are you sure you want to delete this income entry?')) {
      try {
        await axios.delete(`http://localhost:3001/api/income/${incomeId}`);
        setIncomes(prevIncomes => 
          prevIncomes.filter(income => income.income_id !== incomeId)
        );
      } catch (error) {
        console.error('Delete error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        alert(`Failed to delete income: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incomes.length / itemsPerPage);

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
    <div
      className={`income-content-wrapper ${
        !isSidebarOpen ? "sidebar-closed" : ""
      }`}
    >
      <div className="income-container">
        <div className="income-header">
          <h1>Income</h1>
          <button className="add-income-btn" onClick={() => {
            setSelectedIncome(null);
            setIsModalOpen(true);
          }}>
            + Add Income
          </button>
        </div>

        <IncomeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIncome(null);
          }}
          onSubmit={handleModalSubmit}
          initialData={selectedIncome}
        />

        <div className="income-table-container">
          {incomes.length === 0 ? (
            <div className="no-income-message">
              <p>No income entries found. Click the "Add Income" button to add your first income.</p>
            </div>
          ) : (
            <>
              <table className="income-table">
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
                  {currentItems.map((income) => (
                    <tr key={income.income_id}>
                      <td className="amount">₱{Number(income.amount).toFixed(2)}</td>
                      <td>{income.description}</td>
                      <td>{income.category.name}</td>
                      <td>{new Date(income.date).toLocaleDateString()}</td>
                      <td className="actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(income)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(income.income_id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="income-pagination">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className={`income-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                >
                  Previous
                </button>

                <div className="income-pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`income-pagination-number ${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`income-pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <IncomeTrendChart userId={user.id} incomes={incomes} />
      </div>
    </div>
  );
}

export default Income;
