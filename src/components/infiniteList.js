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
        px: -4,
        height: 500,
        overflowX: "auto",
        overflowY: "auto",
        display: "flex",
        flexDirection: "row",
        scrollbarWidth: "none",
      }}
    >
      {items.map((item) => renderComponent(item))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteListComponent;
