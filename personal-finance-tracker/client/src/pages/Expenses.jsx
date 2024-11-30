import React, { useState } from "react";
import "../styles/Expenses.css";

function Expenses() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const expenseData = [
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
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenseData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenseData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="expense-container">
      <div className="expense-header">
        <h1>Expenses</h1>
        <button className="add-expense-btn">+ Add Expense</button>
      </div>

      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((expense, index) => (
              <tr key={index}>
                <td className="amount">{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="expense-pagination">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className={`expense-pagination-btn ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </button>

        <div className="expense-pagination-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`expense-pagination-number ${
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
          className={`expense-pagination-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Expenses;
