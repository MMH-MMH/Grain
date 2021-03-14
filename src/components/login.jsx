import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import * as User from "../services/user";
import "../App.css";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    logging: false,
  };
  schema = {
    username: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    this.setState({
      logging: true,
    });
    const res = await User.login(this.state.data);
    console.log(res);
    if (res.data.token) {
      toast.success("Now you Loggedin.");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", this.state.data.username);

      window.location.replace("/");
    } else {
      toast.error(res.data.message);
    }
    this.setState({
      logging: false,
    });
  };
  render() {
    const st = {
      marginTop: "20%",
      marginLeft: "auto",
      marginRight: "auto",
      width: "80%",
    };
    const head = {
      color: "teal",
      textAlign: "Center",
    };
    return (
      <div style={st}>
        <h1 style={head}>Sign in</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email")}

          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          {"  "}
          {this.state.logging && (
            <img
              width="120px"
              height="80px"
              src="https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
            ></img>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
