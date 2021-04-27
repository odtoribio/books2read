import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import BookShelves from './components/BookShelves';
import * as BooksAPI from './api/BooksAPI';
import './App.css';

class BooksApp extends Component {

    state = {
        books: []
    }

    componentDidMount = () => {
        console.log('component did mount');
        BooksAPI.getAll().then((response) => {
            this.setState({books : response})
        })
    }

    filterByBookshelf = (shelf) => {
        return this.state.books.filter( book => book.shelf === shelf )
    }

    updateShelf = (bookToUpdate, newShelf) => {
        this.setState( oldState => ({
            books: oldState.books.map( book => book.id === bookToUpdate.id ? { ...book, shelf: newShelf } : book )
        }))

        BooksAPI.update(bookToUpdate, newShelf);
    }

    render(){


        return (
            <div className="app">
                <Route exact path='/books2read' component = { () => <BookShelves 
                    filterByBookshelf={ this.filterByBookshelf }
                    updateShelf={ this.updateShelf }
                />}/>
                <Route path='/books2read/search' component={ () => <SearchBooks 
                    books = {this.state.books}
                /> }/>
            </div>
        )
    }
}

export default BooksApp
