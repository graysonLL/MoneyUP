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
      // Validate the data before sending
      if (!goalData.name || !goalData.targetAmount) {
        alert("Please fill in all required fields");
        return;
      }

      // Format the data to match our schema
      const formattedData = {
        name: goalData.name,
        target_amount: parseFloat(goalData.targetAmount).toString(), // Convert to string for Decimal
        deadline: goalData.targetDate ? new Date(goalData.targetDate).toISOString() : null,
        user_id: user.id
      };

      if (selectedGoal) {
        const response = await axios.put(
          `http://localhost:3001/api/goals/${selectedGoal.goal_id}`,
          formattedData
        );
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.goal_id === selectedGoal.goal_id ? response.data : goal
          )
        );
      } else {
        const response = await axios.post(
          `http://localhost:3001/api/goals`,
          formattedData
        );
        setGoals((prevGoals) => [response.data, ...prevGoals]);
      }
      setIsModalOpen(false);
      setSelectedGoal(null);
    } catch (error) {
      console.error("Failed to save goal:", error);
      alert("Failed to save goal: " + error.response?.data?.details || error.message);
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

  const handleMarkAchieved = async (goal) => {
    try {
      // Mark goal as achieved - the controller will handle expense creation
      const response = await axios.put(
        `http://localhost:3001/api/goals/${goal.goal_id}`,
        { 
          ...goal, 
          achieved: true,
          user_id: user.id  // Make sure to send user_id for the expense creation
        }
      );

      // Update local states
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.goal_id === goal.goal_id ? response.data : g))
      );
      setSummary((prev) => ({
        ...prev,
        currentBalance: prev.currentBalance - parseFloat(goal.target_amount),
      }));
    } catch (error) {
      console.error("Failed to mark goal as achieved:", error);
      alert("Failed to mark goal as achieved");
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
                    disabled={goal.achieved}
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
                Target: {new Date(goal.deadline).toLocaleDateString()}
              </span>
              <div className="goal-progress-container">
                <div className="goal-progress">
                  <div
                    className="progress-bar"
                    style={{ 
                      width: `${goal.achieved ? 100 : Math.min((summary.currentBalance / parseFloat(goal.target_amount)) * 100, 100)}%` 
                    }}
                  />
                </div>
                <span className="progress-text">
                  {goal.achieved ? 100 : Math.min((summary.currentBalance / parseFloat(goal.target_amount)) * 100, 100).toFixed(1)}%
                </span>
              </div>
              <div className="goal-amounts">
                <div className="amount-item">
                  <span className="amount-label">Available</span>
                  <span className="amount-value current">
                    ₱{summary.currentBalance.toLocaleString()}
                  </span>
                </div>
                <div className="amount-item">
                  <span className="amount-label">Target</span>
                  <span className="amount-value target">
                    ₱{parseFloat(goal.target_amount).toLocaleString()}
                  </span>
                </div>
              </div>
              {summary.currentBalance >= parseFloat(goal.target_amount) && !goal.achieved ? (
                <button
                  className="mark-achieved-btn"
                  onClick={() => handleMarkAchieved(goal)}
                >
                  Mark Goal as Achieved 🎉
                </button>
              ) : goal.achieved ? (
                <div className="achievement-badge">
                  <span>🏆 Goal Achieved!</span>
                  {goal.achieved_at && (
                    <span className="achieved-date">
                      on {new Date(goal.achieved_at).toLocaleDateString()}
                    </span>
                  )}
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
