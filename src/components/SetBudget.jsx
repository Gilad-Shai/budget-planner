import { useState, useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function SetBudget() {
  const { budget, setBudget } = useContext(BudgetContext);
  const [inputValue, setInputValue] = useState(budget || "");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) {
      setMessage("Please enter a valid positive number.");
      return;
    }
    setBudget(parsed);
    setMessage(`Budget set to $${parsed.toFixed(2)}`);
  };

  return (
    <div className="card">
      <h2>Set Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter budget amount"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setMessage("");
          }}
          required
        />
        <button type="submit">Set Budget</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}