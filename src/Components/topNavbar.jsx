import React, { useEffect, useRef } from "react";
import "../Style/topNavbarPurple.css";
import "../Style/LightTheme/topNavbarLight.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTab } from "./slices/navSlice";

const icons = [
  {
    path: require("../Components/assets/Anime1.jpg"),
  },
  {
    path: require("../Components/assets/Anime2.jpeg"),
  },
  {
    path: require("../Components/assets/Anime3.webp"),
  },
  {
    path: require("../Components/assets/Anime4.png"),
  },
  {
    path: require("../Components/assets/Anime6.jpg"),
  },
  {
    path: require("../Components/assets/Anime6.png"),
  },
];

function TopNavbar({ user, mode }) {
  const imageInput = useRef(null);
  const [iconsArray, setIconsArray] = useState(icons);
  const [showList, setShowList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(
    require("../Components/assets/Anime6.jpg")
  );
  const movies = useSelector((state) => state.nav.count);
  const tab = useSelector((state) => state.nav.tab);
  const dispatch = useDispatch();

  const handleImgClick = () => {
    imageInput.current.click();
    console.log(tab);
  };

  const handleClick = (event, icon) => {
    if (event.button === 0) {
      setSelectedIcon(icon.path);
      setShowList(false);
    } else if (event.button === 2) {
      handleDeleteIcon(icon);
    }
  };

  const handleTab = () => {
    dispatch(
      setTab({
        tab: "User",
      })
    );
  };

  const handleImageAdd = (event) => {
    const img = URL.createObjectURL(event.target.files[0]);
    const newIcon = {
      path: img,
    };
    const updatedIcons = [...iconsArray, newIcon];
    setIconsArray(updatedIcons);
    console.log(iconsArray.length);
  };

  const handleDeleteIcon = (icon) => {
    const tempIconArray = iconsArray;
    const updatedArray = tempIconArray.filter((ico) => icon.path !== ico.path);
    setIconsArray(updatedArray);
    console.log(updatedArray);
  };

  return (
    <div className={`topBarContainer${mode}`}>
      <div className={`topNavBar${mode}`}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <text className={`whishlist${mode}`}>{tab?.tab}</text>
          {tab?.tab !== "User" && (
            <text style={{ fontSize: "7pt" }} className={`badge${mode}`}>
              {movies?.count} {tab?.tab}
            </text>
          )}
        </span>
      </div>
      <div className={`userBox${mode}`}>
        <div className={`userInfo${mode}`}>
          {!user && (
            <React.Fragment>
              <NavLink
                onClick={handleTab}
                className={`nav-link navLinks${mode}`}
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                onClick={handleTab}
                className={`nav-link navLinks${mode}`}
                to="/register"
              >
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <div className={`profileBoxContiner${mode}`}>
                {user && (
                  <div>
                    <img
                      className={`profileImage${mode}`}
                      onClick={() =>
                        showList ? setShowList(false) : setShowList(true)
                      }
                      src={selectedIcon}
                    />
                    {showList && (
                      <div className={`iconList${mode}`}>
                        {iconsArray.map((icon) => (
                          <img
                            key={icon.path}
                            src={icon.path}
                            className={`profileImage${mode} icons icons${mode}`}
                            onClick={(event) => handleClick(event, icon)}
                            onContextMenu={(event) => {
                              event.preventDefault(); // Prevent the default right-click context menu
                              handleClick(event, icon);
                            }}
                          />
                        ))}
                        {iconsArray.length !== 9 ? (
                          <React.Fragment>
                            <img
                              onClick={handleImgClick}
                              src={
                                mode === "Purple"
                                  ? require("./assets/Image Input.png")
                                  : mode === "Dark"
                                  ? require("./assets/InputDark.png")
                                  : require("./assets/InputLight.png")
                              }
                              className={`profileImage${mode} icons icons${mode}`}
                            />
                            <input
                              type="file"
                              id="imageInput"
                              ref={imageInput}
                              accept="image/*"
                              hidden
                              onChange={handleImageAdd}
                            />
                          </React.Fragment>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <NavLink className={`nav-link navLinks${mode}`} to="/">
                    {user.name}
                  </NavLink>
                  <NavLink
                    className={`nav-link navLinks${mode} logout${mode}`}
                    to="/logout"
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
