import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetStripePayMutation,
} from "../redux/slices/orderApiSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../redux/slices/cartSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  ListGroupItem,
  ListGroup,
  ListItem,
  Grid,
  List,
  ListItemText,
} from "@mui/material";
import { formatPrice } from "../utils/helpers";
import PageHero from "../components/PageHero";
import Loader from "../components/Loader";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const totalItems = cart.cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );
  const { userInfo } = useSelector((state) => state.auth);

  const [getStripePay] = useGetStripePayMutation();
  const stripeOrderHandler = async (e) => {
      try {
        
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        user: userInfo._id,
        // orderItems: orderItems,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      // console.log(res._id)
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
      // toast.error(error?.message || "An error occurred");
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <>Error</>
  ) : (
    <>
      {isLoading && <Loader />}
      <PageHero title="Order" />
      <Container>
        <Box
          sx={{
            display: "flex",
            my: 12,
            flexDirection: {
              md: "row",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <Grid item md={8} sx={{ minWidth: "50%" }}>
            <List>
              <ListItem>
                <Typography variant="h5">Shipping</Typography>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
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
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            display: {
                              xs: "flex",
                              justifyContent: "center",
                              margin: "0 auto",
                            },
                          }}
                        >
                          <Grid item xs={5} md={1}>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{
                              display: {
                                xs: "flex",
                                justifyContent: "center",
                                margin: "0 auto",
                              },
                            }}
                          >
                            <Link to={`/products/${item._id}`}>
                              <Typography variant="body1">
                                {item.name}
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{
                              display: {
                                xs: "flex",
                                justifyContent: "center",
                                margin: "0 auto",
                              },
                            }}
                          >
                            <Typography variant="body1">
                              {item.qty} x {formatPrice(item.price)} ={" "}
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
          <Grid item md={5} sx={{ minWidth: "45%" }}>
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
                        <Typography variant="body1">{totalItems}</Typography>
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
                        <Typography variant="body1">
                          $ {cart.taxPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1">Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          $ {cart.totalPrice}
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
                    {cart.paymentMethod === "Stripe" ? (
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={cart.cartItems.length === 0}
                        onClick={stripeOrderHandler}
                      >
                        Pay with Stripe
                      </Button>
                    ) : (
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
                    )}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
