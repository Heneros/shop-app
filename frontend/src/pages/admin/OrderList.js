import React from 'react'
import { useGetOrdersQuery } from '../../redux/slices/orderApiSlice'
import { Alert, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Loader from '../../components/Loader';

import PageHero from '../../components/PageHero';


export default function OrderList() {

  const { data: orders, isLoading, error } = useGetOrdersQuery()
  console.log(orders);

  return (
    <>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <PageHero title="Order List Admin" />
          <Container>
            <Typography sx={{
              my: 5,
              fontSize: {
                xl: 30,
                lg: 30,
                md: 20,
                sm: 20,
                xs: 20,
              },
              fontWeight: 600
            }} variant="h3">Orders</Typography>
            <TableContainer >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>USER</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>PAID</TableCell>
                    <TableCell>DELIVERED</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </>
      )}
    </>
  )
}
