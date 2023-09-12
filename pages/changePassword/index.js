import { useEffect, useRef, useState } from "react";
import classes from "./changePassword.module.css";
import NotificationMessage from "@/components/layout/NotificationMessage";
import { useFetchDataHook } from "@/store/fetch-hook";

export default function ChangePasswordPage() {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const loadingData = useFetchDataHook();
  const [isNotification, setIsNotification] = useState({
    value: null,
    message: null,
  });

  useEffect(() => {
    if (isNotification.value && isNotification.message) {
      const timer = setTimeout(() => {
        setIsNotification({ value: null, message: null });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isNotification]);

  const changePasswordSubmitHandler = async (event) => {
    event.preventDefault();

    const oldPasswordInput = oldPasswordInputRef.current.value;
    const newPasswordInput = newPasswordInputRef.current.value;

    const response = await fetch("/api/changePassword", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // console.log("Password is changed");
      oldPasswordInputRef.current.value = "";
      newPasswordInputRef.current.value = "";
      setIsNotification({
        value: "success",
        message: "Password is changed successfully",
      });
    }

    if (!response.ok) {
      setIsNotification({
        value: "failed",
        message: "Something went wrong, please try again",
      });
    }
  };

  return (
    <section className={`${classes.section_change_password} section_main`}>
      {!loadingData ? (
        <div className={classes.section_change_password_container}>
          <h1 className='section_header'>Change password</h1>
          <form className={`${classes.change_password_container} login_form`} onSubmit={changePasswordSubmitHandler}>
            <div className="login_form_password">
              <label htmlFor="old_password">Old password</label>
              <input
                type="password"
                id="old_password"
                name="old_password"
                placeholder="Old password"
                ref={oldPasswordInputRef}
              />
            </div>
            <div className="login_form_password">
              <label htmlFor="new_password">New password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                placeholder="New password"
                ref={newPasswordInputRef}
              />
            </div>
            <div className="login_form_buttons">
              <button className="btn-main btn-login">Change Password</button>
            </div>
          </form>
          {isNotification && <NotificationMessage message={isNotification} />}
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </section>
  );
}
