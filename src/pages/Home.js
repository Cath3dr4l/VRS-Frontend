import SearchBar from "../components/searchBar";
import RowComponent from "../components/RowComponent";
import GenreRow from "../components/GenreRow";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import DataComponent from "../components/dataComponent";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [movies, setMovies] = useState(null);
  const { customer } = useAuthContext();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsFetching(true);
      const response = await fetch("/api/movies", { method: "GET" });
      const data = await response.json();
      if (!response.ok) {
        setIsFetching(false);
      }
      if (response.ok) {
        const sortedMovies = data
          .filter((video) => video.disabled === false)
          .sort((a, b) => b.rating - a.rating);
        setMovies(sortedMovies);
        setTimeout(() => {
          setIsFetching(false);
        }, 500);
      }
    };

    if (!movies) {
      fetchMovies();
    }
  });

  return (
    <>
      {isFetching || !movies ? (
        <Loader />
      ) : (
        <div className="py-20">
          <SearchBar videosPath="api/movies" />

          {customer && <DataComponent />}

          <RowComponent title="All Movies" videosArray={movies} />
          <GenreRow genre="action" videosArray={movies} />
          <GenreRow genre="comedy" videosArray={movies} />
          <GenreRow genre="crime" videosArray={movies} />
          <GenreRow genre="sci-fi" videosArray={movies} />
          <GenreRow genre="fantasy" videosArray={movies} />
          <GenreRow genre="animation" videosArray={movies} />
          <GenreRow genre="drama" videosArray={movies} />
        </div>
      )}
    </>
  );
};

export default Home;
