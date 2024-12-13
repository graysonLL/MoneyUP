import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Goals.css';

const Goals = ({ isSidebarOpen }) => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(5000); // This should come from your API
  const { token } = useAuth();

  const GoalModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      targetAmount: '',
      targetDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add API call here to save the goal
      onSubmit(formData);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create New Goal</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Goal Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetAmount">Target Amount (₱)</label>
              <input
                type="number"
                id="targetAmount"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetDate">Target Date</label>
              <input
                type="date"
                id="targetDate"
                name="targetDate"
                value={formData.targetDate}
                onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Create Goal</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`goals-content-wrapper ${!isSidebarOpen ? "sidebar-closed" : ""}`}>
      <div className="goals-container">
        <div className="goals-header">
          <h1>Financial Goals</h1>
          <button className="add-goal-btn" onClick={() => setIsModalOpen(true)}>
            + Add Goal
          </button>
        </div>

        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <span className="goal-date">Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
              <div className="goal-progress">
                <div 
                  className="progress-bar"
                  style={{width: `${(goal.currentAmount / goal.targetAmount) * 100}%`}}
                />
                <span className="progress-text">
                  {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="goal-amounts">
                <span>Current: ₱{goal.currentAmount.toLocaleString()}</span>
                <span>Target: ₱{goal.targetAmount.toLocaleString()}</span>
              </div>
              {currentBalance > 0 && goal.currentAmount < goal.targetAmount && (
                <div className="add-funds-form">
                  <input 
                    type="number"
                    placeholder="Amount to add"
                    min="0"
                    max={Math.min(currentBalance, goal.targetAmount - goal.currentAmount)}
                  />
                  <button className="add-funds-btn">Add Funds</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <GoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(goal) => {
            setGoals([...goals, { ...goal, id: Date.now(), currentAmount: 0 }]);
          }}
        />
      </div>
    </div>
  );
};

export default Goals;