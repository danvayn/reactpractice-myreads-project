import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

/**
  Component description: This component basically represents the main page for
  the app.

  The three shelve types are defined here for the front page.

  This component also has a search link at the bottom of the render.
*/

class Library extends Component {

  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
      id: PropTypes.string.isRequired,
    })),
    onShelfChange: PropTypes.func.isRequired
  }

  shelves = [
    {
      name: `currentlyReading`,
      title: `Currently Reading`
    },
    {
      name: `wantToRead`,
      title: `Want to Read`
    },
    {
      name: 'read',
      title: 'Read'
    },
  ]

  render(){
    const shelves = this.shelves
    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelves.map((shelf,index) => (
              <BookShelf
                title={shelf.title}
                key={index}
                books={books.filter((book) => book.shelf === shelf.name)}
                onShelfChange={(book,shelf) => {
                  this.props.onShelfChange(book,shelf)
                }}
              />
            )) }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Search</Link>
        </div>
      </div>
    )
  }
}
export default Library
