import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Container, List, ListItem, ListItemText, Divider, CardContent, Grid, Button, Box, Alert } from '@mui/material';


import { useGetOrderDetailsQuery } from '../redux/slices/orderApiSlice';
import Loader from '../components/Loader';
import PageHero from '../components/PageHero';
import { formatPrice } from '../utils/helpers';

export default function Order() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);


  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);




  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">error  </Alert>
  ) : (
    <>
      <PageHero title="Details" />
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
        }} variant="h3">Order #{order._id}</Typography>
        <Box sx={{
          my: 3,
          display: 'flex',
          flexDirection: {
            md: 'row',
            sm: 'column',
            xs: 'column',

          }
        }}>
          <Grid item md={7}>
            <List>
              <ListItem sx={{ mt: 2 }}>
                <Typography variant="h5">Address:</Typography>
              </ListItem>
              <ListItemText>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </ListItemText>
              <ListItem>
                <ListItemText>
                  {order.isDelivered ? (
                    <Alert severity='success'>
                      Delivered on {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert severity='error'>Not Delivered</Alert>
                  )}
                </ListItemText>
              </ListItem>
              <hr />
              <ListItem sx={{ mt: 2 }}>
                <Typography variant="h5">Payment Method</Typography>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  {order.isPaid ? (
                    <Alert severity='success'>Paid on {order.paidAt}</Alert>
                  ) : (

                    <Alert severity='error'>Not Paid</Alert>
                  )}
                </ListItemText>
              </ListItem>
              <hr />
              <ListItem sx={{ mt: 2 }}>
                <Typography variant="h5">Order Items</Typography>
              </ListItem>
              <List sx={{ margin: '20px 0' }}>
                {order.orderItems.length === 0 ? (
                  <ListItem>
                    <ListItemText secondary="Order is empty" />
                  </ListItem>
                ) : (
                  order.orderItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container spacing={2} sx={{ display: { xs: 'flex', justifyContent: 'center', margin: '0 auto' } }}>
                        <Grid item xs={5} md={1}  >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ width: '100%', borderRadius: '5px' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={8} sx={{ display: { xs: 'flex', justifyContent: 'center', margin: '0 auto' } }}>
                          <Link to={`/products/${item.product}`}>
                            <Typography variant="body1">{item.name}</Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: { xs: 'flex', justifyContent: 'center', margin: '0 auto' } }}>
                          <Typography variant="body1">
                            {item.qty} x {formatPrice(item.price)} ={' '}
                            {formatPrice(item.qty * item.price)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))
                )}
              </List>
            </List>
          </Grid>
          <Grid item md={5}>
            <Card>
              <CardContent>
                <Typography variant="h3">Order Summary</Typography>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Items</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {formatPrice(order.itemsPrice)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <hr />
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Shipping</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {formatPrice(order.shippingPrice)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <hr />
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Tax</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{formatPrice(order.taxPrice)}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <hr />
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{formatPrice(order.totalPrice)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <hr />
                  <ListItem>
                    {error && (
                      <Typography variant="body1" color="error">
                        {error.data.message}
                      </Typography>
                    )}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container >
    </>
  )

}
