import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./DetailCart.module.css";
import { useDispatch } from "react-redux";
import { getDataDB, toggleActions } from "@/store/modal-redux";
import { useSelector } from "react-redux";

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();
  const taskDateRef = useRef();
  const taskAuthorRef = useRef();

  const dispatch = useDispatch();
  const openedItem = useSelector((state) => state.toggleModal.openedItem);

  const submitHandler = (event) => {
    event.preventDefault();

    let taskData = {
      title: taskNameRef.current.value,
      description: taskDescriptionRef.current.value,
      date: taskDateRef.current.value,
      author: taskAuthorRef.current.value,
    };

    if (!openedItem) {
      fetch("/api/task/", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            dispatch(
              toggleActions.notificationTaskHandler({
                value: "success",
                message: "Card is created successfully",
              })
            );
            return response.json();
          }
          throw new Error("failed");
        })
        .then((data) => dispatch(getDataDB()))
        .catch((error) => {
          dispatch(
            toggleActions.notificationTaskHandler({
              value: error,
              message: "Creation of card is failed",
            })
          );
        });

      props.onConfirm();
    } else {
      taskData = { ...taskData, id: props.id };
      fetch("/api/task/", {
        method: "PUT",
        body: JSON.stringify(taskData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            dispatch(
              toggleActions.notificationTaskHandler({
                value: "success",
                message: "Card is changed successfully",
              })
            );
            return response.json();
          }
          throw new Error("failed");
        })
        .then((data) => dispatch(getDataDB()))
        .catch((error) => {
          dispatch(
            toggleActions.notificationTaskHandler({
              value: error,
              message: "Edition of card is failed",
            })
          );
        });
      dispatch(toggleActions.closeDirectTask());
    }
  };

  return (
    <form className={classes.modal} onSubmit={submitHandler}>
      <h2>{props.title ? "Change the task" : "Create a new task"}</h2>
      <div className={classes.modal_first_block}>
        <input
          type="text"
          placeholder="Task name here..."
          name="task_name"
          id="task_name"
          defaultValue={props.title}
          ref={taskNameRef}
          required
        />
        <textarea
          id="task_description"
          name="task_description"
          rows="5"
          cols="33"
          placeholder="Description"
          defaultValue={props.description}
          ref={taskDescriptionRef}
        ></textarea>
      </div>
      <div className={classes.modal_second_block}>
        <div className={classes.modal_second_block_items}>
          <input
            type="date"
            id="task_date"
            name="task_date"
            min="2018-01-01"
            max="2118-12-31"
            defaultValue={props.date}
            ref={taskDateRef}
            required
          />

          <input
            type="text"
            placeholder="Assign to"
            name="task_assign"
            id="task_assign"
            defaultValue={props.author}
            ref={taskAuthorRef}
            required
          />
        </div>
        <div className={classes.modal_second_block_items}>
          <button
            className="btn-main detail_cart detail_cart_cancel"
            onClick={props.onConfirm}
            type="button"
          >
            Cancel
          </button>
          <button className="btn-main detail_cart">
            {props.title ? "Change task" : "Create task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default function DetailCart(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
