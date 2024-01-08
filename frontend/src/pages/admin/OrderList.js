import React from 'react'
import { useGetOrdersQuery } from '../../redux/slices/orderApiSlice'
import { Alert, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import Loader from '../../components/Loader';

import PageHero from '../../components/PageHero';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';


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
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.user && order.user.name}</TableCell>
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/order/${order._id}`} >
                          <Button variant="outlined" size="small">
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </>
      )}
    </>
  )
}
