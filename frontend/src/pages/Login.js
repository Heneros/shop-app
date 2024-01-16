import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


import { useAuthGoogleQuery, useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/auth';
import { fetchAuthMe, selectIsAuth } from '../redux/slices/auth';
import styled from 'styled-components';
import axios from 'axios';


export default function Login() {
    const [email, setEmail] = useState('rustam@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();


    // const { authGoogle } = useAuthGoogleQuery();

    const { userInfo } = useSelector((state) => state.auth);


    // console.log(authGoogle);

    const handleLogin = async (e) => {
        e.preventDefault();
        //  window.open('http://localhost:3005/auth/google', '_self');
    }


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
         
            const res = await login({ email, password }).unwrap();
            setError('');  
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
          
            //     setError(true);
            //     console.log( res.error);
            // } else {
            //     setError(false); 
            // }
            // // console.log(res);
        } catch (err) {
            const { data: errorMessage } = err;
            setError(errorMessage.message);  
            console.log(errorMessage);
        }
    }




    return (
        <>
            <Wrapper>
                <Box sx={{ my: 30 }}>
                    <Container component="main" maxWidth="xs" >
                        <Typography variant="h4" component="h4">
                            Login Page
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                            {error && <p className="error-message">{error}</p>}
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
                        <div onClick={handleLogin} id="loginBtn">Login</div>
                        <Typography variant="h5" sx={{ my: 2 }}>
                            New Customer? <Link
                                className='link'
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                Register
                            </Link></Typography>
                    </Container>
                </Box>
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