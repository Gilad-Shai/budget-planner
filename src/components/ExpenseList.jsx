import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function ExpenseList() {
  const { expenses, removeExpense } = useContext(BudgetContext);

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2>Expenses</h2>
        <p className="empty-message">No expenses logged yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Expenses</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-info">
              <span className="expense-name">{expense.name}</span>
              <span className="expense-category">{expense.category}</span>
            </div>
            <div className="expense-right">
              <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              <button
                className="remove-btn"
                onClick={() => removeExpense(expense.id)}
                aria-label="Remove expense"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}