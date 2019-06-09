import React, { Component } from 'react';
import { deleteAccount, editUsername, editImg, editHexcolor, editPassword } from '../../store';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Settings.css';
import Fileupload from '../Fileupload';
import Navbar from '../Navbar/Navbar';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUsername: '',
			oldPassword: '',
			newPassword: '',
			hexColor: null,
			// show: false,
			showNewPassword: false
		};
		this.updateImg = this.updateImg.bind(this);
	}
	updateImg(value) {
		this.props.editImg(value);
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleUsernameSubmit = () => {
		this.props.editUsername(this.state.newUsername);
		this.setState({ newUsername: '' });
	};

	handlePasswordSubmit = () => {
		this.props.editPassword(this.state.oldPassword, this.state.newPassword);
		this.setState({ oldPassword: '', newPassword: '' });
	};

	deleteAccount = () => {
		this.props.deleteAccount();
	};
	handleLogout = () => {
		this.props.logout();
	};

	updateColor = () => {
		console.log(this.state.hexColor);
		this.props.editHexcolor(this.state.hexColor);
	};
	render() {
		if (this.props.user.username === 'A Lurker') {
			return <Redirect to="/login" />;
		} else {
			return (
				<div>
					<Navbar />
					<div className="settings-form">
						<div className="insideSettings">
							<div className="putImageAndTextColorCloser">
								<div className="uploadImageField">
									<label>Upload a profile picture</label>
									<Fileupload updateImg={this.updateImg} />
								</div>
								<div className="changeColorField">
									<input
										className="colorWheel"
										type="color"
										value={this.state.hexColor}
										onChange={(e) => this.setState({ hexColor: e.target.value })}
									/>
									<button className="changeTextColor" onClick={this.updateColor}>
										Change Color
									</button>
								</div>
							</div>
							<label>Update username</label>
							<input
								className="newUsername"
								type="text"
								name="newUsername"
								value={this.state.newUsername}
								onChange={this.handleChange}
								placeholder="newUsername"
							/>

							<button className="changeUsernameBtn" onClick={this.handleUsernameSubmit}>
								Change username
							</button>

							<label> Old password</label>
							<input
								className="oldPw"
								name="oldPassword"
								value={this.state.oldPassword}
								onChange={this.handleChange}
								type="password"
								placeholder="Old Password"
							/>

							<label>Enter new password</label>

							<input
								className="newPw"
								name="newPassword"
								value={this.state.newPassword}
								onChange={this.handleChange}
								type="password"
								placeholder="New Password"
							/>
							<button className="changeOldPw" onClick={this.handlePasswordSubmit}>
								Change password
							</button>

							<div className="contactAndDelete">
								<button className="deleteBtn" onClick={this.deleteAccount}>
									Delete account
								</button>
								<a className="contact" href={'mailto:Trevorrhoffman@gmail.con'}>
									Contact Us
								</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
const mapStateToProps = (reduxState) => {
	return {
		user: reduxState.user
	};
};

export default connect(mapStateToProps, { deleteAccount, editUsername, editImg, editHexcolor, editPassword })(Settings);
