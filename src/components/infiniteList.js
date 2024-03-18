import React from "react";
import useInfiniteScroll from "react-easy-infinite-scroll-hook";

const InfiniteListComponent = ({
  isLoading,
  items,
  canLoadMore,
  next,
  renderComponent,
}) => {
  const ref = useInfiniteScroll({
    next,
    columnCount: items.length,
    hasMore: canLoadMore,
  });

  return (
    <div
      ref={ref}
      style={{
        height: 500,
        overflowX: "auto",
        overflowY: "auto",
        border: "1px solid white",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {items.map((item) => renderComponent(item))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteListComponent;
