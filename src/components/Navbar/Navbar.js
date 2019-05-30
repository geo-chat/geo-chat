import React, { Component } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store";

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
                  <i class="fas fa-home" /> Home{" "}
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
        {/* CHAT-ROOM PRODUCT CARD */}
        <section className="menuIntro">
          <div class="jumbotron">
            <h1 class="display-4">Chat Room</h1>
            <p class="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            {/* SEARCH BAR */}
            <form class="navbar-form " role="search">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search"
                />
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
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
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
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
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
