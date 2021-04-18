import React from 'react';
import Bookshelf from './components/Bookshelf';
import * as BooksAPI from './api/BooksAPI';
import SearchBooks from './SearchBooks';
import { Route, Link } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {

    state = {
            /**
             * TODO: Instead of using this state variable to keep track of which page
             * we're on, use the URL in the browser's address bar. This will ensure that
             * users can use the browser's back and forward buttons to navigate between
             * pages, as well as provide a good URL they can bookmark and share.
             */
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

    render() {

        const bookshelves = [
            {"title":'Currently Reading', "id":"currentlyReading"},
            {"title":'Want to Read', "id":"wantToRead"}, 
            {"title":'Read', "id":"read" }
        ];

        return (
            <div className="app">
                <Route exact path='/' render= {() => (
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
                            to="/search"
                            className="open-search"
                        >
                            <button>Add a book</button>
                        </Link>
                    </div>
                )}/>

                <Route path='/search' component={SearchBooks}/>
            </div>
        )
    }
}

export default BooksApp