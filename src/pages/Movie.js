import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faMoneyBillWave,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

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
  const location = useLocation();
  const quantity = getItemQuantity(id);
  return (
    <div>
      <div>
        {movie && (
          <div className="w-full h-screen flow-root text-text">
            <div className="w-[50%] h-full float-right">
              <div className="absolute right-0 w-[50%] h-full bg-gradient-to-r from-background "></div>
              <img
                className="w-full h-full object-cover"
                src={movie.poster_url}
                alt="Poster"
              />
            </div>
            <div className="w-[50%] float-left my-20 px-4 flow-root">
              <h1 className="font-semibold text-3xl"> {movie.name} </h1>
              <p className="my-7">{movie.summary_text}</p>
              <>
                <p className="font-semibold">
                  IMDB rating: {movie.rating}
                  {movie.ImdbId && (
                    <Link
                      to={`https://www.imdb.com/title/${movie.ImdbId}`}
                      style={{ marginLeft: "10px" }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </Link>
                  )}
                </p>
                <Rating
                  value={movie.rating}
                  max={10.0}
                  precision={0.1}
                  readOnly
                />
              </>
              <br />
              <>
                <p className="font-semibold">Genres:</p>
                <div className="flex space-x-2">
                  {movie.genre.map((g) => (
                    <p
                      key={g}
                      className="px-2 py-1 bg-gray-500 text-white rounded"
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </p>
                  ))}
                </div>
              </>
              <br />
              {movie.cast && movie.cast.length > 0 && (
                <>
                  <p className="font-semibold">Cast:</p>
                  <div className="flex flex-wrap space-x-2">
                    {movie.cast.map((actor) => (
                      <p
                        key={actor.name_id}
                        className="px-2 py-1 bg-red-700 text-white rounded"
                      >
                        {actor.name}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <br />
              <br />
              <>
                <p className="font-semibold">
                  <FontAwesomeIcon icon={faMoneyBillWave} /> Buy for: ₹
                  {movie.buy_price}
                </p>
                <p className="font-semibold">
                  <FontAwesomeIcon icon={faHandHoldingUsd} /> Rent for: ₹
                  {movie.rent_price}
                </p>
              </>
              <div className="mt-auto">
                {quantity === 0 ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      if (!customer) {
                        navigate("/login", {
                          state: { prev: location.pathname },
                        });
                        return;
                      }
                      increaseItemQuantity(id);
                    }}
                  >
                    + Add To Cart
                  </button>
                ) : (
                  <div
                    className="flex items-center flex-col"
                    style={{ gap: ".5rem" }}
                  >
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
                        onChange={(e) =>
                          setDuration(id, Number(e.target.value))
                        }
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
              <br />
              <br />
              <p className="text-primary">
                <Link to="/">Go back to the homepage</Link>
              </p>
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Movie;
