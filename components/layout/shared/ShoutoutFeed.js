import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Feed = React.memo(() => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const socket = io();
    fetchPosts();
    socket.on('newPost', (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });
    return () => socket.disconnect();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/shoutouts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
});

Feed.displayName = 'ShoutoutFeed';

export default Feed;


