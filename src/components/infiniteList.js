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
    <div className="group relative items-center ease-in-out">
      <FaAngleDoubleLeft
        className="absolute left-0 top-1/2 z-[50] hidden h-[350px] -translate-y-1/2 transform cursor-pointer bg-gradient-to-r from-black text-3xl text-white/50 opacity-75 hover:text-white/90 hover:opacity-100 group-hover:block"
        onClick={() =>
          ref.current.scrollBy({
            left: -[window.innerWidth - 100],
            behavior: "smooth",
          })
        }
      />
      <div
        className="w-full"
        ref={ref}
        style={{
          px: -4,
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
      <FaAngleDoubleRight
        className="absolute right-0 top-1/2 z-[50] hidden h-[350px] -translate-y-1/2 transform cursor-pointer bg-gradient-to-l from-black text-3xl text-white/50 opacity-80 hover:text-white/90 hover:opacity-100 group-hover:block"
        onClick={() =>
          ref.current.scrollBy({
            left: [window.innerWidth - 100],
            behavior: "smooth",
          })
        }
      />
    </div>
  );
};

export default InfiniteListComponent;
