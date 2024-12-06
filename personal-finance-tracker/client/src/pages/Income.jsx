import React, { useState, useEffect } from "react";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import IncomeModal from "../components/income/IncomeModal";
import "../styles/Income.css";
import {useAuth} from "../contexts/AuthContext";
import axios from 'axios';

function Income({ isSidebarOpen }) {
  const {user} = useAuth();
  console.log(user);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch incomes when component mounts
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/api/income/user/${user.id}`);
        setIncomes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch incomes');
        setLoading(false);
      }
    };

    fetchIncomes();
  }, []);

  const handleModalSubmit = (newIncome) => {
    setIncomes(prevIncomes => [newIncome, ...prevIncomes]);
    setIsModalOpen(false);
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
          <button className="add-income-btn" onClick={() => setIsModalOpen(true)}>
            + Add Income
          </button>
        </div>

        <IncomeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />

        <div className="income-table-container">
          <table className="income-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((income) => (
                <tr key={income.income_id}>
                  <td className="amount">₱{Number(income.amount).toFixed(2)}</td>
                  <td>{income.description}</td>
                  <td>{income.category.name}</td>
                  <td>{new Date(income.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="income-pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`income-pagination-btn ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            Previous
          </button>

          <div className="income-pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`income-pagination-number ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`income-pagination-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            Next
          </button>
        </div>
        <IncomeTrendChart userId={user.id} incomes={incomes} />
      </div>
    </div>
  );
}

export default Income;
