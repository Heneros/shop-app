import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Register() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [passwprd, setPassword] = useState('');

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';


  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {},
    mode: 'onChange'
  })

  const submitHandler = async (values) => {

    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      return alert('Failed to register')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);

    }
    // console.log(123)
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5">
        Create account
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit(submitHandler)} className='form-test' sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Name"
              type="name"
              focused
              fullWidth
              placeholder="Please enter name"
              {...register('name', {})}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              focused
              placeholder="Please enter email"
              {...register('email', {})}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              focused
              placeholder="Please enter password"
              {...register('password', {})}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' size="large" fullWidth variant="contained" color='success' >Submit</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}
