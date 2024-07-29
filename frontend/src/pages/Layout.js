import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import styled from 'styled-components'


export default function Layout() {

    return (
        <>

            <Header />
            <div className="container">
                <Main>
                    <Loader />
                    <Outlet />
                </Main>
            </div>
            <Footer />
        </>
    )
}


const Main = styled.main`
 min-height: 100vh;
`;