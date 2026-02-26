import React, { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

const BudgetSummary = () => {
  const { budget, expenses } = useContext(BudgetContext);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget - totalSpent;
  const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;

  const getProgressBarColor = () => {
    if (percentageUsed >= 90) return "#e74c3c";
    if (percentageUsed >= 70) return "#f39c12";
    return "#2ecc71";
  };

  const getCategoryTotals = () => {
    const totals = {};
    expenses.forEach((expense) => {
      if (totals[expense.category]) {
        totals[expense.category] += expense.amount;
      } else {
        totals[expense.category] = expense.amount;
      }
    });
    return totals;
  };

  const categoryTotals = getCategoryTotals();

  return (
    <div className="card budget-summary">
      <h2>Budget Summary</h2>

      {budget === 0 ? (
        <p className="no-data">Set a budget to see your summary.</p>
      ) : (
        <>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Monthly Budget</span>
              <span className="summary-value budget-value">
                ${budget.toFixed(2)}
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Total Spent</span>
              <span className="summary-value spent-value">
                ${totalSpent.toFixed(2)}
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Remaining</span>
              <span
                className={`summary-value ${
                  remaining < 0 ? "over-budget" : "remaining-value"
                }`}
              >
                ${remaining.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Budget Used</span>
              <span>{Math.min(percentageUsed, 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(percentageUsed, 100)}%`,
                  backgroundColor: getProgressBarColor(),
                }}
              ></div>
            </div>
            {remaining < 0 && (
              <p className="over-budget-warning">
                ⚠️ You are ${Math.abs(remaining).toFixed(2)} over budget!
              </p>
            )}
          </div>

          {Object.keys(categoryTotals).length > 0 && (
            <div className="category-breakdown">
              <h3>Spending by Category</h3>
              <ul className="category-list">
                {Object.entries(categoryTotals)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => (
                    <li key={category} className="category-item">
                      <span className="category-name">{category}</span>
                      <div className="category-bar-container">
                        <div
                          className="category-bar"
                          style={{
                            width:
                              budget > 0
                                ? `${Math.min((amount / budget) * 100, 100)}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                      <span className="category-amount">
                        ${amount.toFixed(2)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetSummary;