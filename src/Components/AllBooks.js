import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class AllBooks extends Component {
  state = {
    books: [],
  };

  onSearch = (event) => {
    const title = event.target.value;
    BooksAPI.search(title).then((books) => {
      !Array.isArray(books)
        ? this.setState({ books: [] })
        : this.setState(() => ({
            books,
          }));
    });
  };

  onSelect = (e) => {
    const bookID = e.target.id;
    const selected = e.target.value;
    BooksAPI.get(bookID).then((book) => {
      BooksAPI.update(book, selected);
      if (selected !== "none") {
        switch (selected) {
          case "currentlyReading":
            alert(`${book.title} book is moved to Currently Reading shelf`);
            break;
          case "wantToRead":
            alert(`${book.title} book is moved to Want To Read shelf`);
            break;
          case "read":
            alert(`${book.title} book is moved to Read shelf`);
            break;
          default:
            break;
        }
      }
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length ? (
              this.state.books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks ? book.imageLinks.thumbnail : null
                          })`,
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
              ))
            ) : (
              <p>No Books, Please use search bar</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default AllBooks;
