import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DOMPurify from 'dompurify';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (posts.length === 0) return <div>No posts available.</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id || post.id}>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
