import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import Movies from "../Components/movies";
import Customers from "./customersList";
import CustomerForm from "./tabs/customers";
import Rentals from "../Components/rentals";
import NotFound from "../Components/tabs/not-found";
import LoginForm from "../Components/tabs/loginForm";
import RegisterForm from "../Components/tabs/registerForm";
import MovieForm from "../Components/tabs/movieForm";
import ProtectedRoute from "../Components/common/protectedRoute";
import Logout from "../Components/tabs/logout";
import SideNavbar from "./sideNavbar";
import auth from "../services/authService";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import "../Style/navbarPurple.css";
import "../Style/LightTheme/navbarLight.css";
import "../Style/DarkTheme/navbarDark.css";
import TopNavbar from "./topNavbar";
import Profile from "./tabs/profile";
import TvSeries from "./tvSeries";
import RentalForm from "./tabs/movieCheckout";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [theClass, setTheClass] = useState({
    addClass: "-o",
  });
  const [mode, setMode] = useState("Dark");

  const themeMode = useSelector((state) => state.nav.themeMode);
  useEffect(() => {
    if (themeMode.themeMode === undefined) return;

    setMode(themeMode.themeMode);
  }, [themeMode]);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setTheClass({ user });
  }, []);

  const handleLike = (adClass) => {
    let addClass = "";
    setTheClass(addClass);
  };

  return (
    <div className={`mainContainer${mode}`}>
      <SideNavbar mode={mode} user={theClass.user} />
      <div className={`webContainer${mode}`}>
        <div className={`topBarContainer${mode}`}>
          <TopNavbar mode={mode} user={theClass.user} />
        </div>
        <div className="switch">
          <Switch>
            <Route
              path="/login"
              render={(props) => <LoginForm mode={mode} {...props} />}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute
              path="/movies/:id"
              render={(props) => <MovieForm mode={mode} {...props} />}
            />
            <ProtectedRoute
              path="/rentals/:id"
              render={(props) => <RentalForm mode={mode} {...props} />}
            />
            <ProtectedRoute
              path="/customers/:id"
              render={(props) => <CustomerForm mode={mode} {...props} />}
            />
            <Route
              path="/register"
              render={(props) => <RegisterForm mode={mode} {...props} />}
            />
            <Route path="/profile" component={Profile} />
            <Route
              path="/"
              exact
              render={(props) => (
                <Movies
                  user={theClass.user}
                  onLike={handleLike}
                  adClass={theClass.addClass}
                  mode={mode}
                  {...props}
                />
              )}
            />
            <Route
              path="/customers"
              exact
              render={(props) => (
                <Customers mode={mode} user={theClass.user} {...props} />
              )}
            />
            <Route
              path="/rentals"
              exact
              render={(props) => (
                <Rentals mode={mode} user={theClass.user} {...props} />
              )}
            />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
