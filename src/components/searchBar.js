import React, { useState, useEffect } from "react";
import InfiniteListComponent from "./infiniteList";
import CardComponent from "./cardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ videosPath }) => {
  const [videos, setVideos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(videosPath, { method: "GET" });
      const json = await response.json();
      setVideos(json.filter((video) => video.disabled === false));
      setData(json.filter((video) => video.disabled === false).slice(0, 25)); // Store the first 25 videos in data
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
    <div>
      <div className="relative mx-5">
        <input
          type="text"
          placeholder="Search..."
          className="text-white bg-gray-800 border-none px-3 py-2 rounded pl-10 w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              setIsSearching(true);
            }
            if (e.target.value.length === 0) {
              setIsSearching(false);
            }
            setFilteredData(search(videos, e.target.value));
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-3 text-white"
        />
      </div>
      <div>
        <br />
        {data.length === 0 && isSearching && (
          <p className="text-white mx-5 mt-2">No Movies Found</p>
        )}

        {isSearching && (
          <InfiniteListComponent
            style={{ scrollbars: "false" }}
            isLoading={isLoading}
            items={data}
            canLoadMore={canLoadMore}
            next={next}
            renderComponent={(item) => (
              <CardComponent item={item} key={item.id} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
