import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import styles from './AIInsightPost.module.css';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const AIInsightPost = React.memo(() => {
  const [currentPost, setCurrentPost] = useState('Initializing AI Insight...');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const generateAIPost = async () => {
    try {
      const prompt = `Create a single, impactful sentence about the current global situation and its effect on our local community. Use simple language and focus on a trending topic.`;
      
      const response = await openai.completions.create({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.8,
        presence_penalty: 0.6,
        frequency_penalty: 0.6,
      });
      
      return response.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating AI post:', error);
      return "Exploring the intersection of global trends and local impact...";
    }
  };

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) return null;

  return (
    <div className={styles.aiInsightArea}>
      <h2 className={styles.title}>AI Insight</h2>
      <div className={`${styles.aiPost} ${isTransitioning ? styles.slideOut : styles.slideIn}`}>
        <p className={styles.content}>{currentPost}</p>
      </div>
    </div>
  );
});

AIInsightPost.displayName = 'AIInsightPost';

export default AIInsightPost;
