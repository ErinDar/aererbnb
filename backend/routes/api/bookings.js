const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    if (user) {
        const Bookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                        [
                            sequelize.literal(`(
                        SELECT url FROM spotImages
                        WHERE spotImages.spotId = spot.id
                    )`), 'previewImage'
                        ]
                    ]
                }
            ],
        })
        return res.json({ Bookings })
    }
})




module.exports = router;