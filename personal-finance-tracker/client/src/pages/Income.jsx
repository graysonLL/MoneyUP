import React, { useState } from "react";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import "../styles/Income.css";

function Income({ isSidebarOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const incomeData = [
    {
      amount: "+₱200.00",
      description: "dfgh",
      category: "Business",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
    {
      amount: "+₱5,000.00",
      description: "Initial Balance",
      category: "Investments",
      date: "11/30/2024",
    },
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incomeData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incomeData.length / itemsPerPage);

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
      className={`income-content-wrapper ${
        !isSidebarOpen ? "sidebar-closed" : ""
      }`}
    >
      <div className="income-container">
        <div className="income-header">
          <h1>Income</h1>
          <button className="add-income-btn">+ Add Income</button>
        </div>

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
              {currentItems.map((income, index) => (
                <tr key={index}>
                  <td className="amount">{income.amount}</td>
                  <td>{income.description}</td>
                  <td>{income.category}</td>
                  <td>{income.date}</td>
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
        <IncomeTrendChart />
      </div>
    </div>
  );
}

export default Income;
