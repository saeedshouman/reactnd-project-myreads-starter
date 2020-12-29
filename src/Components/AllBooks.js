import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class AllBooks extends Component {
  //we need 2 states one for search books and the other for home page' books to compare.
  state = {
    books: [],
    booksHome: [],
  };
  //get home' books.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        booksHome: books,
      }));
    });
  }
  onSearch = (event) => {
    const title = event.target.value;
    BooksAPI.search(title).then((booksGet) => {
      !Array.isArray(booksGet)
        ? this.setState({ books: [] })
        : booksGet.map((book) => {
          //let's compare between the home page' books and the searched one, and link to each shelf.
            const bookHome = this.state.booksHome.find((b) => book.id === b.id);
            if (bookHome) {
              book.shelf = bookHome.shelf;
              return book;
            }
            book.shelf = "none";
            return book;
          });
      this.setState(() => ({ books: booksGet }));
    });
  };
//update books after adding them to new shelf.
  onSelect = (e) => {
    const bookID = e.target.id;
    const selected = e.target.value;
    BooksAPI.get(bookID).then((book) => {
      BooksAPI.update(book, selected);
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
