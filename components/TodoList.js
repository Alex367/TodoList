import TodoItem from "./TodoItem";
import classes from './TodoList.module.css'

export default function TodoList(props) {
  return (
    <ul className={classes.todo_list}>
      {props.data.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
          author={item.author}
        />
      ))}
    </ul>
  );
}
