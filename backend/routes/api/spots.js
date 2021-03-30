const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, checkIfCurrentUser} = require('../../utils/auth.js');
const {Spot, Image} = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {multipleMulterUpload, multiplePublicFileUpload} = require('../../awsS3')

const router = express.Router();
//SpotName, SpotDetails, location, address, city, state
const validateSpot = [
    check('SpotName')
      .exists({ checkFalsy: true })
      .isLength({min: 4, max: 20})
      .withMessage('Please provide a spot name between 4 and 20 characters'),
    check('SpotDetails')
      .exists({ checkFalsy: true })
      .isLength({min: 100})
      .withMessage('Please provide valid spot details greater than 100 characters'),
    check('Location')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid location'),
    check('Address')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid address'),
    check('City')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid city'),
    check('State')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid state'),
      handleValidationErrors
  ];


//Finds spot by id
router.get(
    '/:spotId',
    asyncHandler(async (req, res, next) => {
      const spotId = req.params.spotId
      let spot = Spot.getSpot(spotId)
      let images = Image.findBySpotId(spotId)
      if (spot) {
        return res.json({spot, images});
      } else return res.json({});
    }
  ));

//Create a spot
router.post(
    '/',
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res, next) => {
      const { SpotId, SpotDetails, Location,  Address, City, State} = req.body;
      const newSpot = await Spot.create({ SpotId, SpotDetails, Location, Address, City, State})
      return res.json(`/spot/${newSpot}`)
    }),
  );

router.put('/:spotId',
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.getSpot(spotId)
    const {}
  })


)
  // Delete a spot
router.delete(
    '/:spotId',
    requireAuth,
    asyncHandler(async (_req, res, next) => {
      const spotId = _req.params.spotId
      const spot = Spot.getSpot(spotId)
      if(checkIfCurrentUser(spot.OwnerId)){
        await spot.deleteDependants()
        await spot.destroy()
        res.json({success: 'success'})
      } else {
        res.json({success: 'failure' })
      }
    })

  );

module.exports = router;
