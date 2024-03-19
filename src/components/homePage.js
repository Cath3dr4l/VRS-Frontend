import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import "../App.css";
// import BackgroundImage from "../images/bg.png";
import InfiniteListComponent from "./infiniteList";

import SearchBar from "./searchBar";
import CardComponent from "./cardComponent";
import RowComponent from "./RowComponent";

const HomePage = () => {
  const { customer } = useAuthContext();

  return (
    <div>

      <RowComponent title="All Movies" videosPath="api/videos"/>
      <RowComponent title="Action" videosPath="api/videos"/>
      <RowComponent title="Horror" videosPath="api/videos"/>

      {/* <SearchBar
        isLoading={isLoading}
        items={data}
        canLoadMore={true}
        next={next}
        renderComponent={(item) => <CardComponent item={item} key={item.id} />}
        setData={setData}
      /> */}

    </div>
  );
};

export default HomePage;