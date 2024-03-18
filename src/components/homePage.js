import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import "../App.css";
// import BackgroundImage from "../images/bg.png";
import InfiniteListComponent from "./infiniteList";
import { v4 as uuidv4 } from "uuid";

import SearchBar from "./searchBar";
import CardComponent from "./cardComponent";

const HomePage = () => {
  const { customer } = useAuthContext();

  const createItems = (length = 100) =>
    Array.from({ length }).map(() => uuidv4());

  const [data, setData] = useState(createItems());
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async (length = 100) =>
    new Promise((res) => setTimeout(() => res(createItems(length)), 500));

  // Fetch Movies
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("/api/videos", { method: "GET" });
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  // Log Out
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const next = async (direction) => {
    try {
      setIsLoading(true);
      const newData = await loadMore();

      setData((prev) =>
        direction === "right" ? [...newData, ...prev] : [...prev, ...newData]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={HeaderStyle}>
      <h1 className="main-title text-center">login / register page</h1>
      <p className="main-para text-center">join us now and don't waste time</p>
      <div className="buttons text-center">
        {!customer && (
          <div className="logged-out">
            <Link to="/login">
              <button className="primary-button">log in</button>
            </Link>
            <Link to="/signup">
              <button className="primary-button" id="reg_btn">
                <span>register </span>
              </button>
            </Link>
          </div>
        )}

        {customer && (
          <div className="logged-in">
            <Link to="/profile">
              <button className="primary-button">profile</button>
            </Link>
            <button className="primary-button" onClick={handleClick}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="m-5-auto text-center">
        <h2>Welcome to our website</h2>
        <h5>Explore our services</h5>
      </div>
      <InfiniteListComponent
        isLoading={isLoading}
        items={data}
        canLoadMore={true}
        next={next}
      />

      <SearchBar isLoading={isLoading} canLoadMore={true} next={next} />
      <div
        className="cards"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {videos && videos.map((item) => <CardComponent item={item} />)}
      </div>
    </div>
  );
};

export default HomePage;

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
