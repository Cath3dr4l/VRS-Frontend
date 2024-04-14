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
    // columnCount: 3,
    hasMore: canLoadMore,
  });

  return (
    <div>
      <div
        className="grid grid-cols-3 gap-4 mx-4"
        ref={ref}
        style={{
          height: "80vh",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item) => renderComponent(item))}
        {isLoading && (
          <div className="text-text text-lg font-semibold">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default StaffInfiniteListComponent;
