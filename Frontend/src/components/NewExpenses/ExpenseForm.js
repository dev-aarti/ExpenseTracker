import { useEffect, useState } from "react";
import "./ExpenseForm.css";
const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      price: enteredAmount,
      date: enteredDate,
    };

    props.onSaveExpenseData(expenseData);
    console.log(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  useEffect(() => {
    if (props.expenseToEdit) {
      setEnteredTitle(props.expenseToEdit.title || "");
      setEnteredAmount(props.expenseToEdit.price || "");
      setEnteredDate(
        props.expenseToEdit.date ? props.expenseToEdit.date.slice(0, 10) : ""
      );
    }
  }, [props.expenseToEdit]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const expenseData = {
      id: props.expenseToEdit.id,
      title: enteredTitle,
      price: enteredAmount,
      date: enteredDate,
    };
    props.onUpdateExpense(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            value={enteredAmount}
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={enteredDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="buttons">
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
        <div className="new-expense__actions">
          <button type="submit" onClick={handleUpdate}>
            Update Expense
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
