const express = require('express');
const { body } = require('express-validator');

const AuthController = require('../controllers/auth.controller');

const authController = new AuthController();

const router = express.Router();

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

router.post('/registration',
  body('email', 'Your email is not correct.').isEmail(),
  body('password', 'Your password is way short or long. It is about to be between 8 and 16.').isLength({ min: 8, max: 16 }),
  catchAsync(authController.register));
router.post('/login',
  body('email', 'Your email is not correct.').isEmail(),
  body('password', 'Input your password, please.').notEmpty(),
  catchAsync(authController.login));

module.exports = router;
