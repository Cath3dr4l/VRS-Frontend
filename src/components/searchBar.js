import React, { useState } from "react";
import InfiniteListComponent from "./infiniteList";
import { data } from "./MOCK_DATA";

const SearchBar = ({ isLoading, canLoadMore, next }) => {
  const [query, setQuery] = useState("");
  const keys = ["name", "email", "phone"];

  const search = (data) => {
    return data.filter((row) =>
      keys.some((key) => row[key].toLowerCase().includes(query.toLowerCase())),
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <InfiniteListComponent
        items={search(data)}
        isLoading={isLoading}
        canLoadMore={canLoadMore}
        next={next}
      />
    </div>
  );
};

export default SearchBar;
