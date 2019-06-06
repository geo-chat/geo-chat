import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";

function App() {
  return <HashRouter>{routes}</HashRouter>;
}

export default App;
