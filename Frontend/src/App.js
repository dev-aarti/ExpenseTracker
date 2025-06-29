import { useEffect, useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpenses/NewExpense";
let Dummy_EXPENSES = [];
const App = () => {
  const [expenses, setExpenses] = useState(Dummy_EXPENSES);

  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
  };

  function fetchData() {
    fetch("http://localhost:8081/records")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addExpenseHandler = (expense) => {
    const updateExpenses = [expense, ...expenses];
    setExpenses(updateExpenses);
    fetch("http://localhost:8081/records", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      fetchData();
    });
  };

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:8081/records/${id}`, {
      method: "DELETE",
    }).then(() => {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    });
  };

  const handleUpdateExpense = (updatedExpense) => {
    fetch(`http://localhost:8081/records/${updatedExpense.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    })
      .then((response) => response.json())
      .then(() => {
        setExpenses((prev) =>
          prev.map((exp) =>
            exp.id === updatedExpense.id ? updatedExpense : exp
          )
        );
        setExpenseToEdit(null); // Clear the form after update
      });
  };
  return (
    <div>
      <NewExpense
        onAddExpense={addExpenseHandler}
        expenseToEdit={expenseToEdit}
        onUpdateExpense={handleUpdateExpense}
      />
      <Expenses
        item={expenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />
    </div>
  );
};

export default App;
