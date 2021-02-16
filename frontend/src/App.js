import React, { Component } from "react";
import "./App.css";
import { BaseRouter } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <BaseRouter />
        </Router>
      </div>
    );
  }
}

export default App;