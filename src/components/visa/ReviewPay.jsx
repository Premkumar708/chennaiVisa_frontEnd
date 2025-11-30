import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Load Razorpay script
const useRazorpayScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default function ReviewPay() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  useRazorpayScript();

  const payNow = async () => {
    setIsProcessing(true);

    const response = await fetch(
      import.meta.env.VITE_API_LOCAL_URL + "/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500,
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: "rzp_test_Rk1cUlbT1flWi9",
      amount: order.amount,
      currency: order.currency,
      name: "Chennai Visa",
      description: "Visa payment Transaction",
      order_id: order.id,
      // callback_url: 'http://localhost:3000/payment-success', // Your success URL+
      theme: {
        color: "#F37254",
      },
      handler: function (response) {
        console.log("ord id " + response.razorpay_order_id);
        console.log("payment id " + response.razorpay_payment_id);
        console.log("singnature id" + response.razorpay_signature);
        fetch(import.meta.env.VITE_API_LOCAL_URL + "/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "ok") {
              setIsProcessing(false);
              alert("Payment Successful.");
              navigate("/", {
                state: {
                  paymentId: data.razorpay_payment_id,
                },
              });
            } else {
              alert("Payment verification failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error verifying payment");
          });
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
      <p className="text-xl font-semibold mb-6">Amount Due: ₹500.00</p>

      <button
        onClick={payNow}
        disabled={isProcessing}
        className={`w-full ${
          isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
