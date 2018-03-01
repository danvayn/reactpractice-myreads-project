import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookSearch from './components/BookSearch'
import Library from './components/Library'

/*
  App code here. on mount, a call is made to the API to get the starter books.
  Then, the books are displayed via rendering the Library. If /search is navigated
  to BookSearch is rendered.
*/

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

  //The main function for changing bookshelves. Most other components have this
  //function passed to them in order to update book shelves so as to keep code DRY.
  changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      this.getBooks()
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
        <Route exact path="/search"
          render={({ history }) => (
            <BookSearch
              bookArchive={this.state.books}
              onShelfChange={(book,shelf) => {
                this.changeShelf(book,shelf)
                history.push('/')
              }}/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
