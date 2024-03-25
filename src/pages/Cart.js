import { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import InvoiceComponent from "../components/invoiceComponent.js";

const Cart = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const {
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    setDuration,
    removeItem,
    clearCart,
  } = useCartContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/customers/profile", {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setProfile(data);
        setError(null);
      }
    };

    const fetchMovies = async () => {
      const response = await fetch("/api/videos", { method: "GET" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setMovies(data);
        setError(null);
      }
    };

    if (customer) {
      fetchProfile();
      fetchMovies();
    }
  }, [customer]);

  const calculatePrice = (item) => {
    if (!movies) return 0;
    const movie = movies.find((movie) => movie._id === item.id);
    if (!movie) return 0;
    if (item.duration === 100) {
      return movie.buy_price * item.quantity;
    }
    return movie.rent_price * item.quantity * item.duration;
  };

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {
    console.log("here:", invoiceItems);
    if (invoiceItems.length > 0) {
      setOrderPlaced(true);
    }
  }, [invoiceItems]);

  const createInvoice = async () => {
    // console.log(cartItems);
    setInvoiceItems(cartItems);
  };

  const totalCartPrice = () => {
    return cartItems.reduce((sum, item) => {
      return sum + calculatePrice(item);
    }, 0);
  };

  const checkoutHandler = async () => {
    const response = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customer.token}`,
      },
      body: JSON.stringify({
        amount: totalCartPrice(),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }
    setError(null);
    var options = {
      key: process.env.REACT_APP_RZP_KEY_ID,
      amount: data.payment.amount,
      currency: data.payment.currency,
      name: "VideoDog",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.payment.id,
      callback_url: "/api/payment/verify",
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      handler: async (response) => {
        const razorpay_order_id = await response.razorpay_order_id;
        const razorpay_payment_id = await response.razorpay_payment_id;
        const razorpay_signature = await response.razorpay_signature;
        const res = await fetch("/api/payment/success", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
        }
        if (res.ok) {
          setError(null);
          handleCreateOrder(data.transaction.transactionID);
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      alert("Payment Failed");
    });
  };

  const handleClick = () => {
    const outOfStockMessage = cartItems.reduce((message, item) => {
      const movie = movies.find((movie) => movie._id === item.id);
      if (item.quantity > movie.stock) {
        return message + `${movie.name}; In Stock: ${movie.stock}\n`;
      }
      return message;
    }, "Too Many Items\n");

    if (outOfStockMessage !== "Too Many Items\n") {
      alert(outOfStockMessage);
      return;
    }

    checkoutHandler();
  };

  const handleCreateOrder = async (transactionID) => {
    cartItems.forEach(async (item) => {
      const response = await fetch("/api/customers/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`,
        },
        body: JSON.stringify({
          videoID: item.id,
          quantity: item.quantity,
          duration: item.duration,
          transactionID: transactionID,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setError(null);
      }
    });
    createInvoice().then(clearCart());
  };

  return (
    <div>
      <h2>Cart</h2>
      <div>
        {profile && (
          <div className="text-white">
            <h3>Customer: {profile.name}</h3>
            <h3>Email: {profile.email}</h3>
          </div>
        )}
      </div>
      <div>
        {movies &&
          cartItems.map((item) => {
            const movie = movies.find((movie) => movie._id === item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between text-white"
              >
                <div>
                  <h3>{movie.name}</h3>
                  <img
                    src={movie.poster_url}
                    alt={movie.name}
                    className="h-auto w-48"
                  />
                </div>
                <div>
                  <button
                    onClick={() => increaseItemQuantity(item.id)}
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseItemQuantity(item.id)}
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                  <p>Quantity: {item.quantity}</p>
                  <div>
                    <label htmlFor="rentDuration" className="mr-2">
                      Rent Duration:
                    </label>
                    <select
                      id="rentDuration"
                      onChange={(e) =>
                        setDuration(item.id, Number(e.target.value))
                      }
                      defaultValue={item.duration}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="1">1 Week</option>
                      <option value="2">2 Weeks</option>
                      <option value="3">3 Weeks</option>
                      <option value="4">4 Weeks</option>
                      <option value="100">Buy Movie</option>
                    </select>
                  </div>
                  <div>
                    Price: Rs.
                    {calculatePrice(item)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          <div>
            <h3>Total Price: Rs.{totalCartPrice()}</h3>
          </div>
          <button
            onClick={handleClick}
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Order
          </button>
        </>
      )}

      {orderPlaced && (
        <div>
          <InvoiceComponent order={invoiceItems} />
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Cart;
