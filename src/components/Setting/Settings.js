import React, { Component } from 'react';
import axios from 'axios';
// import { deleteAccount, logout } from "../../store";
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
			show: false
		};
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleUsernameSubmit = () => {
		// axios.put call to change the username
	};
	handleImgSubmit = () => {
		// axios.put call to add a profile picture
	};
	handlePasswordSubmit = () => {
		// axios.put call to change the password axios.get call to compare old password
	};
	handlePasswordCompare = () => {
		// axios.get call to compare old password
	};
	deleteAccount = () => {
		this.props.deleteAccount();
	};
	handleLogout = () => {
		this.props.logout();
	};

	worldClock = () => {
		const { show } = this.state;
		this.setState({ show: !show });
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
								<a class="dropdown-item" href="#">
									Signup/Login
								</a>
								<a class="dropdown-item" href="#">
									Logout
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
					<label>Update username</label>
					<input name="newUsername" value={this.state.newUsername} onChange={this.handleChange} />
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
					<button onClick={this.handlePasswordCompare}>submit old password</button>
					<button onClick={this.deleteAccount}> Delete account</button>
					<button> Contact Us</button>
					<button onClick={this.handleLogout}>Logout</button>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(
	mapStateToProps
	// { deleteAccount, logout }
)(Settings);
