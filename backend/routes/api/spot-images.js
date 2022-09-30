const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models')
const router = express.Router();


// router.delete('/:imageId', requireAuth, async (req, res, next) => {
//     const { user } = req
//     const spotImg = await SpotImage.findOne({
//         where: {
//             id: req.params.imageId
//         }
//     })
//     const spot = await Spot.findByPk(spotImg.spotId)
//     if (spot.ownerId === user.id) {

//     }
// })


module.exports = router;