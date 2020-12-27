import React, { Component } from "react";
import { Link } from "react-router-dom";
import Read from "./Components/Read";
import CurrentReading from "./Components/CurrentReading";
import WantRead from "./Components/WantRead";

class Home extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <CurrentReading books={this.props.books} />
          <WantRead books={this.props.books} />
          <Read books={this.props.books} />
        </div>

        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default Home;
