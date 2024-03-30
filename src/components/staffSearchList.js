import React, { useState, useEffect } from "react";
import StaffInfiniteListComponent from "./staffInfiniteList";
import StaffCardComponent from "./staffCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StaffSearchList = ({ videosArray }) => {
  const [videos, setVideos] = useState(videosArray);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ down: true });
  const [data, setData] = useState(videosArray.slice(0, 24));
  const [filteredData, setFilteredData] = useState(videosArray);

  const keys = ["name"];

  const search = (data, query) => {
    return data.filter((row) =>
      keys.some((key) => row[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  const fetchMoreVideos = async (last, length = 24) => {
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
    if (data.length + 24 >= filteredData.length) {
      setCanLoadMore({ down: false });
    }
    setData((prev) => [...prev, ...newData]);
    setIsLoading(false);
    if (data.length === filteredData.length) {
      setCanLoadMore({ down: false });
    }
  };

  useEffect(() => {
    setData(filteredData.slice(0, 24));
    if (24 >= filteredData.length) {
      setCanLoadMore({ down: false });
    } else {
      setCanLoadMore({ down: true });
    }
  }, [filteredData]);

  return (
    <>
      <div className="relative mx-5">
        <input
          type="text"
          placeholder="Search..."
          className="my-4 w-full rounded border-none bg-gray-800 px-3 py-2 pl-10 text-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
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
          className="absolute left-3 top-7 text-white"
        />
      </div>
      <div>
        {data.length === 0 && <p style={{ color: "white" }}>No Movies Found</p>}

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
      </div>
    </>
  );
};

export default StaffSearchList;
