import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const styles = {
  button: {
    backgroundColor: "blue",
    border: "none",
    color: "white",
    height: "50px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
  },
};

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
        <button style={styles.button} id="order_btn" type="Add to Cart">
          Add to Cart
        </button>
      </div>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
};

export default Movie;
