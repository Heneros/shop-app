import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

export default function Loader() {
    const [showLoader, setShowLoader] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1300)
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showLoader && (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            )}
        </>
    );
}
