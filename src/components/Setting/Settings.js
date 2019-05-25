import React, { Component } from "react";
import axios from "axios";
// import { deleteAccount, logout, editUsername, editImg, hexColor, updatePassword } from "../../store";
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
    this.props.editUsername();
  };
  handleImgSubmit = () => {
    this.props.editImg();
  };
  handlePasswordCompare = () => {
    this.props.updatePassword();
  };
  handleHexcolor = () => {
    this.props.hexColor();
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
          <label>Change Text background</label>
          <input
            name="hexColor"
            value={this.state.hexColor}
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
          <label>Enter new password</label>
          <input
            name="newPassword"
            value={this.state.newPassword}
            onChange={this.handleChange}
            type="password"
          />
          <button onClick={this.handlePasswordSubmit}>Change password</button>
          <label> Old password</label>
          <input
            name="oldPassword"
            value={this.state.oldPassword}
            onChange={this.handleChange}
            type="password"
          />
          <button onClick={this.handlePasswordCompare}>
            submit old password
          </button>
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
  mapStateToProps
  // { deleteAccount, logout, editUsername, editImg, hexColor, updatePassword  }
)(Settings);
