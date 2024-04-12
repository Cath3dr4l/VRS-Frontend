import React, { useState, useEffect, useRef } from "react";
import InfiniteListComponent from "./infiniteList";
import CardComponent from "./cardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ videosArray, initialQuery = "" }) => {
  const [videos, setVideos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchVideos = () => {
      const filteredVideos = videosArray.filter(
        (video) => video.disabled === false
      );
      setVideos(filteredVideos);
      setFilteredData(search(filteredVideos, initialQuery));
      setData(search(filteredVideos, initialQuery).slice(0, 25)); // Store the first 25 videos in data
    };

    if (videosArray) {
      fetchVideos();
    }
  }, [initialQuery, videosArray]);

  useEffect(() => {
    inputRef.current.value = initialQuery;
    if (initialQuery.length !== 0) {
      setIsSearching(true);
    }
    if (initialQuery.length === 0) {
      setIsSearching(false);
    }
    setFilteredData(search(videos, initialQuery));
  }, [initialQuery, videos]);

  const keys = ["name", "director", "cast"];
  // search through data['cast'] which is an array as well

  const search = (data, query) => {
    return data.filter((video) => {
      return keys.some((key) => {
        if (Array.isArray(video[key])) {
          return video[key].some((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
        }
        return video[key].toLowerCase().includes(query.toLowerCase());
      });
    });
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
    if (data.length + 25 >= filteredData.length) {
      setCanLoadMore({ right: false });
    }
    setData((prev) => [...prev, ...newData]);
    setIsLoading(false);
  };

  useEffect(() => {
    setData(filteredData.slice(0, 25));
    if (25 >= filteredData.length) {
      setCanLoadMore({ right: false });
    } else {
      setCanLoadMore({ right: true });
    }
  }, [filteredData]);

  return (
    <div>
      <div className="relative mx-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full rounded border-none bg-gray-800 px-3 py-2 pl-10 text-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
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
          <p className="mx-5 mt-2 text-white">No Movies Found</p>
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
