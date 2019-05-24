import React from "react";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./App.css";

function App() {
  <Provider>
    <HashRouter>
      return <div className="App" />;
    </HashRouter>
  </Provider>;
=======
import logo from "./logo.svg";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        {routes}
      </div>
    </HashRouter>
  );
>>>>>>> master
}

export default App;
