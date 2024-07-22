import { useState } from 'react';
import { RegisterForm } from '../components/AuthForms';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Implement your registration logic here
      // For example, you could make an API call to your backend
      console.log('Registration data:', formData);
      // Add your API call or registration logic here
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Join Shoutout!</h1>
      <RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
