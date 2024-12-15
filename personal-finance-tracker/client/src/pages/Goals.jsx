import React, { useState, useEffect } from "react";
import "../styles/Goals.css";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import GoalModal from "../components/goals/GoalModal";

const Goals = ({ isSidebarOpen }) => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [summary, setSummary] = useState({
    currentBalance: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [fundInputs, setFundInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch goals
        const goalsResponse = await axios.get(
          `http://localhost:3001/api/goals/user/${user.id}`
        );
        setGoals(goalsResponse.data);

        // Fetch financial data for current balance
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/income/user/${user.id}`),
          axios.get(`http://localhost:3001/api/expense/user/${user.id}`),
        ]);

        const incomes = incomeRes.data;
        const expenses = expenseRes.data;

        const totalIncome = incomes.reduce(
          (sum, income) => sum + Number(income.amount),
          0
        );
        const totalExpenses = expenses.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );

        const currentBalance = totalIncome - totalExpenses;

        setSummary({
          currentBalance,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleGoalSubmit = async (goalData) => {
    try {
      if (selectedGoal) {
        const response = await axios.put(
          `http://localhost:3001/api/goals/${selectedGoal.goal_id}`,
          { ...goalData, user_id: user.id }
        );
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.goal_id === selectedGoal.goal_id ? response.data : goal
          )
        );
      } else {
        const response = await axios.post(
          `http://localhost:3001/api/goals`,
          { ...goalData, user_id: user.id }
        );
        setGoals((prevGoals) => [response.data, ...prevGoals]);
      }
      setIsModalOpen(false);
      setSelectedGoal(null);
    } catch (error) {
      console.error("Failed to save goal:", error);
      alert("Failed to save goal");
    }
  };

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await axios.delete(`http://localhost:3001/api/goals/${goalId}`);
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.goal_id !== goalId));
      } catch (error) {
        console.error("Failed to delete goal:", error);
        alert("Failed to delete goal");
      }
    }
  };

  const handleAddFunds = async (goalId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (numAmount > summary.currentBalance) {
      alert("Insufficient balance");
      return;
    }

    try {
      const goal = goals.find((g) => g.goal_id === goalId);
      const updatedGoal = {
        ...goal,
        currentAmount: (goal.currentAmount || 0) + numAmount,
      };

      // Create an expense for the funds added to goal
      await axios.post(`http://localhost:3001/api/expense`, {
        user_id: user.id,
        amount: numAmount,
        category: "Goal Funding",
        description: `Funds added to goal: ${goal.name}`,
      });

      // Update the goal in the backend
      const response = await axios.put(
        `http://localhost:3001/api/goals/${goalId}`,
        updatedGoal
      );

      // Update local states
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.goal_id === goalId ? response.data : g))
      );
      setSummary((prev) => ({
        ...prev,
        currentBalance: prev.currentBalance - numAmount,
      }));

      // Clear the input
      setFundInputs((prev) => ({ ...prev, [goalId]: "" }));
    } catch (error) {
      console.error("Failed to add funds:", error);
      alert("Failed to add funds");
    }
  };

  // Handle input change for fund amounts
  const handleFundInputChange = (goalId, value) => {
    setFundInputs(prev => ({
      ...prev,
      [goalId]: value
    }));
  };

  const handleMarkAchieved = async (goal) => {
    const updatedGoal = { ...goal, achieved: true };
    try {
      const response = await axios.put(
        `http://localhost:3001/api/goals/${goal.goal_id}`,
        updatedGoal
      );
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.goal_id === goal.goal_id ? response.data : g))
      );
    } catch (error) {
      console.error("Failed to mark goal as achieved:", error);
    }
  };

  return (
    <div className={`goals-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="goals-container">
        <div className="goals-header">
          <h1>Financial Goals</h1>
          <div className="goals-header-right">
            <div className="current-balance">
              <span className="balance-label">Current Balance:</span>
              <span className="balance-amount">
                ₱
                {summary.currentBalance.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <button className="add-goal-btn" onClick={() => setIsModalOpen(true)}>
              + Add Goal
            </button>
          </div>
        </div>

        <div className="goals-grid">
          {goals?.map((goal) => (
            <div key={goal.goal_id} className={`goal-card ${goal.achieved ? "achieved" : ""}`}>
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <div className="goal-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditGoal(goal)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteGoal(goal.goal_id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <span className="goal-date">
                Target: {new Date(goal.targetDate).toLocaleDateString()}
              </span>
              <div className="goal-progress-container">
                <div className="goal-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${((goal.currentAmount || 0) / (goal.targetAmount || 1)) * 100}%` }}
                  />
                </div>
                <span className="progress-text">
                  {((goal.currentAmount || 0) / (goal.targetAmount || 1) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="goal-amounts">
                <div className="amount-item">
                  <span className="amount-label">Current</span>
                  <span className="amount-value current">
                    ₱{(goal.currentAmount || 0).toLocaleString()}
                  </span>
                </div>
                <div className="amount-item">
                  <span className="amount-label">Target</span>
                  <span className="amount-value target">
                    ₱{(goal.targetAmount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              {summary.currentBalance > 0 && goal.currentAmount < goal.targetAmount && !goal.achieved && (
                <div className="add-funds-form">
                  <input
                    type="number"
                    placeholder="Amount to add"
                    min="0"
                    max={Math.min(summary.currentBalance, goal.targetAmount - (goal.currentAmount || 0))}
                    value={fundInputs[goal.goal_id] || ''}
                    onChange={(e) => handleFundInputChange(goal.goal_id, e.target.value)}
                  />
                  <button
                    className="add-funds-btn"
                    onClick={() => handleAddFunds(goal.goal_id, fundInputs[goal.goal_id])}
                    disabled={!fundInputs[goal.goal_id] || parseFloat(fundInputs[goal.goal_id]) <= 0}
                  >
                    Add Funds
                  </button>
                </div>
              )}
              {goal.currentAmount >= goal.targetAmount && !goal.achieved ? (
                <button
                  className="mark-achieved-btn"
                  onClick={() => handleMarkAchieved(goal)}
                >
                  Mark Goal as Achieved 🎉
                </button>
              ) : goal.achieved ? (
                <div className="achievement-badge">
                  <span>🏆 Goal Achieved!</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <GoalModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedGoal(null);
          }}
          onSubmit={handleGoalSubmit}
          initialData={selectedGoal}
        />
      </div>
    </div>
  );
};

export default Goals;
