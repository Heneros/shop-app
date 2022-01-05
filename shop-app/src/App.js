import React from 'react';
import {Router,  Route, } from 'react-router-dom';
import Header from './components/Header';
import AddNewProduct from './components/product/AddNewProduct';
import ProductEdit from './components/product/ProductEdit';

import ProductList from './components/product/ProductList';
import history from './history';


const App = () => {
    return(
      <div className="ui container">
    <Router history={history}>
    <div>
    <Header/> 
    <Route path="/" exact component={ProductList} />
    <Route path="/products/addnew" exact component={AddNewProduct} />
    <Route path="/products/edit/:id" exact component={ProductEdit} />
    </div>
    </Router>
</div>
);
};


export default App;