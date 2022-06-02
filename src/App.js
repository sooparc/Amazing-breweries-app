/* eslint-disable */

import { useState, useEffect, useContext } from "react";
import "./App.css";
import MainNavbar from "./Components/Layout/Navbar";
import Header from "./Components/Header";
import Breweries from "./Page/Home";
import Footer from "./Components/Layout/Footer";
import FindBeers from "./Page/FindBeers";
import BeerDetail from "./Page/BeerDetail";
import Data from "./Data/Data";
import Login from "./Components/Users/LoginPage";
import Register from "./Components/Users/RegisterPage";
import Profile from "./Page/Profile";
import AuthContext from "./Store/auth-context";

import { Link, Redirect, Route, Switch } from "react-router-dom";

function App(props) {
  const [breweryData, setBreweryData] = useState(Data);
  const [userEmail, setUserEmail] = useState("test");
  const [profileImage, setProfileImage] = useState(null);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    let userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, [setUserEmail]);

  useEffect(() => {
    let profileImage = localStorage.getItem("profileImage");

    if (profileImage) {
      setProfileImage(profileImage);
    }
  }, [setProfileImage]);

  return (
    <div className="App">
      <Route path="/" exact>
        <MainNavbar />
        <Header />
        <Breweries userEmail={userEmail} profileImage={profileImage} />
        <Footer />
      </Route>

      <Route path="/beer" exact>
        <MainNavbar />
        <FindBeers />
        <Footer />
      </Route>

      <Route path="/beer/:id">
        <MainNavbar />
        <BeerDetail />
        <Footer />
      </Route>

      <Route path="/login" exact>
        <MainNavbar />
        <Login setUserEmail={setUserEmail} />
      </Route>

      <Route path="/register">
        <MainNavbar />
        <Register />
      </Route>

      {isLoggedIn && (
        <Route path="/profile">
          <MainNavbar />
          <Profile userEmail={userEmail} />
        </Route>
      )}
    </div>
  );
}

export default App;
