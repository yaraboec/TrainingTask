const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { secret } = require('../secret');

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

class AuthController {
  async register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const availability = await User.findOne({ email });

    if (availability) {
      return res.status(400).json({ msg: 'Email is already in use.' });
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({
      email, password: hashPassword,
    });

    await user.save();

    return res.status(200).json({ msg: 'User is successfully registered.' });
  }

  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User with such email was not find.' });
    }

    const unHashedPassword = bcrypt.compareSync(password, user.password);

    if (!unHashedPassword) {
      return res.status(400).json({ msg: 'Incorrect password. Try again.' });
    }
    const token = generateAccessToken(user._id);
    return res.json(token);
  }
}

module.exports = AuthController;
