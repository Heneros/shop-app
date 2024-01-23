import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useGetStripePayMutation } from "../redux/slices/orderApiSlice";

export default function StripeButton({ cartItems }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [getStripePay] = useGetStripePayMutation();

  const handleCheckout = async () => {
    try {
      const response = await getStripePay({
        cartItems,
        userId: userInfo._id,
        userEmail: userInfo.email
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => handleCheckout()}
      >
        Pay Stripe
      </Button>
    </>
  );
}
