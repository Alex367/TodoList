import { MdOutlineNotifications } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import classes from './NotificationItem.module.css'

export default function NotificationItem(props) {
  return (
    <li className={classes.notification_items}>
      <div className={classes.notification_title_items}>
        <MdOutlineNotifications />
        <div className={classes.notification_title}>{props.title}</div>
      </div>
      <div>{props.description}</div>
      <ul className={classes.notification_date_author_items}>
        <li>
          <AiOutlineCalendar />
          <span>{props.date}</span>
        </li>
        <li>
          <BsPeople />
          <span>{props.author}</span>
        </li>
      </ul>
    </li>
  );
}
