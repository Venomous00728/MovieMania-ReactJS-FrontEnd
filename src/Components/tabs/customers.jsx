import React, { Component } from "react";
import { saveCustomer } from "../../services/customerService";
import Form from "../common/form";
import Joi from "joi-browser";
import "../../Style/customersForm.css";
import "../../Style/DarkTheme/customerFormDark.css";
import "../../Style/LightTheme/customerFormLight.css";
import "../../Style/common/inputStylePurple.css";
import "../../Style/common/buttonStylePurple.css";

class CustomerForm extends Form {
  state = {
    customer: {
      name: "",
      phone: "",
      isGold: false,
    },
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await saveCustomer(this.state.customer);
    // Reset form fields
    this.setState({
      customer: { name: "", phone: "", isGold: false },
    });
    this.props.history.push("/customers");
  };

  handleChange = (e) => {
    this.setState({
      customer: { ...this.state.customer, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { customer } = this.state;
    return (
      <div className="ml-5 mt-5">
        <h1 className={`movieFormHeading${this.props.mode}`}>Add Customer</h1>
        <form onSubmit={this.handleSubmit}>
          <label className={`label${this.props.mode}`}>Name</label>
          <div className={`form__group${this.props.mode}`}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Input label"
              className={`form__field${this.props.mode} w-50`}
              value={customer.name}
              onChange={this.handleChange}
            />
            <label for="name" class={`form__label${this.props.mode}`}>
              Enter Name
            </label>
          </div>
          <label className={`label${this.props.mode}`}>Phone</label>
          <div className={`form__group${this.props.mode}`}>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={this.handleChange}
              placeholder="Input label"
              className={`form__field${this.props.mode} w-50`}
            />
            <label for="name" class={`form__label${this.props.mode}`}>
              Enter Phone Number
            </label>
          </div>
          <div className="checkboxContainer">
            <label className={`isGold${this.props.mode}`}>Gold Customer</label>
            <label class={`container${this.props.mode}`}>
              <input
                type="checkbox"
                id="isGold"
                name="isGold"
                checked={customer.isGold}
                onChange={(e) =>
                  this.setState({
                    customer: { ...customer, isGold: e.target.checked },
                  })
                }
              />
              <div class={`checkmark${this.props.mode}`}></div>
            </label>
          </div>
          <button className={`submitBtn${this.props.mode}`}>Save</button>
        </form>
      </div>
    );
  }
}
export default CustomerForm;
