import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from '../redux/slices/auth';


export default function Layout() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAuthMe());
    // }, []);

    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
