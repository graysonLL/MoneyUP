import React, { useState, useEffect } from "react";
import "../../styles/GoalModal.css";

function GoalModal({ isOpen, onClose, onSubmit, initialData }) {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setGoalName(initialData.name || "");
      setTargetAmount(initialData.targetAmount || "");
      setCurrentAmount(initialData.currentAmount || "");
      setTargetDate(
        initialData.targetDate
          ? new Date(initialData.targetDate).toISOString().split("T")[0]
          : ""
      );
    } else {
      setGoalName("");
      setTargetAmount("");
      setCurrentAmount("");
      setTargetDate("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!goalName || !targetAmount || !targetDate) {
      alert("Please fill in all required fields (Goal Name, Target Amount, Target Date).");
      return;
    }

    const goalData = {
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0, // Default to 0 if not provided
      targetDate,
    };

    onSubmit(goalData);
  };

  if (!isOpen) return null;

  return (
    <div className="goal-modal-backdrop">
      <div className="goal-modal">
        <div className="goal-modal-header">
          <h2>{initialData ? "Edit Goal" : "Add Goal"}</h2>
          <button className="goal-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="goal-modal-form" onSubmit={handleSubmit}>
          <div className="goal-modal-field">
            <label htmlFor="goal-name">Goal Name*</label>
            <input
              id="goal-name"
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="Enter goal name"
              required
            />
          </div>

          <div className="goal-modal-field">
            <label htmlFor="target-amount">Target Amount (₱)*</label>
            <input
              id="target-amount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Enter target amount"
              step="0.01"
              required
            />
          </div>

          <div className="goal-modal-field">
            <label htmlFor="current-amount">Current Amount (₱)</label>
            <input
              id="current-amount"
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              placeholder="Enter current amount (optional)"
              step="0.01"
            />
          </div>

          <div className="goal-modal-field">
            <label htmlFor="target-date">Target Date*</label>
            <input
              id="target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>

          <div className="goal-modal-actions">
            <button type="button" className="goal-modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="goal-modal-submit-btn">
              {initialData ? "Update Goal" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalModal;
