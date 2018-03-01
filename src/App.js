import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookSearch from './components/BookSearch'
import Library from './components/Library'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount(){
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      this.getBooks()
      // TODO: update book shelf without having to make a get call to booksAPI
    })
}

  render() {

    return (
      <div className="app">
          <Route
            exact
            path="/"
            render={()=>(
              <Library
                books={this.state.books}
                onShelfChange={(book,shelf) => {
                  this.changeShelf(book,shelf)
                }}
              />
            )}
          />
        <Route path="/search"
          render={({ history }) => (
            <BookSearch
              books={this.state.books}
              onShelfChange = {(book,shelf) => {
                this.changeShelf(book,shelf)
                history.push('/')
              }}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
