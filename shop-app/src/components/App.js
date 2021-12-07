import React from 'react';
import {BrowserRouter, Route,  Router} from 'react-router-dom';
import Header from './Header';
// import Product from './product/product';
import AddNewProduct from './product/AddNewProduct';
// import actions from './actions';
import PostList from './ProductList';
import UserHeader from './UserHeader';

// import history from './history';



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
   <PostList />
</div>
</div>
);
};


export default App;