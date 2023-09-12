import classes from "./FooterComponent.module.css";

export default function FooterComponent() {

  const currentDate = new Date().toJSON().slice(0, 10);

  return (
    <footer className={classes.footer}>
      <div className={classes.current_date}>Today: {currentDate}</div>
      <div>Copyright &#169; 2023. All rights reserved.</div>
    </footer>
  );
}
