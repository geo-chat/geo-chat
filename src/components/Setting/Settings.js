import React, { Component } from "react";
import {
  deleteAccount,
  logout,
  editUsername,
  editImg,
  editHexcolor,
  editPassword
} from "../../store";
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: "",
      img: "",
      oldPassword: "",
      newPassword: "",
      hexColor: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleUsernameSubmit = () => {
    this.props.editUsername(this.state.newUsername);
    this.setState({ newUsername: "" });
  };
  handleImgSubmit = () => {
    this.props.editImg(this.state.img);
    this.setState({ img: "" });
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
  render() {
    return (
      <div>
        <form className="settings-form">
          <label>Update username</label>
          <input
            name="newUsername"
            value={this.state.newUsername}
            onChange={this.handleChange}
          />
          <button onClick={this.handleUsernameSubmit}>Change username</button>
          <label>Upload a profile picture</label>
          <input
            name="img"
            value={this.state.img}
            onChange={this.handleChange}
            // replace with amazon s3 feature
          />
          <label> Old password</label>
          <input
            name="oldPassword"
            value={this.state.oldPassword}
            onChange={this.handleChange}
            type="password"
          />
          <label>Enter new password</label>
          <input
            name="newPassword"
            value={this.state.newPassword}
            onChange={this.handleChange}
            type="password"
          />
          <button onClick={this.handlePasswordSubmit}>Change password</button>
          <button onClick={this.deleteAccount}> Delete account</button>
          <button> Contact Us</button>
          <button onClick={this.handleLogout}>Logout</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { deleteAccount, logout, editUsername, editImg, editHexcolor, editPassword }
)(Settings);
