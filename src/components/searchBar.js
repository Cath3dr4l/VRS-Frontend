import React, { useState } from "react";
import InfiniteListComponent from "./infiniteList";
import { data } from "./MOCK_DATA";

const SearchBar = ({
  isLoading,
  items,
  canLoadMore,
  next,
  renderComponent,
}) => {
  const [query, setQuery] = useState("");
  const keys = ["name"];

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
        renderComponent={renderComponent}
      />
    </div>
  );
};

export default SearchBar;
