
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkOutForm";
import { useLocation } from "react-router-dom";
import { userApi, clubApi } from "../utils/api";

const stripePromise = loadStripe("pk_test_51NUpC6SHhgXv6TRc6VTdkJzGnxS9B8bb7Kp5RO18HvZg4DbS04dQRUM125vjmj6UGq7IcXLOh4mIxF32kYq7ozL50018UlbHT5");

export default function Payment() {

  const [clientSecret, setClientSecret] = useState("");
  const Location = useLocation();
  const datas = Location.state;
  const { clubname, phonenumber, registration, announcementid, isUser, userId, amount, location } = datas
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await (isUser === 'user' ? userApi : clubApi).post('/payment', { ...datas })
        setClientSecret(res.data.clientSecret);

      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm Secret={clientSecret} datas={datas} />
        </Elements>
      )}
    </div>
  )
}