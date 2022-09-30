const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');
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
        .equals(true || false)
        .withMessage('Preview must be true or false'),
    handleValidationErrors
]

router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT AVG(reviews.stars) FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`), 'avgRating'
                ],
                [
                    sequelize.literal(`(
                        SELECT url FROM spotImages
                        WHERE spotImages.spotId = spot.id
                    )`), 'previewImage'
                ]
            ]
        }
    });

    return res.json({ Spots })
})

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const { id } = user.toSafeObject()
        const Spots = await Spot.findAll({
            where: {
                ownerId: id
            },
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                        SELECT AVG(reviews.stars) FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`), 'avgRating'
                    ],
                    [
                        sequelize.literal(`(
                        SELECT url FROM spotImages
                        WHERE spotImages.spotId = spot.id
                    )`), 'previewImage'
                    ]
                ]
            }
        })
        return res.json({ Spots })
    }
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

router.post('/', validateCreation, requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
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
    }
})

router.post('/:spotId/images', validateImages, requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
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
    }
})

router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    const { user } = req
    const targetSpot = await Spot.findByPk(req.params.spotId)
    const { id } = targetSpot
    const reveiwChecker = await Review.findOne({
        where: {
            userId: user.id,
            spotId: id
        }
    })
    if (reveiwChecker) {
        res.status(403)
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    } else {
        if (targetSpot) {
            const { review, stars } = req.body
            const newReview = await Review.create({
                userId: user.id,
                spotId: id,
                review,
                stars
            })
            return res.json(newReview)
        } else {
            res.status(404)
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
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