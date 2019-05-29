import React, { Component } from 'react';
import { deleteAccount, editUsername, editImg, editHexcolor, editPassword } from '../../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Settings.css';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUsername: '',
			img: '',
			oldPassword: '',
			newPassword: '',
			hexColor: '',
			show: false,
			showNewPassword: false
		};
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleUsernameSubmit = () => {
		this.props.editUsername(this.state.newUsername);
		this.setState({ newUsername: '' });
	};
	handleImgSubmit = () => {
		this.props.editImg(this.state.img);
		this.setState({ img: '' });
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

	show = () => {
		this.setState({ show: !this.state.show });
	};
	newPassword = () => {
		this.setState({ showNewPassword: !this.state.showNewPassword });
	};
	render() {
		return (
			<div>
				<nav class="navbar navbar-expand-lg navbar-light bg-custom">
					<Link to="/">Logo</Link>
					<h4>Geo-Chat</h4>
					<ul class="nav nav-pills">
						<li class="nav-item dropdown">
							<a
								// class="nav-link dropdown-toggle"
								data-toggle="dropdown"
								href="#"
								role="button"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<i class="far fa-caret-square-down" />
							</a>
							<div class="dropdown-menu dropdown-menu-right">
								<Link to="/login" class="dropdown-item">
									Signup/Login
								</Link>
								<a class="dropdown-item" href="#">
									<button className="logoutBtn" onClick={this.handleLogout}>
										Logout
									</button>
								</a>
							</div>
						</li>
					</ul>
					<Link to="/setting">
						<i class="fas fa-cog" />
					</Link>

					<div class="collapse navbar-collapse" id="navbarText">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item active">
								<a class="nav-link" href="#">
									Home <span class="sr-only">(current)</span>
								</a>
							</li>
							<Link to="/login">
								<li class="nav-item">Signup/Login</li>
							</Link>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Contacts
								</a>
							</li>
						</ul>
					</div>
				</nav>

				<form className="settings-form">
					<div className="usernameForm">
						<label onClick={() => this.show()}>Update username</label>
						{this.state.show !== false ? (
							<div className="smallUsernameForm">
								<input name="newUsername" value={this.state.newUsername} onChange={this.handleChange} />
								{/* This is where your going to be able to  change text color */}
								<button className="changeUsernameBtn" onClick={this.handleUsernameSubmit}>
									Change username
								</button>
							</div>
						) : null}
					</div>
					<div className="ImageUploadForm">
						<label>Upload a profile picture</label>

						<input
							name="img"
							value={this.state.img}
							onChange={this.handleChange}
							// replace with amazon s3 feature
						/>
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
						<label onClick={() => this.newPassword()}>Enter new password</label>
						{this.state.showNewPassword !== false ? (
							<div>
								<input
									name="newPassword"
									value={this.state.newPassword}
									onChange={this.handleChange}
									type="password"
								/>
								<button onClick={this.handlePasswordSubmit}>Change password</button>
							</div>
						) : null}
					</div>
					<button className="deleteBtn" onClick={this.deleteAccount}>
						Delete account
					</button>
					<a className="contact" href={'mailto:' + 'Trevorrhoffman@gmail.con'}>
						Contact Us
					</a>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { deleteAccount, editUsername, editImg, editHexcolor, editPassword })(Settings);
