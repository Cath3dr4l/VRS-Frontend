import React from "react";
import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";
import { useEffect, useState } from "react";
import { useManagerContext } from "../hooks/useManagerContext";
import Loader from "../components/Loader";

const Manager = () => {
  const [movies, setMovies] = useState(null);
  const { manager } = useManagerContext();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsFetching(true);
      const response = await fetch("/api/managers/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${manager.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setIsFetching(false);
      } else {
        setMovies(data.sort((a, b) => b.rating - a.rating));
        setIsFetching(false);
      }
    };
    if (manager) {
      fetchMovies();
    }
  }, [manager]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <div className="py-20">
            {movies && <StaffSearchList videosArray={movies} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Manager;
