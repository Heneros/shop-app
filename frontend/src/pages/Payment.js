import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { savePaymentMethod } from "../redux/slices/cartSlice";
import PageHero from "../components/PageHero";

export default function Payment() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <PageHero title="Payment" />
      <Box sx={{ my: 7 }}>
        <Container component="main" maxWidth="sm">
          <Paper style={{ marginTop: 24, padding: 16 }}>
            <Typography component="h1" variant="h5">
              Payment Method
            </Typography>
            <form onSubmit={submitHandler}>
              {/* <FormControl component="fieldset" style={{ marginTop: 16 }}>
                <FormLabel component="legend">Select Method</FormLabel>
              
                <RadioGroup name="paymentMethod"  onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
                </RadioGroup>

                <RadioGroup name="paymentMethodStripe" onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
                </RadioGroup>

              </FormControl> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Paypal"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Paypal"
                  control={<Radio />}
                  label="Paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </RadioGroup>
              <Grid item xs={12} sm={12}>
                <Wrapper>
                  <button type="submit" className="link-btn">
                    Save Information
                  </button>
                </Wrapper>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
const Wrapper = styled.div`
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
    min-width: 25%;
    min-height: 50px;
  }
`;
