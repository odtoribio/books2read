import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../api/BooksAPI';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

    constructor(props){
        super(props);
        this.typingTimeout = null;
    }

    state = {
        books:[],
        searchText:'',
    }

    handleTextInput = ( event ) => {
        const text = event.target.value;
        this.setState({ searchText: text || '' });
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(()=> {
            if (text){
                this.searchBooks(text);
            }else{
                this.cleanBookList()
            }
        },1000)
    }

    searchBooks = ( text ) => {
        const searchResult = [];

        BooksAPI.search( text )
            .then( result => {
                result.forEach( book => {
                    this.props.books.forEach( parentStateBook => {
                        if (book.id === parentStateBook.id){
                            book['shelf'] = parentStateBook.shelf;
                        }
                    })
                    searchResult.push(book);
                })
            })
            .then(() => {
                this.setState({books : searchResult});
            })
    }

    cleanBookList = () =>{
        this.setState({books: []});
    }

    updateShelf = (bookToUpdate, newShelf) => {
        this.setState( oldState => ({
            books: oldState.books.map( book => book.id === bookToUpdate.id ? { ...book, shelf: newShelf } : book )
        }))

        BooksAPI.update(bookToUpdate, newShelf);
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/books2read'>
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
                                        updateShelf = { this.updateShelf }/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired
}

export default SearchBooks;
