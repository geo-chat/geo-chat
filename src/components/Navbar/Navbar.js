import React, { Component } from 'react';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store';
import axios from 'axios';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			lat: null,
			lng: null,
			chatName: '',
			rooms: []
		};
		this.clickHandler = this.clickHandler.bind(this);
	}
	changeHandler = (e) => {
		this.setState({ chatName: e.target.value });
	};
	handleLogout = () => {
		this.props.logout();
	};
	async clickHandler() {
		console.log(this.props);
		if (this.state.name === '') {
			alert('Please enter a name for your chatroom');
		} else {
			await axios
				.post('/api/chat/create', {
					name: this.state.chatName,
					lat: this.props.lat,
					lng: this.props.lng
				})
				.catch((err) => console.log(err));
			this.setState({ chatName: '' });
		}
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-custom">
					<Link className="navbar-brand" to="/">
						<img
							src="https://banner2.kisspng.com/20180424/oaq/kisspng-honda-logo-car-2007-honda-cr-v-decorative-stickers-5adfa878c61c14.8927719915246070968115.jpg"
							className=" topnavBarImage d-inline-block align-center"
							alt=""
						/>
						<h3 className="geoChat"> Geo-Chat</h3>
					</Link>

					<button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="nav navbar-nav ml-auto navbarTargetName">
							<li className="nav-item active">
								<Link to="/" className="nav-link">
									<i className="fas fa-home" />Home
									<span className="sr-only">(current)</span>
								</Link>
							</li>

							<li className="nav-item ">
								<Link
									to="/create"
									className="nav-link"
									// type="button"
									// class="btn btn-custom"
									data-toggle="modal"
									data-target="#exampleModalCenter"
								>
									<i className="fas fa-plus" /> Add Chatroom
								</Link>
							</li>
							<div
								className="modal fade"
								id="exampleModalCenter"
								tabIndex="-1"
								role="dialog"
								aria-labelledby="exampleModalCenterTitle"
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalCenterTitle">
												Create Chatroom
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close"
											>
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<input
												className="popUpInput"
												onChange={this.changeHandler}
												placeholder="Enter Name"
											/>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">
												Close
											</button>
											<li className="nav-item ">
												<Link to="/create" className="nav-link addBtnInPopUp">
													Add Chatroom
												</Link>
											</li>
										</div>
									</div>
								</div>
							</div>

							<li className="nav-item ">
								<Link className="nav-link" to="/setting">
									<i className="fas fa-cog" />Settings
								</Link>
							</li>
							<li className="nav-item dropdown">
								<a
									class="nav-link "
									href="#"
									// id="navbarDropdownMenuLink"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="far fa-caret-square-down" /> Login/SignUp
								</a>

								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									{!this.props.user.username ? (
										<Link className="dropdown-item" to="/login">
											<h6> Login </h6>
										</Link>
									) : (
										<Link to="/login" className="dropdown-item" onClick={this.props.logout}>
											<h6> Log out </h6>
										</Link>
									)}

									<Link to="/signup" className="dropdown-item">
										Sign up
									</Link>
								</div>
							</li>
						</ul>
					</div>
				</nav>
				{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
					<a class="navbar-brand" href="#">
						Navbar
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
						<ul class="navbar-nav mr-auto">
							<li class="nav-item active">
								<a class="nav-link" href="#">
									Home <span class="sr-only">(current)</span>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Link
								</a>
							</li>
							<li class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Dropdown
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<a class="dropdown-item" href="#">
										Action
									</a>
									<a class="dropdown-item" href="#">
										Another action
									</a>
									<div class="dropdown-divider" />
									<a class="dropdown-item" href="#">
										Something else here
									</a>
								</div>
							</li>
							<li class="nav-item">
								<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
									Disabled
								</a>
							</li>
						</ul>
						<form class="form-inline my-2 my-lg-0">
							<input
								class="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button class="btn btn-outline-success my-2 my-sm-0" type="submit">
								Search
							</button>
						</form>
					</div>
				</nav> */}
			</div>
		);
	}
}

const mapStateToProps = (reduxState) => {
	return {
		user: reduxState.user,
		lat: reduxState.lat,
		lng: reduxState.lng
	};
};

export default connect(mapStateToProps, { logout })(Navbar);
