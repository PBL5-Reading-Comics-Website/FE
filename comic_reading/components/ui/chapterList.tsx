import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChapterLink from "./chapterLink";

function ChapterList() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    // Fetch data from API or use dummy data
    const newItems = [
      { chapter: "Chapter 1", time: "Time 1", poster: "Poster 1" },
      // Add more items...
    ];

    if (newItems.length > 0) {
        setItems(prevItems => [...prevItems, ...newItems]);
      } else {
        setHasMore(false);
      }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      style={{ overflow: "hidden", height: "calc(5 * 3.5rem)" }} // Assuming each ChapterLink has a height of 3.5rem
    >
      {items.map((item, index) => (
        <ChapterLink key={index} {...item} />
      ))}
    </InfiniteScroll>
  );
}

export default ChapterList;