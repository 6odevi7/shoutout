import React from 'react';
import DOMPurify from 'dompurify';

const Post = ({ content, author, timestamp }) => {
  return (
    <div className="post">
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      <p>Posted by: {author}</p>
      <p>Time: {new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};

export default Post;
