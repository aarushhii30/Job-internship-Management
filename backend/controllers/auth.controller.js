const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES || '7d',
});

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, passwordHash,
    role: role === 'admin' ? 'admin' : 'user',
  });
  res.status(201).json({
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({
    token: sign(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
