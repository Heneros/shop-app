import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { fetchAuthMe } from '../redux/slices/auth';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const onSubmit = async(values) =>{;
        const data = await dispatch(fetchAuthMe(values))
        if(!data.payload){
            return alert('Failed to log in')
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
                <Typography>
                    Login Page
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="E-mail"
                                type="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button type="submit" size='large' fullWidth variant="outlined">
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="h5" > New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>  </Typography>
            </Container>
        </>
    )
}
