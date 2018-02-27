import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import Book from './Book'

class BookShelf extends Component {
  render(){
    const books = this.props.books
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book,index)=>(
              <Book
                imageURL={book.imageLinks}
                title={book.title}
                author={book.authors}
                key={``.concat(book.id,index)}
                shelf={book.shelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
