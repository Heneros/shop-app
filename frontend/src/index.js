import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Layout from './pages/Layout';
import Products from './pages/Products';
import ContactUs from './pages/ContactUs';
import './index.css';
import About from './pages/About';
import Product from './components/Product';
import SingleProduct from './components/SingleProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Products />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />
      },
      {
        path: 'contact-us',
        element: <ContactUs />
      },
      {
        path: 'about',
        element: <About />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </React.StrictMode >
);
