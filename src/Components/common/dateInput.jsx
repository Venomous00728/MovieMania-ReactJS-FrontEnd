import React, { Component } from "react";
import "../../Style/movieForm.css";
import "../../Style/common/inputStylePurple.css";
const DateInput = ({ name, label, errors, ...rest }) => {
  return (
    <div className="form-group formContainer">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="form__group">
        <input
          placeholder="Input Label"
          {...rest}
          name={name}
          id={name}
          className="form__field w-50"
        />
        <label for="name" class="form__label">
          Enter {label}
        </label>
      </div>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default DateInput;
