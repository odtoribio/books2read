import React from 'react';
import PropTypes from 'prop-types';

const Book = ( props ) => {

  const { book } = props;
  const image = book.imageLinks ? book.imageLinks.thumbnail : '';

  const handleChange = ( event ) => {
    let shelfName = event.target.value;
    props.updateShelf( book, shelfName )
  }
  
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ 
          width: 128, 
          height: 193, 
          backgroundImage: `url(${ image })` 
        }}></div>
        <div className="book-shelf-changer">
          <select value={ book.shelf || 'none' } onChange = { handleChange }>
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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Book;
