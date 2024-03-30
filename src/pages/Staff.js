import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";
import { useEffect, useState } from "react";
import { useStaffContext } from "../hooks/useStaffContext";
import Loader from "../components/Loader";

const Staff = () => {
  const [movies, setMovies] = useState(null);
  const { staff } = useStaffContext();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsFetching(true);
      const response = await fetch("/api/staffs/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staff.token}`,
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
    if (staff) {
      fetchMovies();
    }
  }, [staff]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <div className="fixed z-[100] m-5 ml-[200px] flex gap-4">
            <NavButton label="All Orders" path="/management/allorders" />
          </div>
          <div className="pt-20">
            <StaffSearchList videosArray={movies} />
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;
