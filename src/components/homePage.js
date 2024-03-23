import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import RowComponent from "./RowComponent";

const HomePage = () => {

  return (
    <div className="py-20">
      <SearchBar videosPath="api/videos" />

      <RowComponent title="All Movies" videosPath="api/videos" />
      <RowComponent title="Action" videosPath="api/videos/genre/action" />
      <RowComponent title="Sci-Fi" videosPath="api/videos/genre/sci-fi" />
      <RowComponent title="Drama" videosPath="api/videos/genre/drama" />
    </div>
  );
};

export default HomePage;
