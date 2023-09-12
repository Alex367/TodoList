import { toggleActions } from "@/store/modal-redux";
import classes from "./TodoItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

export default function TodoItem(props) {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const expiredTasks = useSelector((state) => state.toggleModal.expiredTasks);

  const checkboxHandler = () => {
    setIsChecked((prev) => !prev);
    dispatch(toggleActions.toggleCheckedItem(props.id));
  };

  const toggleModalHandler = () => {
    dispatch(toggleActions.openDirectTask(props.id));
  };

  const checkExpiredTaskHandler = () => {
    const isExpiredTask = expiredTasks.findIndex(
      (item) => item.id === props.id
    );
    if (isExpiredTask !== -1) {
      return classes.expiredTask;
    } else {
      return "";
    }
  };

  return (
    <li className={classes.todo_items}>
      <input type="checkbox" checked={isChecked} onChange={checkboxHandler} />
      <div onClick={toggleModalHandler} className={classes.todo_items_task}>
        <div className={classes.title_task}>{props.title}</div>
        <div className={classes.description_task}>{props.description}</div>
        <ul className={classes.date_author_task}>
          <li className={checkExpiredTaskHandler()}>
            <AiOutlineCalendar />
            <span>{props.date}</span>
          </li>
          <li>
            <BsPeople />
            <span>{props.author}</span>
          </li>
        </ul>
      </div>
    </li>
  );
}
