import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';

const ShoutoutFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchShoutouts = useCallback(async () => {
    try {
      const response = await fetch(`/api/shoutouts?page=${page}&search=${searchTerm}`);
      const data = await response.json();
      setShoutouts(prevShoutouts => [...prevShoutouts, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Error fetching shoutouts:', error);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const socket = io();
    fetchShoutouts();

    socket.on('newShoutout', (newShoutout) => {
      setShoutouts((prevShoutouts) => [newShoutout, ...prevShoutouts]);
    });

    return () => socket.disconnect();
  }, [fetchShoutouts]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setShoutouts([]);
  };

  return (
    <FeedContainer>
      <SearchInput
        type="text"
        placeholder="Search shoutouts..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <InfiniteScroll
        dataLength={shoutouts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {shoutouts.map((shoutout) => (
          <ShoutoutPost key={shoutout.id}>
            <h3>{shoutout.username}</h3>
            <p>{shoutout.content}</p>
            {shoutout.imageUrl && (
              <Image src={shoutout.imageUrl} alt="Shoutout image" width={200} height={200} />
            )}
            <small>{new Date(shoutout.timestamp).toLocaleString()}</small>
            <div>
              <span>Views: {shoutout.views}</span>
              <span>Likes: {shoutout.likes}</span>
              <span>Shares: {shoutout.shares}</span>
            </div>
          </ShoutoutPost>
        ))}
      </InfiniteScroll>
    </FeedContainer>
  );
};

export default ShoutoutFeed;
