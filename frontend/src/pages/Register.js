import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { fetchRegister, selectIsAuth, setCredentials } from '../redux/slices/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegistrationMutation } from '../redux/slices/usersApiSlice';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const isAuth = useSelector(selectIsAuth);
  const { userInfo } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  // const { register, handleSubmit, formState: { errors, isValid } }
  //   = useForm({
  //     defaultValues: {

  //     },
  //     mode: 'onChange'
  //   })


  const [registration, { isLoading }] = useRegistrationMutation();


  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';


  const onSubmit = async (e) => {
    e.preventDefault()
    // const submitHandler = async ( values) => {

    try {
      const res = await registration({ name, password, email }).unwrap();
      //navigate(redirect)
      dispatch(setCredentials({ ...res }));
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }

  // if (isAuth) {
  //   return <Navigate to="/" />
  // }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5">
        Create account
      </Typography>
      <FormControl component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
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
            // {...register('name', { required: 'Enter Full Name' })}
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
            // {...register('email', { required: 'Enter Full Name' })}
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
            // {...register('password', { required: 'Enter Full Name' })}
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
