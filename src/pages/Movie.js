import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div>
      <h2>Movie</h2>
      <div className="movie-details">
        {movie && (
          <div>
            <img src={movie.poster_url} alt="Poster" />
            <h3>{movie.name}</h3>
            <p>{movie.summary_text}</p>
            <p>{movie.rating}</p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
};

export default Movie;
