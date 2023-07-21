import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      path: 'products',
      element: <Products />
    }]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RouterProvider router={router}>
      <Provider>

      </Provider>
    </RouterProvider>
  </React.StrictMode>
);
