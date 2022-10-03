const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models')
const router = express.Router()


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req
    const reviewImg = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        }
    })
    if (reviewImg) {
        const review = await Review.findByPk(reviewImg.spotId)
        if (review.ownerId === user.id) {
            await ReviewImage.destroy({
                where: {
                    id: req.params.imageId
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
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }
})


module.exports = router;