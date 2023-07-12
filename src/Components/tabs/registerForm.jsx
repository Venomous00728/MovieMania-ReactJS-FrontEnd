import React, { Component } from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import * as resgisterService from "../../services/userService";
import auth from "../../services/authService";
import "../../Style/movieForm.css";
import "../../Style/DarkTheme/movieFormDark.css";
import "../../Style/LightTheme/movieFormLight.css";

class Register extends Form {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().label("Password").min(5).required(),
    username: Joi.string().label("Username").required(),
  };

  doSubmit = async () => {
    try {
      const response = await resgisterService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="ml-5 mt-5">
        <h1 className={`movieFormHeading${this.props.mode}`}>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", false, "text", this.props.mode)}
          {this.renderInput(
            "password",
            "Password",
            false,
            "password",
            this.props.mode
          )}
          {this.renderInput(
            "username",
            "Username",
            false,
            "text",
            this.props.mode
          )}
          {this.renderButton("Register", this.props.mode)}
        </form>
      </div>
    );
  }
}

export default Register;
