import React, { useState, useEffect } from 'react';
import styles from './AIInsightPost.module.css';

const AIInsightPost = React.memo(() => {
  const [currentPost, setCurrentPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const generateAIPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-insight');
      const data = await response.json();
      console.log('AI response:', data);
      return data.insight || 'No insight available at the moment.';
    } catch (error) {
      console.error('Error generating AI post:', error);
      return "Exploring the intersection of global trends and local impact...";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAIPost().then(setCurrentPost);

    const interval = setInterval(async () => {
      setIsTransitioning(true);
      setTimeout(async () => {
        const newPost = await generateAIPost();
        setCurrentPost(newPost);
        setIsTransitioning(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.aiInsightArea}>
      <h2 className={styles.title}>AI Insight</h2>
      <div className={`${styles.aiPost} ${isTransitioning ? styles.slideOut : styles.slideIn}`}>
        {isLoading ? (
          <p className={styles.loading}>Loading AI insight...</p>
        ) : (
          <p className={styles.content}>{currentPost}</p>
        )}
      </div>
    </div>
  );
});

AIInsightPost.displayName = 'AIInsightPost';

export default AIInsightPost;
