import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { userApi, clubApi } from "../utils/api";

const CheckoutForm = ({ Secret, datas }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(Secret);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clientSecret]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
            },
            redirect: "if_required"
        });

        if (paymentIntent) {
            try {
                const response = await (datas.isUser === 'user' ? userApi : clubApi).post('/paymentsuccess', { ...datas });
                console.log(datas.isUser, "lkl");
                datas.isUser === 'user'
                    ? navigate(`/user/successpage`, { state: response.data.datas })
                    : navigate(`/club/successpage`, { state: response.data.datas });
            } catch (apiError) {
                setMessage("An error occurred while processing your payment.");
            }
        }

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };

    return (
        <div className="bg-white min-h-screen flex flex-col justify-between">
            <header className="py-4 bg-transparent text-gray-800 text-center">
                <h1 className="text-4xl font-extrabold">Secure Payment</h1>
                <p className="mt-2">Fast, Easy, and Secure</p>
            </header>

            <main className="flex-grow flex items-center justify-center px-4">
                <form
                    id="payment-form"
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
                >
                    <LinkAuthenticationElement
                        id="link-authentication-element"
                        onChange={(event) => {
                            const newValue = event.target.value;
                            console.log(newValue, "llllllll")
                            setEmail(newValue)
                        }
                        }
                        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <PaymentElement
                        id="payment-element"
                        options={paymentElementOptions}
                        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-teal-300"
                    >
                        <span id="button-text">
                            {isLoading ? (
                                <div className="spinner" id="spinner"></div>
                            ) : (
                                "Pay now"
                            )}
                        </span>
                    </button>
                    {message && (
                        <div id="payment-message" className="mt-4 text-red-500">
                            {message}
                        </div>
                    )}
                </form>
            </main>

            <footer className="py-4 bg-transparent text-gray-800 text-center">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    );
};

export default CheckoutForm;
 