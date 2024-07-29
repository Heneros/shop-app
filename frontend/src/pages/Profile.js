import React, { useEffect, useState } from 'react'
import { Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useProfileMutation } from '../redux/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../redux/slices/orderApiSlice';
import { setCredentials } from '../redux/slices/auth';
import PageHero from '../components/PageHero';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    // console.log(orders);
    // console.log(error);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <>
            <PageHero title="Personal Account" />
            <Container>
                <Grid container sx={{ marginY: '10%' }}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h4">User Profile</Typography>
                        <form onSubmit={submitHandler} style={{ marginTop: '20%' }}>
                            <TextField
                                fullWidth
                                label="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                margin="normal"
                            />
                            <Button variant='outlined' type="submit">
                                Update
                            </Button>
                            {loadingUpdateProfile && <CircularProgress />}
                        </form>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h4">My orders</Typography>
                        {isLoading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography variant="body1" color="error">
                                {error?.data.message || error.error}
                            </Typography>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Paid</TableCell>
                                            <TableCell>Delivered</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell>{order._id}</TableCell>
                                                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                                <TableCell>${order.totalPrice}</TableCell>
                                                <TableCell>
                                                    {order.isPaid ? (
                                                        order.paidAt.substring(0, 10)
                                                    ) : (
                                                        <Typography variant="body1" color="error"><strong>Not Paid</strong></Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {order.isDelivered ? (
                                                        order.deliveredAt.substring(0, 10)
                                                    ) : (
                                                        <Typography variant="body1" color="error"><strong>Not Delivered</strong></Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/order/${order._id}`}>
                                                        <Button variant='contained'>Details</Button>
                                                    </Link>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
