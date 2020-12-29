import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

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
  onSelect = (e) => {
    const bookID = e.target.id;
    const selected = e.target.value;
    BooksAPI.get(bookID).then((book) => {
      book.shelf = selected;
      BooksAPI.update(book, book.shelf);
      this.setState((state) => ({
        books: state.books.filter((b) => b.title !== book.title).concat([book]),
      }));
    });
  };
  render() {
    const { books } = this.state;
    const shelves = [
      { shelfText: "Currently Reading", shelftSelect: "currentlyReading" },
      { shelfText: "Want to Read", shelftSelect: "wantToRead" },
      { shelfText: "Read", shelftSelect: "read" },
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelfItem) => (
            <div className="bookshelf" key={shelfItem.shelftSelect}>
              <h2 className="bookshelf-title">{shelfItem.shelfText}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) =>
                      book.shelf.includes(shelfItem.shelftSelect)
                    )
                    .map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${
                                  book.imageLinks
                                    ? book.imageLinks.thumbnail
                                    : null
                                }`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                id={book.id}
                                onChange={this.onSelect}
                                value={book.shelf}
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
          ))}
        </div>

        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default Home;
