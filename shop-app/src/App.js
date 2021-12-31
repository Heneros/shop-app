import React from 'react';
import {BrowserRouter, Route, Router} from 'react-router-dom';
import Header from './components/Header';
// import Product from './product/product';
import AddNewProduct from './components/product/AddNewProduct';
import ProductEdit from './components/product/ProductEdit';

// import actions from './actions';
import ProductList from './components/product/ProductList';
import history from './history';


const App = () => {
    return(
      <div className="ui container">
    <Router history={history}>
 
    <Header/> 
    <Route path="/" exact component={ProductList} />
    <Route path="/product/addnew" exact component={AddNewProduct} />
    <Route path="/product/edit/:id" exact component={ProductEdit} />
    </Router>
</div>
);
};


export default App;