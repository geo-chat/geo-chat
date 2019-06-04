import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: null,
			lng: null,
			chatName: ''
		};
		this.clickHandler = this.clickHandler.bind(this);
	}
	async componentDidMount() {
		axios.get('/api/auth/getuser').catch((err) => err);
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position.coords);
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
		});
	}
	changeHandler = (e) => {
		this.setState({ chatName: e.target.value });
	};
	async clickHandler() {
		console.log(this.state);
		await axios
			.post('/api/chat/create', {
				name: this.state.chatName,
				lat: this.state.lat,
				lng: this.state.lng
			})
			.catch((err) => console.log(err));
		this.setState({ chatName: '' });
	}
	render() {
		return (
			<div>
				<Navbar />
				{/* CHAT-ROOM PRODUCT CARD */}
				<section className="menuIntro">
					<div class="jumbotron">
						<h1 class="display-4">Chat Room</h1>
						<p class="lead">Welcome to Geo-Chat where you can chat with other people.</p>
						{/* SEARCH BAR */}
						<form class="navbar-form " role="search">
							<div class="input-group">
								<input type="search" class="form-control" placeholder="Search" />
								<button type="submit" class="btn btn-outline-custom">
									<i class="fas fa-search" />
								</button>
							</div>
						</form>

						{/* 
						<a href="#about" class="scroll-icon smoothscroll">
							<i class="fas fa-angle-down" aria-hidden="true" />
						</a> */}
					</div>
				</section>

				<main className="chatRooms">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<Link to="/chatroom/test" class="card-link">
								Enter Chat Room
							</Link>
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<a href="#" class="card-link">
								Enter Chat Room
							</a>
						</div>
					</div>

					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<a href="#" class="card-link">
								Enter Chat Room
							</a>
						</div>
					</div>

					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<a href="#" class="card-link">
								Enter Chat Room
							</a>
						</div>
					</div>

					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<a href="#" class="card-link">
								Enter Chat Room
							</a>
						</div>
					</div>

					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Card title</h5>
							<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
							<p class="card-text">
								Some quick example text to build on the card title and make up the bulk of the card's
								content.
							</p>
							<a href="#" class="card-link">
								Enter Chat Room
							</a>
						</div>
					</div>
				</main>

				<section className="chatRoomInfo">
					<div className="productInfo">
						<img
							className="chat-room-image"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFky8r6qohFr-P7vGduFMmNCpAAjxYhBP5m8Ltz07a4RN-sOVquQ"
							alt="chat-room"
						/>
						<h1>Chat</h1>
						<p className="text">
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
							of type and scrambled it to make a type specimen book.
						</p>
					</div>
					<div className="productInfo">
						<img
							className="chat-room-image"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFky8r6qohFr-P7vGduFMmNCpAAjxYhBP5m8Ltz07a4RN-sOVquQ"
							alt="chat-room"
						/>
						<h1>Chat</h1>
						<p className="text">
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
							of type and scrambled it to make a type specimen book.
						</p>
					</div>
					<div className="productInfo">
						<img
							className="chat-room-image"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFky8r6qohFr-P7vGduFMmNCpAAjxYhBP5m8Ltz07a4RN-sOVquQ"
							alt="chat-room"
						/>
						<h1>Chat</h1>
						<p className="text">
							is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
							of type and scrambled it to make a type specimen book.
						</p>
					</div>
				</section>
				<input onChange={this.changeHandler} />
				<button onClick={this.clickHandler}>Add ChatRoom</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}
export default connect(mapStateToProps)(Home);
