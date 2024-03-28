import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import CardComponent from "../components/cardComponent";

const Category = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState(null);
  const [movieRows, setMovieRows] = useState([]);
  const [error, setError] = useState(null);
  const screenSize = useScreenSize();

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
    if (!movies) return;
    const movieNum = parseInt((screenSize.width - 200) / 200);
    console.log(movieNum);
    const rows = [];
    for (let i = 0; i < movies.length; i += movieNum) {
      rows.push(movies.slice(i, i + movieNum));
    }

    setMovieRows(rows);
  }, [movies, screenSize.width]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-text text-center pt-16 py-4">
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
      {error && <h1 className="text-2xl text-red-500 text-center">{error}</h1>}
    </div>
  );
};

export default Category;
