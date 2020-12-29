import React from "react";
import "./App.css";
import AllBooks from "./Components/AllBooks";
import Home from "./Home";
import { BrowserRouter, Route } from "react-router-dom";

class BooksApp extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => <Home />}
          />

          <Route
            path="/search"
            render={() => <AllBooks />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
