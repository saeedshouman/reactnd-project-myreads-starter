import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AllBooks from "./Components/AllBooks";
import Home from "./Home";
import { BrowserRouter, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  onSearch = (e) => {
    console.log(this.state.books);
  };
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => <Home books={this.state.books} />}
          />

          <Route
            path="/search"
            render={() => <AllBooks books={this.state.books} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
