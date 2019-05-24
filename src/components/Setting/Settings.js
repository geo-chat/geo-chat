import React, { Component } from 'react';
import axios from 'axios';
// import { deleteAccount } from '../../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Setting/Settings.css';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUsername: '',
			img: '',
			oldPassword: '',
			newPassword: ''
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
	render() {
		return (
			<div>
				<nav class="navbar navbar-expand-lg navbar-light bg-custom">
					<Link to="/">Logo</Link>

					<Link to="/setting">
						<i class="fas fa-cog" a />
					</Link>

					<div class="collapse navbar-collapse" id="navbarText">
						<ul class="navbar-nav mr-auto">
							<Link to="/login">
								<li class="nav-item">Signup/Login</li>
							</Link>
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
				</form>
			</div>
		);
	}
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Settings);
