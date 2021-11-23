import React from 'react';
// import {BrowserRouter, Route,  Router} from 'react-router-dom';
// import Header from './Header';
// import Product from './product/product';
// import AddNewProduct from './product/add-new-product';
// import actions from './actions';
import PostList from './ProductList';


// import Style from './Style.css';
// import history from './history';



const App = () => {
    return(<div>
   <PostList />
    {/* <Router history={history}>
      <Header />
      <Product/>
 
      <AddNewProduct/>
    </Router> */}
</div>
);
};


export default App;