import React from 'react';
import {Router,  Route, } from 'react-router-dom';
import Header from './components/Header';
import AddNewProduct from './components/product/AddNewProduct';
import ProductEdit from './components/product/ProductEdit';
import ProductDelete from './components/product/ProductDelete';

import ProductList from './components/product/ProductList';
import history from './history';


const App = () => {
    return(
      <div className="ui container">
    <Router history={history}>
    <div>
    <Header/> 
    <Route path="/" exact component={ProductList} />
    <Route path="/product/addnew" exact component={AddNewProduct} />
    <Route path="/product/edit/:id" exact component={ProductEdit} />
    <Route path="/product/delete" exact component={ProductDelete} />
    </div>
    </Router>
</div>
);
};


export default App;