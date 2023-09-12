import NotificationItem from "./NotificationItem";
import classes from './NotificationList.module.css';

export default function NotificationList(props) {
  return (
    <ul className={classes.notification_list}>
      {props.data.map((item) => (
        <NotificationItem
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
