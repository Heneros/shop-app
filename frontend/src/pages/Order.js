import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  CardContent,
  Grid,
  Box,
  Alert,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Loader from "../components/Loader";
import PageHero from "../components/PageHero";
import { formatPrice } from "../utils/helpers";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../redux/slices/orderApiSlice";

export default function Order() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();


  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliveredOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };


  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">error </Alert>
  ) : (
    <>
      <PageHero title="Details" />
      <Container>
        <Typography
          sx={{
            my: 5,
            fontSize: {
              xl: 30,
              lg: 30,
              md: 20,
              sm: 20,
              xs: 20,
            },
            fontWeight: 600,
          }}
          variant="h3"
        >
          Order #{order._id}
        </Typography>

        <Box
          sx={{
            my: 3,
            display: "flex",
            flexDirection: {
              md: "row",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <Grid item md={7}>
            <List>
              <ListItem sx={{ mt: 2 }}>
                <Typography variant="h5">Address:</Typography>
              </ListItem>
              <ListItem>

                <ListItemText>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  {order.isDelivered ? (
                    <Alert severity="success">
                      Delivered on {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert severity="error">Not Delivered</Alert>
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
                    <Alert severity="success">Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert severity="error">Not Paid</Alert>
                  )}
                </ListItemText>
              </ListItem>
              <hr />
              <ListItem sx={{ mt: 2 }}>
                <Typography variant="h5">Order Items</Typography>
              </ListItem>
              <List sx={{ margin: "20px 0" }}>
                {order.orderItems.length === 0 ? (
                  <ListItem>
                    <ListItemText secondary="Order is empty" />
                  </ListItem>
                ) : (
                  order.orderItems.map((item, index) => (
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
                          <Link to={`/products/${item.product}`}>
                            <Typography variant="body1">{item.name}</Typography>
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
                        <Typography variant="body1">
                          {formatPrice(order.taxPrice)}
                        </Typography>
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
                        <Typography variant="body1">
                          {formatPrice(order.totalPrice)}
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

                  {!order.isPaid && (
                    <ListItem>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <div>
                          {/* <Button
                            size="large"
                            onClick={onApproveTest}
                            fullWidth
                            variant="outlined"
                          >
                            Test Pay order
                          </Button> */}
                          <>
                            {/* <Stripe
                              stripeKey=""
                              token={handleToken}
                            /> */}

                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </>
                        </div>
                      )}
                    </ListItem>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <Button
                        size="large"
                        onClick={deliveredOrderHandler}
                        fullWidth
                        variant="contained"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
