import React, { useState, useEffect } from "react";
import StaffInfiniteListComponent from "./staffInfiniteList";
import StaffCardComponent from "./staffCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StaffSearchList = ({ videosPath }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(videosPath, { method: "GET" });
      const json = await response.json();
      const sortedMovies = json.sort((a, b) => b.rating - a.rating);
      setVideos(sortedMovies);
      setData(sortedMovies.slice(0, 25)); // Store the first 25 videos in data
    };
    fetchVideos();
    setFilteredData(videos);
  }, []);

  const keys = ["name"];

  const search = (data, query) => {
    return data.filter((row) =>
      keys.some((key) => row[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  const fetchMoreVideos = async (last, length = 25) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = filteredData.slice(last, last + length);
        resolve(newData);
      }, 1000);
    });
  };

  const next = async () => {
    const last = data.length;
    console.log(last);
    setIsLoading(true);
    const newData = await fetchMoreVideos(last);
    setData((prev) => [...prev, ...newData]);
    setIsLoading(false);
    if (data.length === filteredData.length) {
      setCanLoadMore({ right: false });
    }
  };

  useEffect(() => {
    setData(filteredData.slice(0, 25));
    if (data.length === filteredData.length) {
      setCanLoadMore({ right: false });
    }
  }, [filteredData]);

  return (
    <div className="relative mx-5">
      <input
        type="text"
        placeholder="Search..."
        className="text-white bg-gray-800 border-none px-3 py-2 my-4 rounded pl-10 w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        onChange={(e) => {
          setFilteredData(search(videos, e.target.value));
        }}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-7 text-white"
      />

      {data.length === 0 && <p style={{ color: "white" }}>No Movies Found</p>}

      {
        <StaffInfiniteListComponent
          style={{ scrollbars: "false" }}
          isLoading={isLoading}
          items={data}
          canLoadMore={canLoadMore}
          next={next}
          renderComponent={(item) => (
            <StaffCardComponent item={item} key={item.id} />
          )}
        />
      }
    </div>
  );
};

export default StaffSearchList;
