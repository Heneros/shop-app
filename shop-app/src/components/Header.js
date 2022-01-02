import React from 'react';
import { Link  } from 'react-router-dom';
import Style from '../Style.css';
  

const Header = () => {
    return(<div>
    <h1 className="logo">
      <Link to="/">
      Shop 
      </Link>
      </h1>
  <div className="container">
  <div className="navbar navbar-expand-lg navbar-light bg-light">
    <div className='container-fluid'>
  <Link to="/product/addnew" className="nav-link"> 
  Add new product
  </Link>

  <Link to="/" className="nav-link"> 
  Home
  </Link>
  <Link to="/" className="nav-link"> 
   Search New Product
  </Link>
</div>
</div>
</div>
</div>);
} 


export default Header;