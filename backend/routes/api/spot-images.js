const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models')
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req
    const spotImg = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        }
    })
    if (spotImg) {
        const spot = await Spot.findByPk(spotImg.spotId)
        if (spot.ownerId === user.id) {
            await SpotImage.destroy({
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
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }
})


module.exports = router;