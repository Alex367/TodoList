import { toggleActions } from "@/store/modal-redux";
import TodoList from "./TodoList";
import DetailCart from "./DetailCart";
import TaskButton from "./TaskButtons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NoDataHelper from "@/lib/noData";
import NotificationMessage from "./layout/NotificationMessage";
import classes from './TodoComponent.module.css';

export default function TodoComponent() {
  const reduxItems = useSelector((state) => state.toggleModal);
  const [isAddTask, setIsAddTask] = useState(false);

  const dispatch = useDispatch();
  let openedItemData;

  const addTaskHandler = () => {
    setIsAddTask((prev) => !prev);
  };

  const editCardHandler = () => {
    dispatch(toggleActions.closeDirectTask());
  };

  if (reduxItems.openedItem) {
    openedItemData = reduxItems.tasks.find(
      (item) => item.id === reduxItems.openedItem
    );
  }

  useEffect(() => {
    if (reduxItems.notificationTask) {
      const timer = setTimeout(() => {
        dispatch(toggleActions.notificationTaskHandlerClear());
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [reduxItems.notificationTask]);

  return (
    <section className='section_main'>
      <h1 className='section_header'>Todo list:</h1>
      <div>
        {reduxItems.tasks.length === 0 ? (
          <NoDataHelper />
        ) : (
          <TodoList data={reduxItems.tasks} />
        )}
        <TaskButton onConfirm={addTaskHandler} />
        {isAddTask && (
          <DetailCart
            id={null}
            title={null}
            description={null}
            date={null}
            author={null}
            onConfirm={addTaskHandler}
          />
        )}
        {openedItemData && (
          <DetailCart {...openedItemData} onConfirm={editCardHandler} />
        )}
      </div>
      {reduxItems.notificationTask && <NotificationMessage message={reduxItems.notificationTask}/>}
    </section>
  );
}
