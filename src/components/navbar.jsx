import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
class Navbar extends Component {
  state = {};
  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/");
  };
  render() {
    const user = this.props.user;

    return (
      <nav className="navbar navbar-expand navbar-dark bg-info rounded header">
        <NavLink className="navbar-brand logo" to="/">
          Food Corporation of India
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
          <div className="navbar navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              
              {!user && (
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <button onClick={this.logout} className="btn btn-info">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        
      </nav>
    );
  }
}

export default Navbar;
