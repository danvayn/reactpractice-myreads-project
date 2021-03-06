import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import * as BooksAPI from './../BooksAPI'

import BookShelf from './BookShelf'

/**
  Component description: this component represents the search page for this app.

  Runtime description: Upon typing into the box at the top, updateQuery kicks off
    and runs searchBooks which in turn runs collectBooks.

  function updateQuery:

  function searchBooks: makes an API call to search the query, then runs collectBooks.
    will set an error State if a query is entered but books are not found.

  function collectBooks: merges the search results from the API call with the
    books saved in the archive to display books found with proper shelves.

*/

class BookSearch extends Component {

  static propTypes = {
    bookArchive: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
      id: PropTypes.string.isRequired
    })),
    onShelfChange: PropTypes.func.isRequired
  }


  state = {
    books: [],
    query: '',
    error: ''
  }

  //gets the query from the box, then searches if its not blank.
  updateQuery = (e) => {
    const query = e.target.value
    this.setState({query: query})
    if (query) { this.searchBooks(query) }
  }

  //makes an API call to search the query, then runs collectBooks. will set an
  //error State if a query is entered but books are not found.
  searchBooks = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query, 10).then((books) => {
        if(books.length > 0){
          books = this.collectBooks(books, this.props.bookArchive)
          this.setState({books: books, error: ''})
        } else {
          this.setState({books: [], error: 'show'})
        }
      })
    } else {
      this.setState({books: [], query: ''})
    }
  }

  //merges the search results from the API call with the books saved in the
  //archive to display books found with proper shelves.
  collectBooks = (book,bookArchive) => {
    return book.map((book)=>{
      bookArchive.forEach((archivedBook)=>{
        if(archivedBook.id === book.id){
          book.shelf = archivedBook.shelf
          return
        }
      })
      return book
    })
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
        //display this if the query box isn't empty and results are found.
        {this.state.query !== '' && books.length > 0 && (
          <BookShelf
            title="Search Results"
            books={books}
            onShelfChange={(id, shelf) => {
              this.props.onShelfChange(id, shelf)
          }}/>
        )}
        //display this if no books are found and the error flag is assigned.
        { this.state.error === "show" && books.length === 0 && (
          <div style={{marginTop: 100}}>
            <BookShelf
              title="No Books Found"
              books={books}
              onShelfChange={(id, shelf) => {
                this.props.onShelfChange(id, shelf)
            }}/>
          </div>
        )}
      </div>
    )
  }
}

export default BookSearch
