import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";

class CurrentReading extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  onSelect = (e) => {
    const bookID = e.target.id;
    const selected = e.target.value;
    BooksAPI.get(bookID).then((book) => {
      BooksAPI.update(book, selected);
      if (selected !== "currentlyReading") {
        switch (selected) {
          case "read":
            alert(`${book.title} book is moved to Read shelf`);
            break;
          case "wantToRead":
            alert(`${book.title} book is moved to Want To Read shelf`);
            break;
          case "none":
            alert(`${book.title} book is removed`);
            break;
        }
      }
    });
  };

  render() {
    const { books } = this.props;
    const showBooks = books.filter((book) =>
      book.shelf.includes("currentlyReading")
    );

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail}`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        id={book.id}
                        onChange={this.onSelect}
                        value="move"
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default CurrentReading;
