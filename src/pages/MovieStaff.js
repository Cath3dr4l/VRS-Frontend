import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStaffContext } from "../hooks/useStaffContext";

const MovieStaff = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { staff } = useStaffContext();
  const [stock, setStock] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/api/staffs/movie/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staff.token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setMovie(data);
        setError(null);
      }
    };
    if (staff) {
      fetchMovie();
    }
  }, [id, staff]);

  useEffect(() => {
    if (staff) {
      setStock(movie.stock);
    }
  }, [movie]);

  const saveStock = async (id) => {
    const response = await fetch(`/api/staffs/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${staff.token}`,
      },
      body: JSON.stringify({ stock }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Stock updated successfully");
    } else {
      alert(`An error occured: ${data.error}`);
    }
  };

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
              {movie.disabled ? (
                <div className="text-white text-xl mt-4 font-semibold">
                  This movie is disabled
                </div>
              ) : (
                <div className="w-36 mx-auto">
                  <label className="text-white text-xl font-semibold mr-2">
                    Stock:
                  </label>
                  <input
                    disabled={!editing}
                    defaultValue={movie.stock}
                    className={`w-16 ${
                      editing
                        ? "border-2 text-black text-xl text-right font-semibold bg-text focus:outline-none focus:ring-2 focus:ring-blue"
                        : "text-white text-right text-xl font-semibold bg-transparent border-none"
                    }`}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      setStock(e.target.value);
                    }}
                  ></input>
                  <div
                    className="flex justify-center items-center"
                    style={{ gap: ".5rem" }}
                  >
                    <button
                      className="bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded"
                      onClick={() => {
                        if (editing) {
                          setEditing(false);
                          saveStock(movie._id);
                        } else {
                          setEditing(true);
                        }
                      }}
                    >
                      {editing ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>
              )}
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

export default MovieStaff;
