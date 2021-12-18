import React from 'react';
import {BrowserRouter, Route,  Router} from 'react-router-dom';
import Header from './Header';
// import Product from './product/product';
import AddNewProduct from './components/product/AddNewProduct';
// import actions from './actions';

import ProductList from './components/product/ProductList';


const App = () => {
    return(
      <div className="ui container">
    <BrowserRouter>
    <div>
    <Header/>
    <Route path="/product/addnew" exact component={AddNewProduct} />
      </div>
    </BrowserRouter>
      <div className="container">
        <ProductList/>

       </div>
</div>
);
};


export default App;