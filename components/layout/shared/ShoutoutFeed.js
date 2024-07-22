import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Image from 'next/image'

const ShoutoutFeed = React.memo(() => {
  const [shoutouts, setShoutouts] = useState([]);

  useEffect(() => {
    const socket = io();

    // Fetch initial shoutouts
    fetchShoutouts();

    // Listen for new shoutouts
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

  return (
    <div>
      {/* Render your shoutouts here */}
      {shoutouts.map((shoutout) => (
        <div key={shoutout.id}>
          {/* Render individual shoutout */}
          <p>{shoutout.content}</p>
        </div>
      ))}
    </div>
  );
});

ShoutoutFeed.displayName = 'ShoutoutFeed';

export default ShoutoutFeed;



