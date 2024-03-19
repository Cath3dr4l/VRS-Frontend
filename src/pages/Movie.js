import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/api/videos/${id}`, { method: "GET" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setMovie(data);
        setError(null);
      }
    };
    fetchMovie();
  }, [id]);

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    setDuration,
    getDuration,
  } = useCartContext();

  const { customer } = useAuthContext();
  const navigate = useNavigate();
  const quantity = getItemQuantity(id);
  return (
    <div style={{ color: "white " }}>
      <div>
        {movie && (
          <div className="w-full h-[750px] flow-root">
            <div className="w-[50%] float-left">
            <h1 classname="font-semibold text-text text-3xl">{movie.name}</h1>
            <p>{movie.summary_text}</p>
            <p>{movie.rating}</p>
            </div>
            <div className="w-[50%] h-full float-right">
              <div className="absolute right-0 w-[50%] h-full bg-gradient-to-r from-background "></div>
              <img className="w-full h-full object-cover"
                src={movie.poster_url}
                alt="Poster"
              />
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="mt-auto">
        {quantity === 0 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (!customer) {
                navigate("/login");
                return;
              }
              increaseItemQuantity(id);
            }}
          >
            + Add To Cart
          </button>
        ) : (
          <div className="flex items-center flex-col" style={{ gap: ".5rem" }}>
            <div
              className="flex justify-center items-center"
              style={{ gap: ".5rem" }}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  decreaseItemQuantity(id);
                }}
              >
                -
              </button>
              <div>
                <span className="text-4x1">{quantity}</span> in cart
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  increaseItemQuantity(id);
                }}
              >
                +
              </button>
            </div>
            <div>
              <label htmlFor="rentDuration" className="mr-2">
                Rent Duration:
              </label>
              <select
                id="rentDuration"
                defaultValue={getDuration(id)}
                onChange={(e) => setDuration(id, Number(e.target.value))}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">1 Week</option>
                <option value="2">2 Weeks</option>
                <option value="3">3 Weeks</option>
                <option value="4">4 Weeks</option>
                <option value="100">Buy Movie</option>
              </select>
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                removeItem(id);
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
};

export default Movie;
