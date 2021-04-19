import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from '../api/BooksAPI';

class ListBookshelves extends Component {

    state = {
        books: []
    }

    filterByBookshelf = (shelf) => {
        return this.state.books.filter( book => book.shelf === shelf )
    }

    updateShelf = (bookToUpdate, newShelf) => {
        this.setState(oldState => ({
            books: oldState.books.map( book => book.id === bookToUpdate.id ? { ...book, shelf:newShelf } : book )
        }))

        BooksAPI.update(bookToUpdate, newShelf);
    }

    componentDidMount(){
        BooksAPI.getAll().then((response) => {
            this.setState({books : response})
        })
    }

    render(){

        const bookshelves = [
            {"title":'Currently Reading', "id":"currentlyReading"},
            {"title":'Want to Read', "id":"wantToRead"}, 
            {"title":'Read', "id":"read" }
        ];

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    {
                        bookshelves.map( shelf => (
                            <Bookshelf 
                                key = { shelf.id } 
                                shelf = { shelf }
                                filterBooks = { this.filterByBookshelf }
                                updateShelf = { this.updateShelf }
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
        );
    }
}

export default ListBookshelves;