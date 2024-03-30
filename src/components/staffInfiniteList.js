import React from "react";
import useInfiniteScroll from "react-easy-infinite-scroll-hook";

const StaffInfiniteListComponent = ({
  isLoading,
  items,
  canLoadMore,
  next,
  renderComponent,
}) => {
  const ref = useInfiniteScroll({
    next,
    rowCount: items.length,
    hasMore: canLoadMore,
  });

  return (
    <div>
      <div
        className="w-full"
        ref={ref}
        style={{
          px: -4,
          overflowX: "auto",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item) => renderComponent(item))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default StaffInfiniteListComponent;
