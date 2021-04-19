import React, { Component } from 'react';

class Book extends Component {

  handleChange = ( event ) => {
    let shelfName = event.target.value;
    this.props.updateShelf( this.props.book, shelfName )
  }

  render() {

    const { book } = this.props;
    const image = book.imageLinks.thumbnail;
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ 
            width: 128, 
            height: 193, 
            backgroundImage: `url(${ image })` 
          }}></div>
          <div className="book-shelf-changer">
            <select value={ book.shelf || 'none' } onChange = { this.handleChange }>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.authors ? book.authors.join(', ') : '' }</div>
      </div>
    );
  }
}

export default Book;
