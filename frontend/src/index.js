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
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import './index.css';
import SingleProduct from './pages/SingleProduct';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import Payment from './pages/Payment';
import Order from './pages/Order';
import Profile from './pages/Profile';

import OrderList from './pages/admin/OrderList'
import ProductEdit from './pages/admin/ProductEdit'
import ProductList from './pages/admin/ProductList'
import UserEdit from './pages/admin/UserEdit'
import UserList from './pages/admin/UserList'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      path: '/',
      element: <HomePage />
    }, {
      path: '/page/:pageNumber',
      element: <HomePage />
    }, {
      path: '/page/:keyword',
      element: <HomePage />
    }, {
      path: '/page/:keyword/page/:pageNumber',
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
    }, {
      element: <PrivateRoute />,
      children: [
        {
          path: 'shipping',
          element: <Shipping />
        },
        {
          path: 'placeorder',
          element: <PlaceOrder />
        }, {
          path: 'payment',
          element: <Payment />
        }, {
          path: 'order/:id',
          element: <Order />
        }, {
          path: 'profile',
          element: <Profile />
        },

      ]
    }, {
      element: <AdminRoute />,
      children: [
        {
          path: '/admin/orderlist',
          element: <OrderList />
        },
        {
          path: '/admin/productlist',
          element: <ProductList />
        },
        {
          path: '/admin/productlist/:pageNumber',
          element: <ProductList />
        },
        {
          path: '/admin/product/:id/edit',
          element: <ProductEdit />
        }, {
          path: '/admin/userlist',
          element: <UserList />
        }, {
          path: '/admin/user/:id/edit',
          element: <UserEdit />
        },
      ]
    }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);