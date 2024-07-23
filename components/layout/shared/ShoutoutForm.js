import React, { useState, useRef } from 'react';
import styles from './ShoutoutForm.module.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import axios from 'axios';

const ShoutoutForm = () => {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/shoutouts', { content });
      console.log('Shoutout posted:', response.data);
      setContent('');
    } catch (error) {
      console.error('Error posting shoutout:', error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const text = content.slice(0, cursorPosition) + emoji.native + content.slice(cursorPosition);
    setContent(text);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  return (
    <form className={styles.shoutoutForm} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.shoutoutInput}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind? Paste a YouTube URL to share a video!"
        maxLength={maxLength}
      />
      <div className={styles.formFooter}>
        <button type="button" onClick={toggleEmojiPicker}>😊</button>
        {showEmojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
        <span className={styles.charCount}>{maxLength - content.length} characters left</span>
        <button type="submit" className={styles.submitButton} disabled={!content.trim()}>
          Shout!
        </button>
      </div>
    </form>
  );
};

export default ShoutoutForm;
