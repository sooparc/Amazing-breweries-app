import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./LoginPage.module.css";
import logo from "../../Assets/LoginLogo.png";
import AuthContext from "../../Store/auth-context";

export const Login = (props) => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEhyrJuGLgbzWiMbWOCiQHfzT6z-rvenI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          header: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expirationTime.toISOString());
          props.setUserEmail(enteredEmail);
          localStorage.setItem("userEmail", enteredEmail);
          history.push("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
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
            <h2>Login</h2>

            <div>
              <input
                type="email"
                className={classes.input}
                placeholder="Please enter your email"
                ref={emailInputRef}
              />
              <input
                type="password"
                className={classes.input}
                placeholder="********"
                ref={passwordInputRef}
              />
            </div>
            <form onSubmit={submitHandler}>
              <button className={classes.button}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
