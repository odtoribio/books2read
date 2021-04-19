import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../api/BooksAPI';

class SearchBooks extends Component {

    constructor(props){
        super(props);
        this.typingTimeout = null;
    }

    state = {
        books: [],
        searchText:''
    }

    handleTextInput = ( event ) => {
        const text = event.target.value;
        this.setState({ searchText: text || '' });
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(()=> {
            BooksAPI.search(text)
                .then( result => {
                    this.setState( prevState => ({
                        books: Array.isArray(result) ? result : []
                    }));
                })
        },1000)
    }

    onUpdateShelf = (bookToUpdate, newShelf) => {
        this.setState( oldState => ({
            books: oldState.books.map( book => book.id === bookToUpdate.id ? { ...book, shelf:newShelf } : book )
        }))

        BooksAPI.update(bookToUpdate, newShelf);
    }

    render(){
        console.log("libros", this.state.books);
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={ this.state.searchText } onChange={ this.handleTextInput }/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.books.map( book => (
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
        )
    }
}

export default SearchBooks;