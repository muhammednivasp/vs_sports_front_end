import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { userApi, clubApi } from "../utils/api";
import TicketCheckoutForm from "./ticketCheckout";

const stripePromise = loadStripe("pk_test_51NUpC6SHhgXv6TRc6VTdkJzGnxS9B8bb7Kp5RO18HvZg4DbS04dQRUM125vjmj6UGq7IcXLOh4mIxF32kYq7ozL50018UlbHT5");

export default function TicketPayment() {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const datas = location.state;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await (datas.isUser === 'user' ? userApi : clubApi).post('/ticketpayment', { ...datas });
        console.log(res, "Response from API");
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error fetching client secret:", err);
      }
    };
    makeRequest();
  }, [datas]);

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
          <TicketCheckoutForm Secret={clientSecret} datas={datas} />
        </Elements>
      )}
    </div>
  );
}
