const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')
const { Spot, Booking, SpotImage, sequelize } = require('../../db/models');
const router = express.Router();

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

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req
    const Bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            }
        ]
    })
    return res.json({ Bookings })
})

router.put('/:bookingId', validateBookings, requireAuth, async (req, res, next) => {
    const { user } = req
    const targetBooking = await Booking.findByPk(req.params.bookingId)
    if (targetBooking) {
        if (user.id === targetBooking.userId) {
            const today = new Date()
            const { startDate, endDate } = req.body
            const newStartDate = new Date(startDate)
            const newEndDate = new Date(endDate)
            if (today > targetBooking.endDate) {
                res.status(403)
                return res.json({
                    message: "Past bookings can't be modified",
                    statusCode: 403
                })
            } else {
                const bookingCheck = await Booking.findOne({
                    where: {
                        spotId: targetBooking.spotId,
                        [Op.or]: [{ startDate: newStartDate }, { endDate: newEndDate }]
                    }
                })
                if (bookingCheck) {
                    res.status(403)
                    return res.json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors: {
                            startDate: "Start date conflicts with an existing booking",
                            endDate: "End date conflicts with an existing booking"
                        }
                    })
                } else {
                    await Booking.update(
                        {
                            startDate,
                            endDate,
                        },
                        {
                            where: {
                                id: req.params.bookingId
                            }
                        })
                }
                return res.json(await Booking.findByPk(req.params.bookingId))
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
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req
    const targetBooking = await Booking.findByPk(req.params.bookingId)
    if (targetBooking) {
        const targetSpot = await Spot.findByPk(targetBooking.spotId)
        const today = new Date()
        if (targetBooking.startDate === today || targetBooking.startDate < today) {
            res.status(403)
            return res.json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
        }
        if (targetBooking.userId === user.id || targetSpot.ownerId === user.id) {
            await Booking.destroy({
                where: {
                    id: req.params.bookingId
                }
            })
            return res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
    } else {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

})

module.exports = router;