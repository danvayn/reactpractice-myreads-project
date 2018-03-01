import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

//To handle the event of a missing cover image.
import noCover from '../icons/no-cover-image.png'

/**
  component description: a component that represents books

  dropdown functionality:
    value is set to shelf props. in Search, shelf is automatically set to "none"
    if there isn't a shelf chosen for the book displayed.
*/

class Book extends Component {

  static propTypes = {
    imageURL: PropTypes.object,
    title: PropTypes.string.isRequired,
    author: PropTypes.array,
    shelf: PropTypes.string,
    onShelfChange: PropTypes.func.isRequired
  }

  changeShelf = (e) => {
    this.props.onShelfChange(e.target.value)
  }

  render(){
    const imgLink = this.props.imageURL

    //if no imageURL is found, a missing cover image placeholder will be shown
    const imageURL = imgLink && imgLink.thumbnail ? imgLink.thumbnail : noCover

    //if no author is found, the books Author will display as "Unkown Author"
    const author = this.props.author ? this.props.author : ["Unkown Author"]
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${imageURL}")`
              }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={this.changeShelf} value={this.props.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{`${this.props.title}`}</div>

          {author.map((author,index)=>(
            <div
              className="book-authors"
              key={index}
            >{`${author}`}</div>
          ))}
        </div>
</li>
    )
  }
}
export default Book
