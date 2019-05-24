import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";
import Signup from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Settings from "./components/Setting/Settings";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Navbar />
          <Login />
          <Settings />
          {routes}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
