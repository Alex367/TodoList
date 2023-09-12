import { signOut } from "next-auth/react";
import Link from "next/link";
import classes from "./Navigation.module.css";
import { useSelector } from "react-redux";

export default function Navigation() {
  const expitedItems = useSelector((state) => state.toggleModal.expiredTasks);

  return (
    <nav className={classes.navbar}>
      <ul className={classes.nav_items}>
        <li className={classes.notification_item}>
          <Link href="/notifications">
            Notifications
            <span className={classes.notification_count}>
              {expitedItems.length}
            </span>
          </Link>
        </li>
        <li className={classes.notification_item}>
          <Link href="/todo">Todo</Link>
        </li>
        <li className={classes.notification_item}>
          <Link href="/changePassword">Change Password</Link>
        </li>
        <li className={classes.notification_item}>
          <button
            className="btn-main detail_cart detail_cart_cancel btn_navigation"
            onClick={() => signOut({ callbackUrl: process.env.DOMEN })}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
