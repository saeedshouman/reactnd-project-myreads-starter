import React, { Component } from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";
import Read from "./Components/Read";


class Home extends Component {
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
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Read books={this.state.books} />
        </div>

        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default Home;
