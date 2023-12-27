import React, { useEffect, useState } from 'react'
import { Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { useProfileMutation, userApiSlice } from '../redux/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../redux/slices/orderApiSlice';
import { setCredentials } from '../redux/slices/authSlice';

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
    }, [userInfo, userApiSlice.name, userApiSlice.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
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
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h4">User Profile</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4">My orders</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
