import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget - totalSpent;

  const updateBudget = (amount) => {
    setBudget(parseFloat(amount));
  };

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: expense.name,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        expenses,
        totalSpent,
        remaining,
        updateBudget,
        addExpense,
        removeExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}