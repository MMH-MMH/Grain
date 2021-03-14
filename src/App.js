import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(user);
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <ToastContainer />
        <Navbar user={user} className="navv" />

        <Switch>
          <Route
            path="/login"
            render={(props) => (user ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            path="/dashboard"
            render={(props) => (user ? <Dashboard /> : <Login />)}
          />
          <Route
            path="/"
            render={(props) =>
              user ? <Redirect to="/dashboard" /> : <Login />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
