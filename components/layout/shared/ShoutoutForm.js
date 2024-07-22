import React, { useState, useRef } from 'react';
import styles from './ShoutoutForm.module.css';

const ShoutoutForm = () => {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shoutout submitted:', content);
    setContent('');
  };

  const handleEmojiSelect = (emoji) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const text = content.slice(0, cursorPosition) + emoji.native + content.slice(cursorPosition);
    setContent(text);
    setShowEmojiPicker(false);
  };

  const highlightHashtags = (text) => {
    return text.replace(/#\w+/g, match => `<span class="${styles.hashtag}">${match}</span>`);
  };

  return (
    <form className={styles.shoutoutForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.shoutoutInput}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Shout it out!"
          maxLength={maxLength}
        />
        <div 
          className={styles.formattedContent}
          dangerouslySetInnerHTML={{ __html: highlightHashtags(content) }}
        />
      </div>
      <div className={styles.formFooter}>
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
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