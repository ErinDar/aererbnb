const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, sequelize } = require('../../db/models');
const router = express.Router();

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


router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const { id } = user
        const Reviews = await Review.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                        // Only works locally   
                        [
                            sequelize.literal(`(
                                SELECT "url" FROM "spotImages" WHERE "spotImages.spotId = spot.id"
                            )`), 'previewImage'
                        ]
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })
        return res.json({ Reviews })
    }
})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const review = await Review.findByPk(req.params.reviewId)
        if (review) {
            if (user.id === review.userId) {
                const reviewImg = await ReviewImage.findAll({
                    where: {
                        reviewId: review.id
                    }
                })
                if (reviewImg.length <= 10) {
                    const { url } = req.body
                    await ReviewImage.create({
                        reviewId: review.id,
                        url
                    })
                    return res.json(await ReviewImage.findOne({
                        where: {
                            reviewId: review.id
                        },
                        attributes: ['id', 'url']
                    }))
                } else {
                    res.status(403)
                    return res.json({
                        message: "Maximum number of images for this resource was reached",
                        statusCode: 403
                    })
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
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
    }
})

router.put('/:reviewId', validateReview, requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const targetReview = await Review.findByPk(req.params.reviewId)
        if (targetReview) {
            if (user.id === targetReview.userId) {
                const { review, stars } = req.body
                await Review.update(
                    {
                        review,
                        stars,
                    },
                    {
                        where: {
                            id: targetReview.id
                        },
                    })
                return res.json(await Review.findByPk(req.params.reviewId))
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
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
    }
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req
    const targetReview = await Review.findByPk(req.params.reviewId)
    if (targetReview) {
        if (user.id === targetReview.userId) {
            await Review.destroy({
                where: {
                    id: req.params.reviewId
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
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;