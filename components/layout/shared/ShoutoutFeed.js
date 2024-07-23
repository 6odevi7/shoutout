import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '/contexts/SocketContext';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from 'lodash/debounce';

const CACHE_KEY = 'shoutoutCache';

const ShoutoutFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const socket = useSocket();

  const fetchShoutouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setShoutouts(JSON.parse(cachedData));
      }
      const response = await fetch(`/api/shoutouts?page=${page}&search=${searchTerm}`);
      const data = await response.json();
      setShoutouts(prevShoutouts => [...data, ...prevShoutouts]);
      setHasMore(data.length > 0);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      setError('Failed to fetch shoutouts. Please try again.');
      console.error('Error fetching shoutouts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchTerm]);

  const handleNewShoutout = useCallback((newShoutout) => {
    setShoutouts(prevShoutouts => [newShoutout, ...prevShoutouts]);
  }, []);

  useEffect(() => {
    fetchShoutouts();
    
    if (socket) {
      socket.on('shoutout_added', (newShoutout) => {
        setShoutouts(prevShoutouts => [newShoutout, ...prevShoutouts]);
      });
    }
  
    return () => {
      if (socket) {
        socket.off('shoutout_added');
      }
    };
  }, [socket, fetchShoutouts]);  

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const renderContent = (content) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
    const sanitizedContent = DOMPurify.sanitize(content);
    return sanitizedContent.replace(youtubeRegex, (match, videoId) => {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search shoutouts..."
        onChange={handleSearchChange}
        style={{ color: '#000000' }}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      <div className="scrollable-content" style={{ height: '80vh', overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={shoutouts.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        threshold={300}
        scrollableTarget="scrollableDiv"
      >
        {shoutouts.map((shoutout) => (
          <div key={shoutout._id}>
            <div dangerouslySetInnerHTML={{ __html: renderContent(shoutout.content) }} />
          </div>
        ))}
         {/* ... */}
      </InfiniteScroll>
    </div>
    </div>
  );
};
export default ShoutoutFeed;
