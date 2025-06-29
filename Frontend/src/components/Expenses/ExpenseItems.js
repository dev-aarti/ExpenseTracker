import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItems.css";
const ExpenseItems = (props) => {
  // const [newTitle, setNewTitle] = useState("");

  // const [title, setTitle] = useState(props.title);

  return (
    <Card className="expense-item">
      <ExpenseDate date={new Date(props.date)} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.price}</div>
        <div
          className="expense-item__edit"
          onClick={() => {
            console.log("Edit clicked for:", props.title);
            props.onEdit();
          }}
        >
          <FaRegEdit size={30} color="white" />
        </div>
        <div className="expense-item__delete" onClick={props.onDelete}>
          <RiDeleteBin5Line size={30} color="white" />
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItems;
