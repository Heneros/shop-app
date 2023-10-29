import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/auth';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';
import styled from 'styled-components';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';



    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <Wrapper>
                <Container component="main" maxWidth="xs" sx={{ my: 10 }}>
                    <Typography variant="h4" component="h4">
                        Login Page
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="E-mail"
                                    type="email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button type="submit" size='large' fullWidth variant="outlined">
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="h5" sx={{ my: 2 }}>
                        New Customer? <Link
                            className='link'
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                        </Link></Typography>
                </Container>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
.link{
    font-size: 1.5rem;
    cursor: pointer;
    color: hsl(22, 28%, 37%);
    letter-spacing: var(--spacing);
}
`