import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBookshelves from './components/ListBookshelves';
import './App.css';

class BooksApp extends React.Component {

    render() {

        return (
            <div className="app">
                <Route exact path='/books2read' component= { ListBookshelves }/>
                <Route path='/books2read/search' component={ SearchBooks }/>
            </div>
        )
    }
}

export default BooksApp
