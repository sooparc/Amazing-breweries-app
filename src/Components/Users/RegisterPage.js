import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import classes from "./RegisterPage.module.css";
import logo from "../../Assets/LoginLogo.png";

const Register = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popover, setPopover] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEhyrJuGLgbzWiMbWOCiQHfzT6z-rvenI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEhyrJuGLgbzWiMbWOCiQHfzT6z-rvenI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          history.push("/login");
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.body}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className={classes.loginBox}>
            <img
              src={logo}
              alt=""
              style={{ width: "40%", marginBottom: "25px" }}
            />
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  className={classes.input}
                  placeholder="Email address"
                  ref={emailInputRef}
                  required
                />

                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  className={classes.input}
                  placeholder="******"
                  ref={passwordInputRef}
                  required
                />
                <p style={{ color: "white" }}>
                  <small>* Password must be 6 characters long</small>
                </p>
              </div>

              {!isLoading && (
                <button className={classes.button}>Sign Up</button>
              )}
              {isLoading && (
                <p style={{ color: "white" }}>Sending Request...</p>
              )}
            </form>

            <div
              style={{
                color: "white",
                marginBottom: "10px",
              }}
              className={classes.accountP}
            >
              Already have an accout?
            </div>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
