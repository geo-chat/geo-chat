import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";
import { getCoords, getRooms, getUser } from "../../store";

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderRooms = this.renderRooms.bind(this);
  }
  async componentDidMount() {
    this.props.getUser();
    this.renderRooms();
  }
  deleteRoom = chatid => {
    axios
      .delete(`/api/chat/deleteroom/${chatid}`)
      .then(res => this.renderRooms())
      .catch(err => err);
  };
  async renderRooms() {
    await this.props.getCoords();
    if (this.props.lat !== 0 && this.props.lng !== 0) {
      this.props.getRooms(this.props.lat, this.props.lng);
    }
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Navbar renderRooms={this.renderRooms} />
        {/* CHAT-ROOM PRODUCT CARD */}
        <section className="menuIntro">
          <div className="jumbotron">
            <h1 className="display-4">Geo-Chat</h1>
            <p className="lead">
              Welcome to Geo-chat! find a room that piques your interest and
              chat with users with mutual interests Nearby. Don't see a room you
              like? create a room, invite your friends, and meet new people!
            </p>
          </div>
        </section>
        <main className="chatRooms">
          {this.props.rooms[0] ? (
            this.props.rooms.map((room, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {room.member} members
                  </h6>

                  <Link
                    to={`/chatroom/${room.id}/${room.name}`}
                    className="card-link"
                  >
                    Enter Chatroom
                  </Link>
                  {room.userid === this.props.user.id ? (
                    <button
                      className="deleteBtnHome"
                      onClick={() => this.deleteRoom(room.id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <h2>Be the first to create a Chatroom in your area!</h2>
          )}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lat: state.lat,
    lng: state.lng,
    rooms: state.rooms,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getCoords, getRooms, getUser }
)(Home);
