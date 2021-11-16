import React from 'react';
import Style from './Style.css';


const Header = () => {
    return(<div>
    <h1 className="logo">Shop APP</h1>
<div class="ui secondary  menu">
  <a class="item active">
    Home
  </a>
  <a class="item">
    Messages
  </a>
  <a class="item">
    Friends
  </a>
  <div class="right menu">
    <div class="item">
      <div class="ui icon input">
      <input type="text" />
      </div>
    </div>
    <a class="ui item">
      Logout
    </a>
  </div>
  </div>
</div>);
}


export default Header;