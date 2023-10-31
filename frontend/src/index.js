import React from 'react';




import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactDOM from 'react-dom/client';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ContactUs from './pages/ContactUs';

import About from './pages/About';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import SingleProduct from './pages/SingleProduct';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }, {
        path: 'products/:id',
        element: <SingleProduct />
      }, {
        path: 'contact-us',
        element: <ContactUs />
      }, {
        path: 'about',
        element: <About />
      }, {
        path: 'cart',
        element: <Cart />
      }, {
        path: 'login',
        element: <Login />
      }, {
        path: 'register',
        element: <Register />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductsProvider>
        <FilterProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </FilterProvider>
      </ProductsProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);