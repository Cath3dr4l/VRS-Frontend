import { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Cart = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const { cartItems, increaseItemQuantity, decreaseItemQuantity, removeItem } =
    useCartContext();

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
                className="text-white flex items-center justify-between"
              >
                <div>
                  <h3>{movie.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <img
                    src={movie.poster_url}
                    alt={movie.name}
                    className="w-48 h-auto"
                  />
                </div>
                <div>
                  <button
                    onClick={() => increaseItemQuantity(item.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseItemQuantity(item.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {cartItems.length === 0 && <div>Your cart is empty</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Cart;
