import React from 'react';
import Alert from '@mui/material/Alert';

export default function Message({ variant, children }) {
    return <Alert severity={`${variant}`} sx={{ marginBottom: '20px' }}> {children} </Alert>;
};

