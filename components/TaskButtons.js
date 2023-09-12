import { getDataDB } from "@/store/modal-redux";
import classes from "./TaskButtons.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function TaskButton(props) {
  const dispatch = useDispatch();
  const reduxItems = useSelector((state) => state.toggleModal.checkedItems);

  const removeItemHandler = async () => {
    const response = await fetch("/api/task/", {
      method: "DELETE",
      body: JSON.stringify(reduxItems),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(getDataDB());
    }
  };

  return (
    <>
      <div className={classes.home_add_task_container}>
        {reduxItems.length > 0 ? (
          <button className="btn-main" onClick={removeItemHandler}>
            {reduxItems.length === 1 ? "Remove task" : "Remove tasks"}
          </button>
        ) : (
          <button className="btn-main" onClick={props.onConfirm}>
            Add task
          </button>
        )}
      </div>
    </>
  );
}
