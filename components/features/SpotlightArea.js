import React, { useState, useEffect } from 'react';
import styles from './SpotlightArea.module.css';

const SpotlightArea = React.memo(() => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const spotlightPosts = [
    { content: "Exciting new features coming soon!", author: { username: "TechGuru" }, expiresAt: 1721558400000 },
    { content: "Don't miss our upcoming event!", author: { username: "EventPlanner" }, expiresAt: 1721562000000 },
    { content: "Check out our latest blog post!", author: { username: "ContentCreator" }, expiresAt: 1721560200000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPostIndex((prevIndex) => (prevIndex + 1) % spotlightPosts.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [spotlightPosts.length]);

  const currentPost = spotlightPosts[currentPostIndex];

  return (
    <div className={styles.spotlightArea}>
      <h2 className={styles.title}>Spotlight</h2>
      <div className={`${styles.spotlightPost} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
        <p className={styles.content}>{currentPost.content}</p>
        <div className={styles.postInfo}>
          <span className={styles.author}>By: {currentPost.author.username}</span>
          <span className={styles.expiration}>Expires: {new Date(currentPost.expiresAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
});

SpotlightArea.displayName = 'SpotlightArea';

export default SpotlightArea;

