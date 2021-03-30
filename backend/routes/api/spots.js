const express = require('express');
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, restoreUser} = require('../../utils/auth.js');
// const {Spot} = require('../../db/models')
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSpot = [

  ];


//gives spots
router.get(
    '/:spotId',
    (req, res) => {
      const spotId = req.params.spotId

      if (spot) {
        return res.json({
          spot
        });
      } else return res.json({});
    }
  );

//log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
