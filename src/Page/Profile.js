import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { storage } from "../firebase";
import classes from "./Profile.module.css";
import AuthContext from "../Store/auth-context";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Profile = (props) => {
  const [userEmail, setUserEmail] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const history = useHistory();
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => err,
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
      const file = event.target.files[0];
      uploadFiles(file);
    } else {
      setProfileImage(null);
    }
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBEhyrJuGLgbzWiMbWOCiQHfzT6z-rvenI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Successfully changed your password!");
          history.push("/");
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
        alert("Oops, something went wrong! Please try again.");
      });
  };

  return (
    <div className={classes.body}>
      <form onSubmit={passwordChangeHandler}>
        <div className={classes.container}>
          <div className="text-center mb-4">
            <div className={classes.profile}>Profile</div>
          </div>
          <div className={classes.inputWrap}>
            <div className="text-center">
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <input
                className={classes.input}
                type="email"
                id="email"
                placeholder={props.userEmail}
                disabled
              ></input>

              <br />
              <label htmlFor="password" className={classes.label}>
                {" "}
                Current password{" "}
              </label>
              <input
                className={classes.input}
                type="password"
                id="password"
              ></input>
              <br />
              <label htmlFor="newPassword" className={classes.label}>
                {" "}
                New password{" "}
              </label>
              <input
                className={classes.input}
                type="password"
                id="newPassword"
                ref={newPasswordInputRef}
              ></input>
              <br />
              <div className="text-center mt-5">
                <button className={classes.saveBtn}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
