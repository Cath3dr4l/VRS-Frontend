import React from "react";
import useInfiniteScroll from "react-easy-infinite-scroll-hook";

const InfiniteListComponent = ({ isLoading, items, canLoadMore, next }) => {
  // TypeScript example:
  // const ref = useInfiniteScroll<YourElemntType>(...props);
  const ref = useInfiniteScroll({
    // Function to fetch more items
    next,
    // The number of items loaded if you use the "Y-scroll" axis ("up" and "down")
    // if you are using the "X-scroll" axis ("left" and "right") use "columnCount" instead
    // you can also use "rowCount" and "columnCount" if you use "Y-scroll" and "X-scroll" at the same time
    columnCount: items.length,
    // Whether there are more items to load
    // if marked "true" in the specified direction, it will try to load more items if the threshold is reached
    // support for all directions "up", "down", "left", "right", both individually and in all directions at the same time
    hasMore: { right: true },
  });

  console.log(items);

  return (
    <div
      ref={ref}
      style={{
        height: 500,
        overflowX: "auto",
        overflowY: "auto",
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {items.map((item) => (
        <div style={{ backgroundColor: "white", padding: 4 }} key={item.id}>
          <div
            style={{
              display: "flex",
              FlexDirection: "column",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.phone}</div>
          </div>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteListComponent;
