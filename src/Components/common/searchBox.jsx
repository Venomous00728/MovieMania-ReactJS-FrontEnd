import React, { Component } from "react";
import "../../Style/searchBox.css";
import "../../Style/common/inputStylePurple.css";
import "../../Style/DarkTheme/inputStyleDark.css";
import "../../Style/LightTheme/inputStyleLight.css";

const SearchBox = ({ value, onChange, mode }) => {
  return (
    <div
      style={{ marginTop: "1rem", marginLeft: "0.15rem" }}
      className={`form__group${mode} box__container${mode}`}
    >
      <input
        type="text"
        name="query"
        className={`form__field${mode} box`}
        placeholder="Input Label"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <label className={`form__label${mode}`}>Search...</label>
    </div>
  );
};

export default SearchBox;
