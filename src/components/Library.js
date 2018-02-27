import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

class Library extends Component {

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
                  { shelves.map((shelf,index)=> (
                    <BookShelf
                      title={shelf.title}
                      key={index}
                      books={books.filter((book) => book.shelf === shelf.name)}
                    />
                  )) }
                </div>
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                >Search</Link>
              </div>
      </div>
    )
  }
}
export default Library
