import React from 'react';
import { Link  } from 'react-router-dom';
import Style from './Style.css';


const Header = () => {
    return(<div>
    <h1 className="logo">Shop APP</h1>
  <div className="container">
  <div className="ui three item  menu">
  <Link to="/" className="item"> 
  Add new product
  </Link>
  <Link to="/" className="item"> 
  Home
  </Link>
  <Link to="/" className="item"> 
   Search New Product
  </Link>
</div>
</div>
</div>);
}


export default Header;