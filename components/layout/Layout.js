import classes from "./Layout.module.css";
import { useSession } from "next-auth/react";
import Navigation from "./Navigation";
import FooterComponent from "../FooterComponent";

export default function Layout(props) {
  const { data: session, status } = useSession();

  return (
    <div className={classes.main_container}>
      <header>{session && <Navigation />}</header>
      <main>{props.children}</main>
      <FooterComponent />
    </div>
  );
}
