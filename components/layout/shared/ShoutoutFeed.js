import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import io from 'socket.io-client';

const ShoutoutFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);

  useEffect(() => {
    fetchShoutouts();
    const socket = io();
    socket.on('newShoutout', (newShoutout) => {
      setShoutouts((prevShoutouts) => [newShoutout, ...prevShoutouts]);
    });
    return () => socket.disconnect();
  }, []);

  const fetchShoutouts = async () => {
    try {
      const response = await fetch('/api/shoutouts');
      const data = await response.json();
      setShoutouts(data);
    } catch (error) {
      console.error('Error fetching shoutouts:', error);
    }
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
      {shoutouts.map((shoutout) => (
        <div key={shoutout._id}>
          <div dangerouslySetInnerHTML={{ __html: renderContent(shoutout.content) }} />
        </div>
      ))}
    </div>
  );
};

export default ShoutoutFeed;