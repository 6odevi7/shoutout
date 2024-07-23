import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '/utils/dbConnect';
import User from '/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
