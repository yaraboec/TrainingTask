const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const NotFoundException = require('../errors/not.found.error');
const User = require('../models/user.model');

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.secret, { expiresIn: '1h' });
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

    const hashPassword = await bcrypt.hash(password, 7);
    const user = new User({
      email, password: hashPassword,
    });

    await user.save();

    return res.status(200).json({ msg: 'User is successfully registered.' });
  }

  async login(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new NotFoundException('Email or password is incorrect', 400));
    }

    const unHashedPassword = await bcrypt.compare(password, user.password);

    if (!unHashedPassword) {
      return next(new NotFoundException('Email or password is incorrect', 400));
    }
    const token = generateAccessToken(user._id);
    return res.json({ token });
  }
}

module.exports = AuthController;
