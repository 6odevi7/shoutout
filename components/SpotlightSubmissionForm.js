const SpotlightSubmissionForm = () => {
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(24); // Default duration in hours

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/pages/api/auth/spotlight-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, duration }),
      });
      if (response.ok) {
        alert('Spotlight post submitted successfully!');
        setContent('');
        setDuration(24);
      } else {
        alert('Failed to submit spotlight post');
      }
    } catch (error) {
      console.error('Error submitting spotlight post:', error);
      alert('Error submitting spotlight post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="spotlight-submission-form">
      <h1>Submit a Paid Spotlight Post</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your spotlight post content"
        required
      />
      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      >
        <option value={24}>24 hours</option>
        <option value={48}>48 hours</option>
        <option value={72}>72 hours</option>
      </select>
      <button type="submit">Submit Spotlight Post</button>
    </form>
  );
};

export default SpotlightSubmissionForm;
