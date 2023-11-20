import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Typography, Card, Container, List, ListItem, ListItemText, Divider, CardContent, Grid, Button, Box, Alert } from '@mui/material';


import { useGetOrderDetailsQuery } from '../redux/slices/orderApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PageHero from '../components/PageHero';
import { formatPrice } from '../utils/helpers';

export default function Order() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  console.log(order);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message severity="error" />
  ) : (
    <>
      <PageHero title="Details" />
      <Container>
        <Typography variant="h3">Order #{order._id}</Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: {
            md: 'row',
            sm: 'column',
            xs: 'column',
          }
        }}>

          <Grid item md={8}>
            <List>
              <ListItem>

              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </ListItemText>
              </ListItem>
              <hr />
              {order.isDelivered ? (
                <Alert severity='success'>
                  Delivered on {order.deliveredAt}
                </Alert>
              ) : (
                <Alert severity='error'>Not Delivered</Alert>
              )}
              <ListItem>
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
              <ListItem>
                <Typography variant="h5">Order Items</Typography>
              </ListItem>
              <List sx={{ margin: '20px 0' }}>
                <Typography variant="h6">Order Items</Typography>
                {order.orderItems.length === 0 ? (
                  <ListItem>
                    <ListItemText secondary="Order is empty" />
                  </ListItem>
                ) : (
                  order.orderItems.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${item.qty} x ${item.name}`} />
                      <ListItemText secondary={`$${item.qty * item.price}`} />
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
                          {/* {totalItems} */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Shipping</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Tax</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {/* <Typography variant="body1">{formatPrice(subTotal)}</Typography> */}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {/* <Typography variant="body1">{formatPrice(subTotal)}
                        </Typography> */}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    {error && (
                      <Typography variant="body1" color="error">
                        {error.data.message}
                      </Typography>
                    )}
                  </ListItem>
                  <ListItem>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"

                    >
                      Place Order
                    </Button>

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
