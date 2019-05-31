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
                  <i className="fas fa-home" /> Home{" "}
                  <span className="sr-only">(current)</span>
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
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
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
        {/* CHAT-ROOM PRODUCT CARD */}
        <section className="menuIntro">
          <div className="jumbotron">
            <h1 className="display-4">Chat Room</h1>
            <p className="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            {/* SEARCH BAR */}
            <form className="navbar-form " role="search">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="submit" className="btn btn-outline-custom">
                  <i className="fas fa-search" />
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
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Enter Chat Room
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Enter Chat Room
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Enter Chat Room
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Enter Chat Room
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Enter Chat Room
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
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
