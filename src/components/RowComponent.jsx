import React, { useEffect, useState } from "react";
import InfiniteListComponent from "./infiniteList";
import CardComponent from "./cardComponent";

const RowComponent = ({ title, videosArray }) => {
  const [data, setData] = useState(videosArray.slice(0, 25));
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });
  const [videos, setVideos] = useState(videosArray);

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
      <h1 className="text-text p-4 font-semibold md:text-2xl capitalize">
        {title}
      </h1>
      <InfiniteListComponent
        style={{ scrollbars: "false" }}
        isLoading={isLoading}
        items={data}
        canLoadMore={canLoadMore}
        next={next}
        renderComponent={(item) => <CardComponent item={item} key={item.id} />}
      />
    </div>
  );
};

export default RowComponent;
