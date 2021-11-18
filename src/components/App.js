import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Header from './Header';
// import Style from './Style.css';


const App = () => {
    return(<div>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
</div>
);
};


export default App;