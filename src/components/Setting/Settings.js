import React, { Component } from 'react';
import { deleteAccount, editUsername, editImg, editHexcolor, editPassword } from '../../store';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './Settings.css';
import Fileupload from '../Fileupload';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUsername: '',
			oldPassword: '',
			newPassword: '',
			hexColor: '',
			show: false,
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

	show = () => {
		this.setState({ show: !this.state.show });
	};
	newPassword = () => {
		this.setState({ showNewPassword: !this.state.showNewPassword });
	};
	render() {
		if (!this.props.user.username) {
			return <Redirect to="/login" />;
		} else {
			return (
				<div>
					<nav class="navbar navbar-expand-lg navbar-light bg-custom">
						<a class="navbar-brand" href="#">
							<img
								src="https://banner2.kisspng.com/20180424/oaq/kisspng-honda-logo-car-2007-honda-cr-v-decorative-stickers-5adfa878c61c14.8927719915246070968115.jpg"
								class=" topnavBarImage d-inline-block align-center"
								alt=""
							/>
							Geo-Chat
						</a>

						<button
							class="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span class="navbar-toggler-icon" />
						</button>

						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="nav navbar-nav ml-auto">
								<li class="nav-item active">
									<Link to="/" class="nav-link">
										<i class="fas fa-home" /> Home
										<span class="sr-only">(current)</span>
									</Link>
								</li>

								<li class="nav-item dropdown">
									<a
										class="nav-link"
										href="#"
										id="navbarDropdown"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										<i class="far fa-caret-square-down" /> Dropdown
									</a>
									<div class="dropdown-menu" aria-labelledby="navbarDropdown">
										<a class="dropdown-item" href="#">
											Action
										</a>
										<a class="dropdown-item" href="#">
											Another action
										</a>
									</div>
								</li>
								<li class="nav-item ">
									<Link class="nav-link" to="/setting">
										<i class="fas fa-cog" /> Settings
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					<form className="settings-form">
						<div className="usernameForm">
							<label onClick={() => this.show()}>Update username</label>
							{this.state.show !== false ? (
								<div className="smallUsernameForm">
									<input
										name="newUsername"
										value={this.state.newUsername}
										onChange={this.handleChange}
									/>
									{/* This is where your going to be able to  change text color */}
									<button className="changeUsernameBtn" onClick={this.handleUsernameSubmit}>
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
						<a className="contact" href={'mailto:Trevorrhoffman@gmail.con'}>
							Contact Us
						</a>
					</form>
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
