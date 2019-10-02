import React, { Component } from "react";
import { login } from "../../store";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "../Login/Login.css";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password).catch(err => {
      console.log(err);
      alert("invalid username or password");
    });
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    if (this.props.user.username !== "A Lurker") {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar />
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <div className="outsideLogin">
              <div className="imageLogin" />

              <div className="smallLoginForm">
                <div className="descLogin">
                  <h1 className="titleLogin">Welcome back to Geo-Chat</h1>
                  <h4 className="descriptionLogin">
                    Sign Up to continue to your account.
                  </h4>
                </div>
                <div className="iconInside">
                  <i className="fas fa-user" />
                  <input
                    className="usernameLogin"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    placeholder="Username"
                    id="username_input"
                  />
                </div>
                <div className="iconInside">
                  <i className="fas fa-lock" />
                  <input
                    className="passwordLogin"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    placeholder="Password"
                    id="password_input"
                  />
                </div>
                <button
                  className="loginBtn"
                  onClick={this.handleSubmit}
                  id="send_login_button"
                >
                  Login
                </button>
                <span>
                  Not a member?
                  <Link className="signUpInLogin" to="/signup">
                    sign up.
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}
const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
