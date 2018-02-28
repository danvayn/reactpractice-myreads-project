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

  changeShelf = (id,shelf) => {
    BooksAPI.update({id},shelf).then(() => {
      this.getBooks()
      // TODO: update book shelf without making an external API call
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
                onShelfChange={(id,shelf) => {
                  this.changeShelf(id,shelf)
                }}
              />
            )}
          />
        <Route path="/search"
          render={() => (
            <BookSearch
              books={this.state.books}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
