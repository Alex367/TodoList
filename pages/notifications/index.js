import NotificationList from "@/components/NotificationList";
import { useSelector } from "react-redux";
import classes from "./notification.module.css";
import { useFetchDataHook } from "@/store/fetch-hook";
import NoDataHelper from "@/lib/noData";

export default function NotificationComponent() {
  const expitedItems = useSelector((state) => state.toggleModal.expiredTasks);
  const loadingData = useFetchDataHook();

  return (
    <section className={`section_main ${classes.section_notification}`}>
      <h1 className="section_header">Expired Tasks:</h1>
      {!loadingData ? (
        expitedItems.length === 0 ? (
          <NoDataHelper />
        ) : (
          <NotificationList data={expitedItems} />
        )
      ) : (
        <p className="loading">Loading...</p>
      )}
    </section>
  );
}
