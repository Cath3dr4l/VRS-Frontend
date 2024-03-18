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
  } = useCartContext();

  const { customer } = useAuthContext();
  const navigate = useNavigate();
  const quantity = getItemQuantity(id);
  return (
    <div style={{ color: "white " }}>
      <h2>Movie</h2>
      <div className="movie-details">
        {movie && (
          <div>
            <img
              style={{ width: "400px" }}
              src={movie.poster_url}
              alt="Poster"
            />
            <h3>{movie.name}</h3>
            <p>{movie.summary_text}</p>
            <p>{movie.rating}</p>
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
