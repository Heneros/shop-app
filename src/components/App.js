import React from 'react';
import {  Router} from 'react-router-dom';
import Header from './Header';
import Style from './Style.css';
import history from './history';

const App = () => {
    return(<div>
    <Router history={history}>
      <Header />
    </Router>
</div>
);
};


export default App;