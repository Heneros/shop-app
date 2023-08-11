import React from 'react';




import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactDOM from 'react-dom/client';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ContactUs from './pages/ContactUs';
import './index.css';
import About from './pages/About';
import SingleProduct from './components/SingleProduct';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
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
    <Provider store={store}>
      <ProductsProvider>
        <FilterProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </FilterProvider>
      </ProductsProvider>
    </Provider>
  </React.StrictMode>
);