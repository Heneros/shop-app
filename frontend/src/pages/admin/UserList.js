import React from 'react'
import { Alert, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import PageHero from '../../components/PageHero';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice';

export default function UserList() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <>
      {isLoading ? (
        < Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <PageHero title="User List Admin" />
          <>
            Content
          </>
        </>
      )}
    </>
  )
}
