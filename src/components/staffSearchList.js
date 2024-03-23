import React, { useState, useEffect } from "react";
import StaffInfiniteListComponent from "./staffInfiniteList";
import StaffCardComponent from "./staffCardComponent";

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
      setVideos(json);
      setData(json.slice(0, 25)); // Store the first 25 videos in data
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
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setFilteredData(search(videos, e.target.value));
        }}
      />

      {data.length === 0 && (
        <p style={{ color: "white" }}>No Movies Found</p>
      )}

      {(
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
      )}
    </div>
  );
};

export default StaffSearchList;
