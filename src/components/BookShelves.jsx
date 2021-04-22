import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

const BookShelves = (props) => {

    const bookshelves = [
        { "title": 'Currently Reading', "id": "currentlyReading" },
        { "title": 'Want to Read', "id": "wantToRead" },
        { "title": 'Read', "id": "read" }
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        bookshelves.map(shelf => (
                            <Bookshelf
                                key={shelf.id}
                                shelf={shelf}
                                filterBooks={props.filterByBookshelf}
                                updateShelf={props.updateShelf}
                            />
                        ))
                    }
                </div>
            </div>
            <Link
                to="/books2read/search"
                className="open-search"
            >
                <button>Add a book</button>
            </Link>
        </div>
    )
    
}

BookShelves.propTypes = {
    filterByBookshelf: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default BookShelves;
