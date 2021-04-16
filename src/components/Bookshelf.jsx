import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {

    onUpdateShelf = (bookId, newShelf) => {
        this.props.updateShelf(bookId, newShelf)
    }

    render() {
        const { shelf, filterBooks } = this.props;
        const books = filterBooks(shelf.id);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map(book => (
                                <li key = { book.id }>
                                    <Book 
                                        book = { book }
                                        updateShelf = { this.onUpdateShelf }/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;