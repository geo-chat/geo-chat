import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";
import store from "./store";
import { Provider } from "react-redux";
import Signup from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Navbar />
<<<<<<< HEAD
=======
          <Login />
>>>>>>> master
          {routes}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
