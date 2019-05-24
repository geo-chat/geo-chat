import React, { Component } from "react";
import { login } from "../../store";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password).catch(err => {
      console.log(err);
      alert("invalid username or password");
    });
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>username</label>
        <input
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <label>password</label>
        <input
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { login }
)(Login);
<<<<<<< HEAD
=======
export default Login;
>>>>>>> master
