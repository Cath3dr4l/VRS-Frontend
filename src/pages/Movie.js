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
              <h1 className="font-semibold text-7xl"> {movie.name} </h1>
              <p className="my-7 text-lg">{movie.summary_text}</p>
              <>
                <p className="font-semibold text-lg">
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
              <>
                <p className="font-semibold text-lg mt-4">Genres:</p>
                <div className="flex space-x-2">
                  {movie.genre.map((g) => (
                    <Link
                      key={g}
                      to={`/category/${g}`}
                      className="px-2 py-1 bg-gray-500 text-white rounded"
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </Link>
                  ))}
                </div>
              </>
              {movie.cast && movie.cast.length > 0 && (
                <>
                  <p className="font-semibold text-lg mt-4">Cast:</p>
                  <div className="flex flex-wrap space-x-2">
                    {movie.cast.map((actor) => (
                      <Link
                        key={actor.name_id}
                        to={`https://www.imdb.com/name/${actor.name_id}`}
                        className="px-2 py-1 bg-red-700 text-white rounded"
                      >
                        {actor.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <>
                <p className="font-semibold text-lg mt-6">
                  <FontAwesomeIcon icon={faMoneyBillWave} /> Buy for: ₹
                  {movie.buy_price}
                </p>
                <p className="font-semibold text-lg">
                  <FontAwesomeIcon icon={faHandHoldingUsd} /> Rent for: ₹
                  {movie.rent_price}
                </p>
              </>
              <div className="mt-4">
                {quantity === 0 ? (
                  <div className="flex justify-center">
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
                  </div>
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
                      <div className="text-lg font-semibold">
                        <span className="text-2xl">{quantity}</span> in cart
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded"
                        onClick={() => {
                          increaseItemQuantity(id);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="rentDuration"
                        className="mr-2 text-white text-lg"
                      >
                        Rent Duration:
                      </label>
                      <select
                        id="rentDuration"
                        onChange={(e) =>
                          setDuration(id, Number(e.target.value))
                        }
                        defaultValue={getDuration(id)}
                        className="mt-1 block rounded-md border text-black border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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
              <p className="text-gray-300 fixed bottom-5 left-5">
                <Link to="/" className="hover:text-red-500">
                  Go back to the Homepage
                </Link>
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
