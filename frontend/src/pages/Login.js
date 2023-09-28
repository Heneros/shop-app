import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';
import { useForm } from 'react-hook-form';


export default function Login() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const { register, handleSubmit, formState: {
        error, isValie
    } } = useForm({
        defaultValues: {

        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuthMe(values))
        console.log(data);
        if (!data.payload) {
            return alert('data error payload')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            // navigate(redirect);
        } else {
            alert('Failed to log in')
        }
        dispatch(fetchAuthMe(values));
    }

    // if (isAuth) {
    //     return <Navigate to="/" />
    // }

    return (
        <>
            <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
                <Typography>
                    Login Page
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="E-mail"
                                type="email"
                                fullWidth
                                {...register('email', { required: 'Enter Email' })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                {...register('password', { required: 'Enter password' })}
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
                </Link></Typography>

            </Container>
        </>
    )
}
