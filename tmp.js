import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function OrderDetails({ order }) {
  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">Shipping</Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Name: ${order.user.name}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Email: ${order.user.email}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
                />
              </ListItem>
              {order.isDelivered ? (
                <ListItem>
                  <ListItemText primary={`Delivered on ${order.deliveredAt}`} />
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText primary="Not Delivered" />
                </ListItem>
              )}
              <ListItem>
                <ListItemText primary={`Payment Method: ${order.paymentMethod}`} />
              </ListItem>
            </List>
            <Typography variant="h6">Order Items</Typography>
            {order.orderItems.length === 0 ? (
              <Typography variant="body1">Order is empty</Typography>
            ) : (
              <List>
                {order.orderItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${item.qty} x ${item.name} = $${item.qty * item.price}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Order Summary</Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Items: $${order.itemsPrice}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Shipping: $${order.shippingPrice}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Tax: $${order.taxPrice}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`Total: $${order.totalPrice}`} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
