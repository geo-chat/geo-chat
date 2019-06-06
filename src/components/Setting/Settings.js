import React, { Component } from "react";
import {
  deleteAccount,
  editUsername,
  editImg,
  editHexcolor,
  editPassword
} from "../../store";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Settings.css";
import Fileupload from "../Fileupload";
import Navbar from "../Navbar/Navbar";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: "",
      oldPassword: "",
      newPassword: "",
      hexColor: null,
      show: false,
      showNewPassword: false
    };
    this.updateImg = this.updateImg.bind(this);
  }
  updateImg(value) {
    this.props.editImg(value);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleUsernameSubmit = () => {
    this.props.editUsername(this.state.newUsername);
    this.setState({ newUsername: "" });
  };

  handlePasswordSubmit = () => {
    this.props.editPassword(this.state.oldPassword, this.state.newPassword);
    this.setState({ oldPassword: "", newPassword: "" });
  };

  deleteAccount = () => {
    this.props.deleteAccount();
  };
  handleLogout = () => {
    this.props.logout();
  };

  show = () => {
    this.setState({ show: !this.state.show });
  };
  newPassword = () => {
    this.setState({ showNewPassword: !this.state.showNewPassword });
  };
  updateColor = () => {
    console.log(this.state.hexColor);
    this.props.editHexcolor(this.state.hexColor);
  };
  render() {
    if (this.props.user.username === "A Lurker") {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <Navbar />
          <div className="settings-form">
            <div className="usernameForm">
              <label onClick={() => this.show()}>Update username</label>
              {this.state.show !== false ? (
                <div className="smallUsernameForm">
                  <input
                    type="text"
                    name="newUsername"
                    value={this.state.newUsername}
                    onChange={this.handleChange}
                  />
                  {/* This is where your going to be able to  change text color */}
                  <button
                    className="changeUsernameBtn"
                    onClick={this.handleUsernameSubmit}
                  >
                    Change username
                  </button>
                </div>
              ) : null}
            </div>
            <div className="ImageUploadForm">
              <label>Upload a profile picture</label>
              <Fileupload updateImg={this.updateImg} />
            </div>
            <div className="oldPasswordForm">
              <label> Old password</label>
              <input
                name="oldPassword"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                type="password"
              />
            </div>
            <div className="newPasswordForm">
              <label onClick={() => this.newPassword()}>
                Enter new password
              </label>
              {this.state.showNewPassword !== false ? (
                <div>
                  <input
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    type="password"
                  />
                  <button onClick={this.handlePasswordSubmit}>
                    Change password
                  </button>
                </div>
              ) : null}
            </div>
            <button className="deleteBtn" onClick={this.deleteAccount}>
              Delete account
            </button>
            <a className="contact" href={"mailto:Trevorrhoffman@gmail.con"}>
              Contact Us
            </a>
            <input
              type="color"
              value={this.state.hexColor}
              onChange={e => this.setState({ hexColor: e.target.value })}
            />
            <button onClick={this.updateColor}>Change Text Color</button>
          </div>
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
  { deleteAccount, editUsername, editImg, editHexcolor, editPassword }
)(Settings);
