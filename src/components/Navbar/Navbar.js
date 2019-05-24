import React from 'react';
import '../Navbar/Navbar.css';
function Navbar() {
	return (
		<div>
			<nav class="navbar navbar-light bg-custom">
				<a class="navbar-brand">Logo</a>
				<i class="fas fa-cog" />
			</nav>
			<form class="form-inline">
				<input
					class="searchInput form-control mr-sm-2"
					type="search"
					placeholder="Search"
					aria-label="Search"
				/>
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">
					<i class="fas fa-search" />
				</button>
			</form>
		</div>
	);
}

export default Navbar;
