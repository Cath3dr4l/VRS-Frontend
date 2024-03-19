import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import "../App.css";
// import BackgroundImage from "../images/bg.png";
import InfiniteListComponent from "./infiniteList";

import SearchBar from "./searchBar";
import CardComponent from "./cardComponent";

const HomePage = () => {
  const { customer } = useAuthContext();

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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });

  const fetchMoreVideos = async (last, length = 25) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = videos.slice(last, last + length);
        resolve(newData);
      }, 1000);
    });
  };

  const next = async () => {
    const last = data.length;
    setIsLoading(true);
    const newData = await fetchMoreVideos(last);
    setData((prev) => [...prev, ...newData]);
    setIsLoading(false);
    if (data.length === videos.length) {
      setCanLoadMore({ right: false });
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("/api/videos", { method: "GET" });
      const data = await response.json();
      setVideos(data);
      setData(data.slice(0, 25)); // Store the first 25 videos in data
    };
    fetchVideos();
  }, []);

  return (
    <div className="px-4">

      <h1 className="font-semibold text-text">All Movies</h1>

      <InfiniteListComponent
        style={{scrollbars : 'false'}}
        isLoading={isLoading}
        items={data}
        canLoadMore={canLoadMore}
        next={next}
        renderComponent={(item) => <CardComponent item={item} key={item.id} />}
      />

      <SearchBar
        isLoading={isLoading}
        items={data}
        canLoadMore={true}
        next={next}
        renderComponent={(item) => <CardComponent item={item} key={item.id} />}
        setData={setData}
      />
      {/* <div
        className="cards"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {videos && videos.map((item) => <CardComponent item={item} />)}
      </div> */}
      </div>
  );
};

export default HomePage;