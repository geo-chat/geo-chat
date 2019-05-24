import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Navbar />
          {routes}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
