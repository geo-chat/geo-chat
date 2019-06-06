import React, { Component } from "react";
import { signup } from "../../store";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Link, Redirect } from "react-router-dom";
import "../SignUp/SignUp.css";
class Signup extends Component {
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

    this.props.signup(this.state.username, this.state.password);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    if (this.props.user.username === "A Lurker") {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Navbar />
          <form className="signUpForm" onSubmit={this.handleSubmit}>
            <div className="outsideSignUp">
              <div className="imageSignUp">
                {/* <h1 className="title">Welcome back to Geo-Chat</h1>
							<h4 className="description">Sign Up to continue to your account.</h4> */}
              </div>
              <div className="smallSignUpForm">
                <div className="descSignUp">
                  <h1 className="title">Welcome back to Geo-Chat</h1>
                  <h4 className="description">
                    Sign Up to continue to your account.
                  </h4>
                </div>
                <div className="iconInside">
                  <i class="fas fa-user" />
                  <input
                    className="usernameSignUp"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    placeholder="username"
                  />
                </div>
                <div className="iconInside">
                  <i class="fas fa-lock" />
                  <input
                    className="passwordSignUp"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    placeholder="password"
                  />
                </div>
                <button className="signUpBtn" onClick={this.handleSubmit}>
                  Sign Up
                </button>
                <span>
                  Already a member?
                  <Link className="signUpInSignUp" to="/login">
                    Login.
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
const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { signup }
)(Signup);
