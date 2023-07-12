import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Style/sideNavbarPurple.css";
import "../Style/DarkTheme/sideNavbarDark.css";
import "../Style/LightTheme/sideNavbarLight.css";
import "../Style/common/togglePurple.css";
import "../Style/DarkTheme/topNavbarDark.css";
import { useDispatch } from "react-redux";
import { setThemeMode } from "./slices/navSlice";
import { useSelector } from "react-redux";

function SideNavbar({ user, mode }) {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.nav.themeMode);

  const handleLightTheme = () => {
    dispatch(
      setThemeMode({
        themeMode: "Light",
      })
    );
  };

  const handlePurpleTheme = () => {
    dispatch(
      setThemeMode({
        themeMode: "Purple",
      })
    );
  };

  const handleDarkTheme = () => {
    dispatch(
      setThemeMode({
        themeMode: "Dark",
      })
    );
  };

  return (
    <div className={`boxContainer${mode}`}>
      <div className="mt-4">
        <div className={`logoContainer${mode}`}>
          <img
            className={`imgStyle${mode}`}
            src={
              mode === "Purple"
                ? require("./assets/Movie Reel PNG.png")
                : mode === "Dark"
                ? require("./assets/MovieReelDark.png")
                : require("./assets/MovieReelLight.png")
            }
            alt="myImage"
          />
          <NavLink className={`logo${mode}`} to="/">
            Movieziya
          </NavLink>
        </div>
        <div className={`tabs${mode}`}>
          <ul className="navbar-nav">
            <li className={`nav-item textContainer${mode}`}>
              <div className={`logoContainer${mode}`}>
                <img
                  className={`iconStyle${mode}`}
                  src={
                    mode === "Purple"
                      ? require("./assets/moviePurple.png")
                      : mode === "Dark"
                      ? require("./assets/MovieDark.png")
                      : require("./assets/MovieLight.png")
                  }
                  alt="myImage"
                />
                <NavLink className={`text${mode}`} to="/">
                  Movies
                </NavLink>
              </div>
            </li>
            <li className={`nav-item textContainer${mode}`}>
              <div className={`logoContainer${mode}`}>
                <img
                  className={`iconStyle${mode}`}
                  src={
                    mode === "Purple"
                      ? require("./assets/userPurple.png")
                      : mode === "Dark"
                      ? require("./assets/UserDark.png")
                      : require("./assets/UserLight.png")
                  }
                  alt="myImage"
                />
                <NavLink className={`text${mode}`} to="/customers">
                  Customers
                </NavLink>
              </div>
            </li>
            <li className={`nav-item textContainer${mode}`}>
              <div className={`logoContainer${mode}`}>
                <img
                  className={`iconStyle${mode}`}
                  src={
                    mode === "Purple"
                      ? require("./assets/bankPurple.png")
                      : mode === "Dark"
                      ? require("./assets/BankDark.png")
                      : require("./assets/BankLight.png")
                  }
                  alt="myImage"
                />
                <NavLink className={`text${mode}`} to="/rentals">
                  Rentals
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ display: "flex", margin: "3rem", marginTop: "10rem" }}>
        <fieldset style={{ display: "flex" }} id="switch" class={`radio`}>
          <input
            onClick={handleLightTheme}
            name="switch"
            id="on"
            type="radio"
          />
          <label
            style={
              mode === "Light"
                ? { color: "black" }
                : mode === "Dark"
                ? { color: "#cccccc" }
                : {}
            }
            className={`textLabel${mode}`}
            for="on"
          >
            Light
          </label>
          <input
            onClick={handleDarkTheme}
            name="switch"
            id="off"
            type="radio"
          />
          <label
            style={
              mode === "Light"
                ? { color: "black" }
                : mode === "Dark"
                ? { color: "#cccccc" }
                : {}
            }
            className={`textLabel${mode}`}
            for="off"
          >
            Dark
          </label>
          <input
            onClick={handlePurpleTheme}
            name="switch"
            id="auto"
            type="radio"
          />
          <label
            style={
              mode === "Light"
                ? { color: "black" }
                : mode === "Dark"
                ? { color: "#cccccc" }
                : {}
            }
            for="auto"
          >
            Purple
          </label>
        </fieldset>
      </div>
    </div>
  );
}

export default SideNavbar;
