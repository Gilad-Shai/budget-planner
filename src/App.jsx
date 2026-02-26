import React from 'react';
import { BudgetProvider } from './context/BudgetContext';
import SetBudget from './components/SetBudget';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import './App.css';

function App() {
  return (
    <BudgetProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>💰 Monthly Budget Tracker</h1>
          <p>Track your expenses and manage your budget</p>
        </header>
        <main className="app-main">
          <div className="left-panel">
            <SetBudget />
            <BudgetSummary />
          </div>
          <div className="right-panel">
            <AddExpense />
            <ExpenseList />
          </div>
        </main>
      </div>
    </BudgetProvider>
  );
}

export default App;