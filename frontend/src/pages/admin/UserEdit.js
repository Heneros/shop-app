import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { Alert, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import PageHero from '../../components/PageHero';

export default function UserEdit() {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("user updated successfully!");
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }


  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin);
    }
  }, [user])
  return (
    <>
      <PageHero title="User Edit" />
      <Container>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <Typography variant="h5" component="h1">
          Edit User
        </Typography>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert severity='error'>{error?.data?.message || error.error}</Alert>
        ) : (
          <form onSubmit={submitHandler} style={{ margin: "25px 0" }}>
            <TextField
              required
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
              label="Is Admin"
            />
            <Grid xs={12} >
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>

          </form>
        )}
      </Container>
    </>
  )
}
