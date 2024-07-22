import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { fetchRegister, selectIsAuth, setCredentials } from '../redux/slices/auth';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegistrationMutation } from '../redux/slices/usersApiSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // const isAuth = useSelector(selectIsAuth);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [registration, { isLoading }] = useRegistrationMutation();

  // console.log(error);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';


  const onSubmit = async (e) => {
    e.preventDefault();

 
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await registration({ name, password, email }).unwrap();
        // setError('');
        navigate("/profile");
        // console.log(res)
      } catch (err) { 
        const { data: errorMessage } = err;
        setError(errorMessage.message)
        console.log(err)
      }
    } 
  }

  return (
    <Wrapper>
      <Box sx={{ my: 30 }}>
        <Container component="main" maxWidth="xs" >
          <Typography variant="h4" component="h4">
            Create account
          </Typography>
          <FormControl component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            {error &&  <p className='error-message'>{error}</p>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Name"
                  type="name"
                  focused
                  fullWidth
                  placeholder="Please enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="E-mail"
                  type="email"
                  fullWidth
                  focused
                  placeholder="Please enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  focused
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  focused
                  placeholder="Please confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type='submit' size="large" fullWidth variant="contained" color='success' >Submit</Button>
              </Grid>
            </Grid>
          </FormControl>

          <Typography variant="h5" sx={{ my: 2 }}>
            Have account? <Link
              className='link'
              to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link></Typography>
        </Container>
      </Box>
    </Wrapper>
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