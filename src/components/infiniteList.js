import React from "react";
import useInfiniteScroll from "react-easy-infinite-scroll-hook";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"; 


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
    <div className="relative flex items-center group">
      <FaAngleDoubleLeft className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-white group-hover:text-primary cursor-pointer" onClick={() => ref.current.scrollBy(-300, 0)} />
      <div
        ref={ref}
        style={{
          px: -4,
          // height: 500,
          overflowX: "auto",
          overflowY: "auto",
          display: "flex",
          flexDirection: "row",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        {items.map((item) => renderComponent(item))}
        {isLoading && <div>Loading...</div>}
      </div>
      <FaAngleDoubleRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-white group-hover:text-primary cursor-pointer" onClick={() => ref.current.scrollBy(300, 0)} />
    </div>
  );
};

export default InfiniteListComponent;
