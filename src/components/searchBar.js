import React, { useState, useEffect } from "react";
import InfiniteListComponent from "./infiniteList";
import CardComponent from "./cardComponent";

const SearchBar = ({ videosPath }) => {
  const [videos, setVideos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(videosPath, { method: "GET" });
      const json = await response.json();
      setVideos(json);
      setData(json.slice(0, 25)); // Store the first 25 videos in data
    };
    fetchVideos();
  }, []);

  const keys = ["name"];

  const search = (data, query) => {
    return data.filter((row) =>
      keys.some((key) => row[key].toLowerCase().includes(query.toLowerCase())),
    );
  };

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
    console.log(last);
    setIsLoading(true);
    const newData = await fetchMoreVideos(last);
    setData((prev) => [...prev, ...newData]);
    setIsLoading(false);
    if (data.length === videos.length) {
      setCanLoadMore({ right: false });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          if (e.target.value.length !== 0) {
            setIsSearching(true);
          }
          if (e.target.value.length === 0) {
            setIsSearching(false);
          }
          setData(search(videos, e.target.value));
        }}
      />

      {data.length === 0 && isSearching && (
        <p style={{ color: "white" }}>Maa chuda</p>
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
  );
};

export default SearchBar;
