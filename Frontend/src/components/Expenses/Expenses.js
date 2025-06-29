import ExpenseItems from "./ExpenseItems";
import "./Expenses.css";
const Expenses = (props) => {
  const items = Array.isArray(props.item) ? props.item : [];
  return (
    <div className="expenses">
      {items.map((expense) => (
        <ExpenseItems
          key={expense.id}
          date={expense.date}
          title={expense.title}
          price={expense.price}
          onEdit={() => props.onEditExpense(expense)}
          onDelete={() => {
            console.log("Deleting id:", expense.id); // <-- Add this
            props.onDeleteExpense(expense.id);
          }}
        />
      ))}
    </div>
  );
};
export default Expenses;
