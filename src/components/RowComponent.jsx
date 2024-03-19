import React, { useEffect, useState } from 'react'
import InfiniteListComponent from "./infiniteList";
import CardComponent from './cardComponent';

const RowComponent = ({title, videosPath}) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState({ right: true });  

  // Fetch Movies
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(videosPath, { method: "GET" });
      const json = await response.json();
        setVideos(json);
        setData(json.slice(0, 25)); // Store the first 25 videos in data
    };
    fetchVideos();
  }, []);

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
        <h1 className='text-text font-semibold md:text-2xl p-4'>{title}</h1>
        <InfiniteListComponent
        style={{scrollbars : 'false'}}
        isLoading={isLoading}
        items={data}
        canLoadMore={canLoadMore}
        next={next}
        renderComponent={(item) => <CardComponent item={item} key={item.id} />}
        />
    </div> 
  )
}

export default RowComponent