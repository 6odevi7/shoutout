export default function Login(req, res) {
  if (req.method === 'POST') {
    return handleLogin(req, res);
  }

  return <LoginPage />;
}

async function handleLogin(req, res) {
  try {
    await dbConnect();

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const result = await handleLogin({ body: formData });
      if (result.status === 200) {
        console.log('Login successful');
        // Handle successful login (e.g., store token, update app state)
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Login to Shoutout!</h1>
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
