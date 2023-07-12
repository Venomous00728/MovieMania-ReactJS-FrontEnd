import React, { Component, useEffect } from "react";
import "../../Style/movieForm.css";
import "../../Style/common/inputStylePurple.css";
import "../../Style/DarkTheme/inputStyleDark.css";
import "../../Style/DarkTheme/movieFormDark.css";

const Input = ({ name, label, disabled, errors, mode, ...rest }) => {
  return (
    <div className={`form-group formContainer`}>
      <label className={`label${mode}`} htmlFor={name}>
        {label}
      </label>
      <div className={`form__group${mode}`}>
        <input
          placeholder="Input Label"
          {...rest}
          name={name}
          id={name}
          className={`form__field${mode} w-50`}
          disabled={disabled}
        />
        <label for="name" className={`form__label${mode}`}>
          {disabled ? "" : "Enter"} {label}
        </label>
      </div>
      {errors && (
        <div
          style={{
            color: "red",
            backgroundColor: "#F8D7DA",
            width: "50%",
            borderBottomRightRadius: "4pt",
            borderBottomLeftRadius: "4pt",
          }}
        >
          {errors}
        </div>
      )}
    </div>
  );
};

export default Input;
