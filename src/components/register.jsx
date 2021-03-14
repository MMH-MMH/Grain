import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as User from "../services/user";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      state: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
    state: Joi.string().required().label("State"),
  };

  doSubmit = async () => {
    const res = await User.register(this.state.data);
    if (res.data.username === this.state.data.username) {
      toast.success("You have Been Registered Successfully.");
      setTimeout(function () {
        window.location.replace("/login");
      }, 3000);
    } else {
      toast.error("Regsiteration Failed !");
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}

          {this.renderInput("password", "Password", "password")}
          {this.renderInput("state", "State")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
