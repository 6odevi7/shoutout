export default function Register(req, res) {
  if (req.method === 'POST') {
    return handleRegistration(req, res);
  }

  return <RegistrationPage />;
}

async function handleRegistration(req, res) {
  try {
    await dbConnect();

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const result = await handleRegistration({ body: formData });
      if (result.status === 201) {
        console.log('Registration successful');
        // Handle successful registration (e.g., redirect to login page)
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (e.g., show error message)
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
