import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import Book from './Book'

/**
  Component description: BookShelf is used to display a collection of books.
*/

class BookShelf extends Component {

  //a Title must be passed but the books array is allowed to be empty incase the shelves are empty.
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
  }

  render(){
    const books = this.props.books
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book,index) => (
              <Book
                imageURL={book.imageLinks}
                title={book.title}
                author={book.authors}
                key={``.concat(book.id,index)}
                shelf={book.shelf || "none"}
                onShelfChange={(shelf) => {
                  this.props.onShelfChange(book,shelf)
              }}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
