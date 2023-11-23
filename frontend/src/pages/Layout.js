import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from '../redux/slices/auth';
import Loader from '../components/Loader';


export default function Layout() {

    return (
        <>

            <Header />
            <div className="container">
                <Loader />
                <Outlet />


            </div>
            <Footer />
        </>
    )
}
