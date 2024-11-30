import React from "react";
import "../../styles/RecentUpdates.css";

const RecentUpdates = () => {
  const transactions = [
    {
      type: "expense",
      amount: 1000.0,
      description: "CAriz sdf",
      category: "Utilities",
      date: "11/30/2024",
      time: "10:18 AM",
    },
    {
      type: "income",
      amount: 5000.0,
      description: "Salary",
      category: "Work",
      date: "11/29/2024",
      time: "09:00 AM",
    },
    {
      type: "expense",
      amount: 750.0,
      description: "Groceries",
      category: "Food",
      date: "11/28/2024",
      time: "03:45 PM",
    },
    {
      type: "expense",
      amount: 2500.0,
      description: "Rent Payment",
      category: "Housing",
      date: "11/28/2024",
      time: "10:00 AM",
    },
    {
      type: "income",
      amount: 2000.0,
      description: "Freelance Work",
      category: "Side Income",
      date: "11/27/2024",
      time: "02:30 PM",
    },
    {
      type: "expense",
      amount: 300.0,
      description: "Internet Bill",
      category: "Utilities",
      date: "11/26/2024",
      time: "11:20 AM",
    },
    {
      type: "expense",
      amount: 1500.0,
      description: "Phone Bill",
      category: "Utilities",
      date: "11/25/2024",
      time: "04:15 PM",
    },
    {
      type: "income",
      amount: 3000.0,
      description: "Project Payment",
      category: "Work",
      date: "11/24/2024",
      time: "01:00 PM",
    },
    {
      type: "expense",
      amount: 800.0,
      description: "Restaurant",
      category: "Food",
      date: "11/23/2024",
      time: "08:45 PM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
    {
      type: "expense",
      amount: 1200.0,
      description: "Electric Bill",
      category: "Utilities",
      date: "11/22/2024",
      time: "09:30 AM",
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(7);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
          {currentTransactions.map((transaction, index) => (
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

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="current-page">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentUpdates;
