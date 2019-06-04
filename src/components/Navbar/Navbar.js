import React, { Component } from 'react';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store';

class Navbar extends Component {
	handleLogout = () => {
		this.props.logout();
	};
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
						Geo-Chat
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="nav navbar-nav ml-auto">
							<li className="nav-item active">
								<Link to="/" className="nav-link">
									<i className="fas fa-home" /> Home <span className="sr-only">(current)</span>
								</Link>
							</li>

							<li className="nav-item dropdown">
								<a
									className="nav-link"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="far fa-caret-square-down" /> Dropdown
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

							<button
								// type="button"
								class="btn btn-primary"
								data-toggle="modal"
								data-target="#exampleModalCenter"
							>
								<i class="fas fa-plus" />
								<Link to="/create" className="dropdown-item">
									Add Chatroom
								</Link>
							</button>

							<div
								class="modal fade"
								id="exampleModalCenter"
								tabindex="-1"
								role="dialog"
								aria-labelledby="exampleModalCenterTitle"
								aria-hidden="true"
							>
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalCenterTitle">
												Modal title
											</h5>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">....</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">
												Close
											</button>
											<button type="button" class="btn btn-primary">
												<Link to="/create" className="dropdown-item">
													Add Chatroom
												</Link>
											</button>
										</div>
									</div>
								</div>
							</div>
							<li className="nav-item ">
								<Link className="nav-link" to="/setting">
									<i className="fas fa-cog" /> Settings
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = (reduxState) => {
	console.log(reduxState);
	return {
		user: reduxState.user
	};
};

export default connect(mapStateToProps, { logout })(Navbar);
