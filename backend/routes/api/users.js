// backend/routes/api/users.js
const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors} = require('../../utils/validation')
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for the Email Address.')
  .isLength({ max: 100 })
  .withMessage('Email Address must be less than 100 characters.')
  .isEmail()
  .withMessage('Please enter a valid Email Address.')
  .custom((value) => {
      return User.findOne({
          where: {
              email: value
          }
      }).then((user) => {
          if (user) {
              return Promise.reject('The provided Email Address is already in use.')
          }
      })
  }),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 8 })
      .withMessage('Password must be 8 characters or more.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    handleValidationErrors,
  ];

// Sign up
router.post(
    '/',
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {

      const { email, password, username } = req.body;

      const profileImageUrl = await singlePublicFileUpload(req.file)
      const user = await User.signup({ email, username, password, imageUrl:profileImageUrl });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );


module.exports = router;
