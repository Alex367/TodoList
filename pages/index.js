import { useEffect, useReducer, useRef, useState } from "react";
import classes from "./index.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import NotificationMessage from "@/components/layout/NotificationMessage";

const initialFunction = (state, action) => {
  if (action.type === "login") {
    return { loginStatus: true, registrationStatus: false };
  } else if (action.type === "registration") {
    return { loginStatus: false, registrationStatus: true };
  }

  return { loginStatus: true, registrationStatus: false };
};

export default function HomePage() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatedPasswordInputRef = useRef();
  const { push } = useRouter();
  const [isError, setIsError] = useState({ value: null, message: null });

  const [login, dispatchLogin] = useReducer(initialFunction, {
    loginStatus: true,
    registrationStatus: false,
  });

  useEffect(() => {
    if (isError.value && isError.message) {
      const timer = setTimeout(() => {
        setIsError({ value: null, message: null });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (login.loginStatus) {
      //login
      const emailInput = emailInputRef.current.value;
      const passwordInput = passwordInputRef.current.value;

      const response = await signIn("credentials", {
        redirect: false,
        email: emailInput,
        password: passwordInput,
      });

      if (response.error) {
        setIsError({
          value: "failed",
          message: "Login is failed, please try again",
        });
        return;
      }

      push("/todo");
    } else {
      //registration
      const emailInput = emailInputRef.current.value;
      const passwordInput = passwordInputRef.current.value;
      const repeatedPasswordInput = repeatedPasswordInputRef.current.value;

      const response = await fetch("/api/auth/registration/", {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          repeatedPassword: repeatedPasswordInput,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        window.location.reload();
      } else if (!response.ok) {
        setIsError({
          value: "failed",
          message: "Registration is failed, please try again",
        });
        return;
      }
    }
  };

  const switchLoginTypeHandler = () => {
    if (login.loginStatus) {
      dispatchLogin({ type: "registration" });
    } else {
      dispatchLogin({ type: "login" });
    }
  };

  return (
    <section className={classes.login_container}>
      <h1 className='section_header'>TodoList application</h1>
      {login.loginStatus ? <h2>Login</h2> : <h2>Registration</h2>}
      <form className='login_form' onSubmit={formSubmitHandler}>
        <div className='login_form_username'>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className='login_form_password'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            name="password"
            ref={passwordInputRef}
          />
        </div>
        {login.registrationStatus && (
          <div className='login_form_password'>
            <label htmlFor="password">Repeat new password</label>
            <input
              type="password"
              placeholder="Repeat new password"
              id="password"
              name="password"
              required
              ref={repeatedPasswordInputRef}
            />
          </div>
        )}
        <div className='login_form_buttons'>
          <button className="btn-main btn-login">
            {login.loginStatus ? "Login" : "Registration"}
          </button>
        </div>
      </form>
      <button
        className="btn-main detail_cart_cancel btn-login"
        onClick={switchLoginTypeHandler}
      >
        {login.loginStatus ? "Switch to registration" : "Switch to login"}
      </button>
      {isError && <NotificationMessage message={isError} />}
    </section>
  );
}
