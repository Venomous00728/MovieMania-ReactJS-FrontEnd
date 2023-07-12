import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import DateInput from "./dateInput";
import "../../Style/movieForm.css";
import "../../Style/common/buttonStylePurple.css";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) error[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, disabled, type = "text", mode) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        errors={errors[name]}
        disabled={disabled}
        mode={mode}
      />
    );
  }

  renderDateInput(name, label, type = "date") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  }

  renderButton(label, mode) {
    return (
      <button disabled={this.validate()} className={`submitBtn${mode}`}>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, mode) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
        className="formSelect"
        mode={mode}
      />
    );
  }
}

export default Form;
