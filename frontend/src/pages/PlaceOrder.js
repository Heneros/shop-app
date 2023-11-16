import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../redux/slices/orderApiSlice';
import { toast } from 'react-toastify';
import { clearCartItems } from '../redux/slices/cartSlice'
import { Box, Button, Card, CardContent, Container, Typography, ListGroupItem, ListGroup, ListItem, Grid, List, ListItemText } from '@mui/material';
import { formatPrice } from '../utils/helpers';
import PageHero from '../components/PageHero';

export default function PlaceOrder() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    // const { cartItems } =useSelector((state) => state.cart); 
    const subTotal = cart.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    const totalItems = cart.cartItems.reduce((total, item) => total + item.qty, 0)





    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress, navigate])

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                
                // orderItems: cart.cartItems,
                // shippingAddress: cart.shippingAddress,
                // paymentMethod: cart.paymentMethod,
                // itemsPrice: cart.itemsPrice,
                // shippingPrice: cart.shippingPrice,
                // taxPrice: cart.taxPrice,
                // totalPrice: cart.totalPrice,
            }).unwrap();

            // dispatch(clearCartItems());
            console.log(res)
            navigate(`/order/${res._id}`);
        } catch (error) {
            console.log(error)
            // toast.error(error?.message || "An error occurred"); 

        }
    }


    return (
        <>
            <PageHero title="Order" />
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {
                        md: 'row',
                        sm: 'column',
                        xs: 'column',
                    }
                }}>
                    <Grid item md={7}>
                        <List>
                            <ListItem>
                                <Typography variant="h5">Shipping</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <strong>Address:</strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </ListItemText>
                            </ListItem>
                            <hr />
                            <ListItem>
                                <Typography variant="h5">Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <strong>Method:</strong>
                                    {cart.paymentMethod}
                                </ListItemText>
                            </ListItem>
                            <hr />
                            <ListItem>
                                <Typography variant="h5">Order Items</Typography>
                            </ListItem>
                            <ListItem>

                                {cart.cartItems.length === 0 ? (
                                    <ListItemText>
                                        <Typography variant="body1">Your cart is empty</Typography>
                                    </ListItemText>
                                ) : (
                                    <List>
                                        {cart.cartItems.map((item, index) => (
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
                                                        <Link to={`/products/${item._id}`}>
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
                                        ))}
                                    </List>
                                )}
                            </ListItem>

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
                                                    {totalItems}
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
                                                    $ {cart.shippingPrice}

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
                                                <Typography variant="body1">{formatPrice(subTotal)}</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">Total</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">{formatPrice(subTotal)}
                                                </Typography>
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
                                            disabled={cart.cartItems.length === 0}
                                            onClick={placeOrderHandler}
                                        >
                                            Place Order
                                        </Button>

                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
