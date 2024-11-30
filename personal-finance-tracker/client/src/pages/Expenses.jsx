import React, { useState } from "react";
import ExpenseTrendChart from "../components/expenses/ExpenseTrendChart";
import "../styles/Expenses.css";

function Expenses({ isSidebarOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const expensesData = [
    {
      amount: "-₱200.00",
      description: "dfgh",
      category: "Business",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "-₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expensesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expensesData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Fixed: changed + to -
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      className={`expenses-content-wrapper ${
        !isSidebarOpen ? "sidebar-closed" : ""
      }`}
    >
      <div className="expenses-container">
        <div className="expenses-header">
          <h1>expenses</h1>
          <button className="add-expenses-btn">- Add expenses</button>
        </div>

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
              {currentItems.map((expenses, index) => (
                <tr key={index}>
                  <td className="amount">{expenses.amount}</td>
                  <td>{expenses.description}</td>
                  <td>{expenses.category}</td>
                  <td>{expenses.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="expenses-pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`expenses-pagination-btn ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            Previous
          </button>

          <div className="expenses-pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`expenses-pagination-number ${
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
            className={`expenses-pagination-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            Next
          </button>
        </div>
        <ExpenseTrendChart />
      </div>
    </div>
  );
}

export default Expenses;
