import Joi from "joi-browser";
import React, { Component } from "react";
import Form from "../common/form";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";
import "../../Style/movieForm.css";
import "../../Style/DarkTheme/movieFormDark.css";
import "../../Style/LightTheme/movieFormLight.css";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="ml-5 mt-5">
        <h1 className={`movieFormHeading${this.props.mode}`}>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "Username",
            false,
            "text",
            this.props.mode
          )}
          {this.renderInput(
            "password",
            "Password",
            false,
            "password",
            this.props.mode
          )}
          {this.renderButton("Login", this.props.mode)}{" "}
        </form>
      </div>
    );
  }
}

export default LoginForm;
