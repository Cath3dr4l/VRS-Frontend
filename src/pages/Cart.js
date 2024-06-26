import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSadTear } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import { set } from "date-fns";

const Cart = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();
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
      setIsFetching(true);
      const response = await fetch("/api/customers/profile", {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setIsFetching(false);
      }
      if (response.ok) {
        setProfile(data);
        setError(null);
      }
    };

    const fetchMovies = async () => {
      try {
        const promises = cartItems.map((item) =>
          fetch(`/api/movies/${item.id}`).then((res) => res.json())
        );
        const data = await Promise.all(promises);
        setMovies(data);
        setError(null);
        setIsFetching(false);
      } catch (error) {
        setError(error.message);
        setIsFetching(false);
      }
    };

    if (customer) {
      fetchProfile().then(fetchMovies());
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

  const createInvoice = async () => {
    const orderData = {
      order: cartItems,
      movies: movies,
      profile: profile,
      total: totalCartPrice(),
    };

    // Store the data in the local storage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Open a new tab
    window.open("/invoice", "_blank");
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
      image: "../../public/favicon.ico",
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
        address: "DataDog HQ",
      },
      theme: {
        color: "#aa132f",
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
          movieID: item.id,
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
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-6 pt-20 py-4">
          {profile && (
            <h2 className="text-3xl font-bold text-center text-white">
              {profile.name}'s Cart
            </h2>
          )}

          <div>
            {movies &&
              cartItems.map((item) => {
                const movie = movies.find((movie) => movie._id === item.id);
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-3 items-center justify-between mt-6 pt-6 border-t"
                  >
                    <div className="flex items-center">
                      <Link to={`/movie/${item.id}`}>
                        <img
                          src={movie.poster_url}
                          alt={movie.name}
                          className="w-20"
                        />
                      </Link>
                      <div className="ml-4">
                        <span className="text-white font-bold">
                          {movie.name}
                        </span>
                        <div className="text-white">
                          Price: Rs.
                          {calculatePrice(item)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex justify-between">
                        <button
                          onClick={() => decreaseItemQuantity(item.id)}
                          className="rounded bg-white/50 w-8 h-8 mx-2 flex items-center justify-center text-base font-bold text-white hover:bg-red-700"
                        >
                          -
                        </button>
                        <p className="text-white">Quantity: {item.quantity}</p>
                        <button
                          onClick={() => increaseItemQuantity(item.id)}
                          className="rounded bg-white/50 w-8 h-8  mx-2 flex items-center justify-center text-base font-bold text-white hover:bg-green-700"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center mt-4">
                        <label
                          htmlFor="rentDuration"
                          className="mr-2 text-white"
                        >
                          Rent Duration:
                        </label>
                        <select
                          id="rentDuration"
                          onChange={(e) =>
                            setDuration(item.id, Number(e.target.value))
                          }
                          defaultValue={item.duration}
                          className="mt-1 block rounded-md border text-center focus:text-center border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="1">1 Week</option>
                          <option value="2">2 Weeks</option>
                          <option value="3">3 Weeks</option>
                          <option value="4">4 Weeks</option>
                          <option value="100">Buy Movie</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded bg-red-700 px-2 py-1 font-bold text-white hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          {cartItems.length === 0 ? (
            <div className="text-white text-center text-3xl mt-20">
              <p>
                Your cart is empty <FontAwesomeIcon icon={faSadTear} />
              </p>
            </div>
          ) : (
            <>
              <div className="text-white mt-4 mb-4">
                <h3 className="text-2xl">Total Price: Rs.{totalCartPrice()}</h3>
              </div>
              <button
                onClick={handleClick}
                className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-600"
              >
                Order
              </button>
            </>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      )}
    </>
  );
};

export default Cart;
