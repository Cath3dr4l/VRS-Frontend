import StaffSearchList from "../components/staffSearchList";
import NavButton from "../components/NavButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStaffContext } from "../hooks/useStaffContext";
import Loader from "../components/Loader";
import { FaBell } from "react-icons/fa";

const Staff = () => {
  const [movies, setMovies] = useState(null);
  const [notifs, setNotifs] = useState(null);
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

    const fetchNotifs = async () => {
      const response = await fetch("/api/staffs/notifs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staff.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
      } else {
        console.log(data);
        setNotifs(data);
      }
    };
    if (staff) {
      fetchMovies();
      fetchNotifs();
    }
  }, [staff]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <div className="fixed z-[100] m-5 ml-[250px] flex gap-8]">
            <NavButton label="All Orders" path="/management/allorders" />
            {notifs &&
            (notifs.lowStockMovies.length > 0 ||
              notifs.pastDueOrders.length > 0) ? (
              <Link to="/management/notifs" className="relative ml-4">
                <FaBell className="text-white" size="1.5em" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              </Link>
            ) : (
              <Link to="/management/notifs">
                <FaBell className="text-white ml-4" size="1.5em" />
              </Link>
            )}
          </div>
          <div className="pt-20">
            {movies && <StaffSearchList videosArray={movies} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;
