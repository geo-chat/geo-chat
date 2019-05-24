import React, { Component } from 'react';
import '../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<div>
				<nav class="navbar navbar-expand-lg navbar-light bg-custom">
					<a class="navbar-brand" href="#">
						Logo
					</a>

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
				<form class="form-inline">
					<input
						class="searchInput form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<button class="btn btn-outline-custom my-2 my-sm-0" type="submit">
						<i class="fas fa-search" />
					</button>
				</form>
			</div>
		);
	}
}

export default Navbar;
