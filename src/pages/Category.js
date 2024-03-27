import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/cardComponent";

const Category = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState(null);
  const [movieRows, setMovieRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`/api/videos/genre/${genre}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setMovies(data);
        setError(null);
      }
    };
    fetchMovies();
  }, [genre]);

  useEffect(() => {
    // Group movies into arrays of 7
    if (!movies) return;
    const rows = [];
    for (let i = 0; i < movies.length; i += 7) {
      rows.push(movies.slice(i, i + 7));
    }

    setMovieRows(rows);
  }, [movies]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-text text-center py-8">
        {genre.toUpperCase()}
      </h1>
      {movies &&
        movieRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 p-4">
            {row.map((movie) => (
              <CardComponent key={movie.id} item={movie} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Category;
