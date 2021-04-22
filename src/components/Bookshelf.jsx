import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Bookshelf = ( props ) =>  {

    const { shelf, filterBooks } = props;
    const books = filterBooks( shelf.id );

    const onUpdateShelf = ( book, shelfName ) => {
        props.updateShelf( book, shelfName )
    }
 
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ shelf.title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map( book => (
                            <li key = { book.id }>
                                <Book 
                                    book = { book }
                                    updateShelf = { onUpdateShelf }/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

Bookshelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    filterBooks: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default Bookshelf;
