import React from "react";
import { useSelector } from "react-redux";

export default function StripeButton() {
    const { userInfo } = useSelector((state) => state.auth);

    const handleCheckout = () => {
        
    }
  return <div>StripeButton</div>;
}
