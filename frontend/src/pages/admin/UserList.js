import React from 'react'
import { Alert, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
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
            <Container>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, overflowX: { xs: 'auto' } }} >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>EMAIL</TableCell>
                      <TableCell>ADMIN</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <>
                        <TableRow key={user._id}>
                          <TableCell>{user._id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell><a href={`mailto:${user.email}`}> {user.email}</a></TableCell>
                          <TableCell> {user.isAdmin ? (<FaCheck style={{ color: 'green' }} />) : (<FaTimes style={{ color: 'red' }} />)}
                          </TableCell>
                          <TableCell>
                            {!user.isAdmin && (
                              <>
                                <Link to={`/admin/user/${user._id}/edit`} >
                                  <Button variant="outlined"><FaEdit /></Button>
                                </Link>
                                <Button variant="outlined" onClick={() => deleteHandler(user._id)}>
                                  <FaTrash style={{ color: 'red' }} />
                                </Button>
                              </>
                            )} </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </>
        </>
      )
      }
    </>
  )
}
