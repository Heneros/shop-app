import React from 'react';
import { Link  } from 'react-router-dom';
import Style from './Style.css';


const Header = () => {
    return(<div>
    <h1 className="logo">Shop APP</h1>
<div class="ui secondary  menu">
  <Link to="/" className="item"> 
  Home
  </Link>
</div>
</div>);
}


export default Header;