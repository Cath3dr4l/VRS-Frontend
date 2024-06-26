import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import CardComponent from "../components/cardComponent";
import Loader from "../components/Loader";

const Category = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState(null);
  const [movieRows, setMovieRows] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const screenSize = useScreenSize();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsFetching(true);
      const response = await fetch(`/api/movies/genre/${genre}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setIsFetching(false);
      }
      if (response.ok) {
        const sortedMovies = data
          .filter((video) => video.disabled === false)
          .sort((a, b) => b.rating - a.rating);
        setMovies(sortedMovies);
        setError(null);
        setTimeout(() => {
          setIsFetching(false);
        }, 500);
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
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-text text-center pt-20 py-4">
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
          {error && (
            <h1 className="text-2xl text-red-500 text-center">{error}</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Category;
