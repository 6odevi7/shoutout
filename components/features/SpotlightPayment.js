import React, { useState } from 'react';
import axios from 'axios';

const SpotlightPayment = () => {
  const [postContent, setPostContent] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post('/api/spotlight-posts', {
        content: postContent,
        paymentAmount: parseFloat(paymentAmount),
        duration: parseInt(duration),
        paymentToken: 'dummy_token' // Replace with actual payment token
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Spotlight post created successfully!');
      // Reset form fields
      setPostContent('');
      setPaymentAmount('');
      setDuration('');
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'An error occurred while creating the spotlight post.');
    }
  };

  return (
    <div className="spotlight-payment">
      <h2>Submit Your Post to Spotlight</h2>
      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Enter your post content"
          required
        />
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          placeholder="Enter payment amount"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in hours"
          required
        />
        <button type="submit">Submit and Pay</button>
      </form>
    </div>
  );
};

export default SpotlightPayment;





