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
					<a className="navbar-brand" href="#">
						<img
							src="https://banner2.kisspng.com/20180424/oaq/kisspng-honda-logo-car-2007-honda-cr-v-decorative-stickers-5adfa878c61c14.8927719915246070968115.jpg"
							className=" topnavBarImage d-inline-block align-center"
							alt=""
						/>
						Geo-Chat
					</a>

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
									<a className="dropdown-item" href="#">
										Action
									</a>
									<a className="dropdown-item">Chat-room</a>
								</div>
							</li>
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

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { logout })(Navbar);
