const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const validateCreation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name', 'Name must be less than 50 character')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 }),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateImages = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('URL for image is required'),
    check('preview')
        .exists({ checkNull: true })
        .withMessage('Preview must be true or false'),
    handleValidationErrors
]

const validateBookings = [
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            const endDate = Date.parse(value)
            const startDate = Date.parse(req.body.startDate)
            if (endDate <= startDate) {
                return false
            }
            return true
        })
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
]

const validateQuery = [
    check('page')
        .isLength({ min: 1, max: 10 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .isLength({ min: 1, max: 20 })
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .isDecimal()
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .isDecimal()
        .withMessage('Maximum longitude is invalid'),
    check('minPrice')
        .isLength({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .isLength({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0')
]

router.get('/', validateQuery, async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT AVG("Reviews"."stars") FROM "Reviews" WHERE "Reviews"."spotId" = "spot"."id"
                    )`), 'avgRating'
                ],
                [
                    sequelize.literal(`(
                        SELECT "url" FROM "SpotImages" WHERE "SpotImages"."spotId" = "spot"."id" AND "preview" = true
                    )`), 'previewImage'
                ]
            ]
        }
    });
    return res.json({ Spots })
    // const Spots = await Spot.findAll({
    //     include: [Review, SpotImage]
    // })
    // let response = [];
    // for (let spot of Spots) {
    //     let totalStars = 0;
    //     for (let review of spot.Reviews) {
    //         totalStars += review.stars
    //     }

    //     let avgRating = totalStars / spot.Reviews.length

    //     spot.dataValues.avgRating = avgRating

    //     for (let image of spot.SpotImages) {
    //         if (!spot.dataValues.previewImage) {
    //             if (image.preview === true) {
    //                 spot.dataValues.previewImage = image.url
    //             }
    //         }
    //     }
    //     if (!spot.dataValues.previewImage) {
    //         spot.dataValues.previewImage = "No preview image"
    //     }
    //     delete spot.dataValues.Reviews
    //     delete spot.dataValues.SpotImages
    //     response.push(spot)
    // }

    // return res.json({ Spots: response })
})

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    const { id } = user
    // Only works locally
    // const Spots = await Spot.findAll({
    //     where: {
    //         ownerId: id
    //     },
    //     attributes: {
    //         include: [
    //             [
    //                 sequelize.literal(`(
    //                     SELECT AVG("Reviews"."stars") FROM "Reviews"
    //                     WHERE "Reviews"."spotId" = "Spots"."id"
    //                 )`), 'avgRating'
    //             ],
    //             [
    //                 sequelize.literal(`(
    //                     SELECT url FROM "SpotImages"
    //                     WHERE "SpotImages"."spotId" = "Spots"."id" AND preview = true
    //                 )`), 'previewImage'
    //             ]
    //         ]
    //     }
    // })
    const Spots = await Spot.findAll({
        where: {
            ownerId: id
        },
        include: [Review, SpotImage]
    })
    let individualSpots = [];
    for (let spot of Spots) {
        let totalStars = 0;
        for (let review of spot.Reviews) {
            totalStars += review.stars
        }

        let avgRating = totalStars / spot.Reviews.length

        spot.dataValues.avgRating = avgRating

        for (let image of spot.SpotImages) {
            if (!spot.dataValues.previewImage) {
                if (image.preview === true) {
                    spot.dataValues.previewImage = image.url
                }
            }
        }
        if (!spot.dataValues.previewImage) {
            spot.dataValues.previewImage = "No preview image"
        }
        delete spot.dataValues.Reviews
        delete spot.dataValues.SpotImages
        individualSpots.push(spot)
    }
    return res.json({ Spots: individualSpots })
})

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: SpotImage,
                as: "SpotImages",
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName'],
            }
        ]
    })
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } else {
        res.json(spot)
    }
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const targetSpot = await Spot.findByPk(req.params.spotId)
    if (targetSpot) {
        const Reviews = await Review.findOne({
            where: {
                spotId: req.params.spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })
        return res.json({ Reviews })
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        if (user.id === spot.ownerId) {
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "firstName", "lastName"]
                    }
                ]
            })
            return res.json({ Bookings })
        } else {
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            })
            return res.json({ Bookings })
        }
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/', validateCreation, requireAuth, async (req, res, next) => {
    const { user } = req
    const { id } = user
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    res.status(201)
    return res.json(await Spot.create({
        ownerId: id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    );

})

router.post('/:spotId/images', validateImages, requireAuth, async (req, res, next) => {
    const { user } = req
    const { id } = user
    const { url, preview } = req.body
    const targetSpot = await Spot.findByPk(req.params.spotId)
    if (targetSpot) {
        const { ownerId } = targetSpot
        if (ownerId === id) {
            await SpotImage.create({
                spotId: targetSpot.id,
                url,
                preview
            })
            return res.json(await SpotImage.findOne({
                where: {
                    spotId: req.params.spotId
                },
                attributes: ['id', 'url', 'preview']
            }))
        } else {
            res.status(403)
            return res.json({
                message: "Forbidden",
                statusCode: 403
            })
        }
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    const { user } = req
    const targetSpot = await Spot.findByPk(req.params.spotId)
    if (targetSpot) {
        const reveiwChecker = await Review.findOne({
            where: {
                userId: user.id,
                spotId: targetSpot.id
            }
        })
        if (reveiwChecker) {
            res.status(403)
            return res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        } else {
            const { review, stars } = req.body
            const newReview = await Review.create({
                userId: user.id,
                spotId: targetSpot.id,
                review,
                stars
            })
            res.status(201)
            return res.json(newReview)
        }
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.post('/:spotId/bookings', validateBookings, requireAuth, async (req, res, next) => {
    const { user } = req
    const targetSpot = await Spot.findByPk(req.params.spotId)
    if (targetSpot) {
        if (user.id !== targetSpot.userId) {
            const { startDate, endDate } = req.body
            const newStartDate = new Date(startDate)
            const newEndDate = new Date(endDate)
            const bookingCheck = await Booking.findOne({
                where: {
                    spotId: targetSpot.id,
                    [Op.or]: [{ startDate: newStartDate }, { endDate: newEndDate }]
                }
            })
            if (bookingCheck) {
                res.status(403)
                return res.json({
                    message: "Sorry, this spot is already booked for the specifed dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
            } else {
                const newBooking = await Booking.create({
                    spotId: targetSpot.id,
                    userId: user.id,
                    startDate,
                    endDate
                })
                return res.json(newBooking)
            }
        } else {
            res.status(403)
            return res.json({
                message: "Forbidden",
                statusCode: 403
            })
        }
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

router.put('/:spotId', validateCreation, requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const { id } = user
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const targetSpot = await Spot.findByPk(req.params.spotId)
        if (targetSpot) {
            const { ownerId } = targetSpot
            if (ownerId === id) {
                await Spot.update(
                    {
                        address,
                        city,
                        state,
                        country,
                        lat,
                        lng,
                        name,
                        description,
                        price
                    },
                    {
                        where: {
                            id: req.params.spotId
                        }
                    });
                return res.json(await Spot.findByPk(req.params.spotId))
            } else {
                res.status(403)
                return res.json({
                    message: "Forbidden",
                    statusCode: 403
                })
            }
        } else {
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
    }
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const { id } = user
        const targetSpot = await Spot.findByPk(req.params.spotId)
        if (targetSpot) {
            const { ownerId } = targetSpot
            if (ownerId === id) {
                await Spot.destroy({
                    where: {
                        id: req.params.spotId
                    }
                })
                return res.json({
                    message: "Successfully deleted",
                    statusCode: 200
                })
            } else {
                res.status(403)
                return res.json({
                    message: "Forbidden",
                    statusCode: 403
                })
            }
        } else {
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
    }
})

module.exports = router;