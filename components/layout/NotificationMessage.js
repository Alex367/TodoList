import classes from "./NotificationMessage.module.css";
import ReactDOM from "react-dom";

export default function NotificationMessage(props) {
  const { value, message } = props.message;

  let styles = "";
  if (!value) {
    return;
  } else if (value === "success") {
    styles = classes.success;
  } else if (value === "failed") {
    styles = classes.failed;
  }

  const cssStyles = `${classes.notification_ul} ${styles}`;

  return (
    <>
      {ReactDOM.createPortal(
        <ul className={cssStyles}>
          <li>{message}</li>
        </ul>,
        document.getElementById("notify-root")
      )}
    </>
  );
}
