import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useManagerContext } from "../hooks/useManagerContext";

const MovieManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const { manager } = useManagerContext();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/api/managers/movie/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${manager.token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setMovie(data);
        setTotalRevenue(
          data.ordered.reduce((acc, order) => acc + order.price, 0)
        );
        setError(null);
      }
    };
    if (manager) {
      fetchMovie();
    }
  }, [id, manager]);

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
              <p className="font-semibold">IMDB rating: {movie.rating}</p>

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
              <br />
              <>
                <p className="font-semibold">
                  Buying Price: ₹{movie.buy_price}
                </p>
                <p className="font-semibold">
                  Renting Price: ₹{movie.rent_price}
                </p>
              </>
              <br />
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/management/editmovie/${id}`)}
              >
                Edit Details
              </button>
            </div>
            <div
              style={{
                maxHeight: "200px",
                overflowY: "scroll",
                backgroundColor: "#333",
                color: "#fff",
                padding: "10px",
              }}
            >
              <h2 className="text-xl text-green-500 font-semibold">
                Total Revenue: ₹{totalRevenue}
              </h2>
              <ol>
                {movie.ordered.map((order, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: "#444",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "5px",
                    }}
                  >
                    <p>Revenue: ₹{order.price}</p>
                    <p>
                      Status:{" "}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-gray-300 fixed bottom-5 left-5">
              <Link to="/" className="hover:text-red-500">
                Go back to the Homepage
              </Link>
            </p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default MovieManage;
