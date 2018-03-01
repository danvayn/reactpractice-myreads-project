import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import * as BooksAPI from './../BooksAPI'

import BookShelf from './BookShelf'

class BookSearch extends Component {

  state = {
    books: [],
    query: '',
    error: ''
  }

  collectBooks = (books) => {
    let bookLibrary = this.props.books
    for (let book of bookLibrary) {
      book.shelf = "none"
    }

    for (let book of books) {
      for (let libraryBook of bookLibrary) {
        if (libraryBook.id === book.id) {
          book.shelf = libraryBook.shelf
        }
      }
    }
  return books
}

  updateQuery = (e) => {
    const query = e.target.value
    this.setState({query: query})
    if (query) { this.searchBooks(query) }
  }

  searchBooks = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query, 10).then((books) => {
        if(books.length > 0){
          books = books.filter((book) => (book.imageLinks))
          books = this.collectBooks(books)
          this.setState({books: books, error: ''})
        } else {
          this.setState({books: [], error: 'show'})
        }
      })
    } else {
      this.setState({books: [], query: ''})
    }
  }

  resetBooks = () => {
    this.setState({books: this.props.books, query: ''})
  }

  render() {
    const books = this.state.books
    const query = this.state.query
    return (
      <div className="search-page">
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={this.updateQuery}
              />
            </div>
          </div>
        </div>
        {this.state.query !== '' && books.length > 0 && (
          <BookShelf
            title="Search Results"
            books={books}
            onShelfChange={(id, shelf) => {
              this.props.onShelfChange(id, shelf)
            }}
          />
        )}
        {this.state.error === "show" &&  books.length === 0 && (
          <div style={{marginTop: 100}}>
          <BookShelf
            title="No Results Found"
            books={books}
            onShelfChange={(id, shelf) => {
              this.props.onShelfChange(id, shelf)
            }}
          />
          </div>
        )}
      </div>
    )
  }
}

export default BookSearch
