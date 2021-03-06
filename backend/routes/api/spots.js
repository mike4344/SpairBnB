const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, checkIfCurrentUser, getCurrentUserId } = require('../../utils/auth.js');
const {Spot, Image, Bookmark, Review} = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {multipleMulterUpload, multiplePublicFileUpload} = require('../../awsS3')

const router = express.Router();
//SpotName, SpotDetails, location, address, city, state
const validateSpot = [
    check('spotName')
      .exists({ checkFalsy: true })
      .isLength({min: 4, max: 20})
      .withMessage('Please provide a spot name between 4 and 20 characters'),
    check('spotDetails')
      .exists({ checkFalsy: true })
      .isLength({min: 100})
      .withMessage('Please provide valid spot details greater than 100 characters'),
    // check('location')
    //   .exists({ checkFalsy: true })
    //   .withMessage('Please provide a valid location'),
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid address'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid city'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid state'),
      handleValidationErrors
  ];

  const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a valid start date')
      .custom((possibleDate) => {

      })
  ]


//Finds spot by id
router.get(
    '/:spotId(\\d+)',
    asyncHandler(async (req, res, next) => {
      const spotId = parseInt(req.params.spotId, 10)
      let spot = await Spot.getSpot(spotId)
      let images = await Image.findBySpotId(spotId)
      if (spot) {
        return res.json({spot, images});
      } else return res.json({});
    }
  ));

//Create a spot
router.post(
    '/',
    multipleMulterUpload('images'),// going to need to add validations for file size and amount
    requireAuth,
    validateSpot,
    asyncHandler(async (req, res, next) => {
      const ownerId = await getCurrentUserId(req)
      const {spotName, spotDetails, location,  address, city, state} = req.body;
      const imageUrls = await multiplePublicFileUpload(req.files)// check here for multiple upload data type
      const newSpot = await Spot.create({ spotName, spotDetails, location, address, city, state, ownerId})
      imageUrls.forEach(imageUrl =>{
        Image.create({ spotId: newSpot.id, imageUrl})
      })
      return res.json({
        spot: newSpot,
        images: imageUrls
      })
    }),
  );

router.put('/:spotId(\\d+)',
  requireAuth,
  validateSpot,
  asyncHandler(async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.getSpot(spotId)
    const {spotName, spotDetails, location,  address, city, state} = req.body;
    if(checkIfCurrentUser(spot.OwnerId)){
      spot.update({spotName, spotDetails, location,  address, city, state})
    }
  })


)
  // Delete a spot
router.delete(
    '/:spotId(\\d+)',
    requireAuth,
    asyncHandler(async (_req, res, next) => {
      const spotId = _req.params.spotId
      const spot = Spot.getSpot(spotId)
      if(checkIfCurrentUser(spot.ownerId, req)){
        await spot.deleteDependants()
        await spot.destroy()
        res.json({success: 'success'})
      } else {
        res.json({success: 'failure' })
      }
    })
  );
  router.get('/search', asyncHandler(async (req, res, next) => {
    const locationList = await Spot.findAll()
    const updatedLocationList = await Promise.all(locationList.map(async (location) => {
      location.dataValues.images = await Image.findBySpotId(location.id)
      return location
    }))
    res.json(updatedLocationList)
  }))

  router.post('/:spotId(\\d+)/bookings', requireAuth, asyncHandler(async (req, res, next) => {
    const {startDate, endDate} = req.body;
    const spotId = parseInt(req.params.spotId, 10)
    const bookerId = await getCurrentUserId(req)
    const booking = await Bookmark.create({startDate, endDate, spotId, bookerId})
    res.json(booking)
  }))

  router.get('/:spotId(\\d+)/reviews', asyncHandler(async (req, res, next)=>{
    const spotId = parseInt(req.params.spotId, 10)
    const reviews = await Review.findAll({where: {spotId}})
    res.json(reviews)
  }))


  router.post('/:spotId(\\d+)/reviews', requireAuth, asyncHandler(async (req, res, next)=>{
    const {reviewBody, rating,} = req.body;
    const spotId = parseInt(req.params.spotId, 10)
    const authorId = await getCurrentUserId(req)
    const review = await Review.create({reviewBody, rating, spotId, authorId})
    res.json(review)
  }))
  //need to add ability to add remove images
module.exports = router;
