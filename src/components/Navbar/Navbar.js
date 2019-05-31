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
									<i class="fas fa-home" /> Home <span class="sr-only">(current)</span>
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
			</div>
		);
	}
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { logout })(Navbar);
