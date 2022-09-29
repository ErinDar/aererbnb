const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot } = require('../../db/models');
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

router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll();
    return res.json({ Spots })
})

router.get('/current', async (req, res, next) => {
    const { user } = req
    if (user) {
        const { id } = user.toSafeObject()
        const Spots = await Spot.findAll({
            where: {
                ownerId: id
            }
        })
        return res.json({ Spots })
    } else {
        res.status(401)
        return res.json({
            message: "Authentication required",
            statusCode: 401
        })
    }
})

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: {
            model: User,
            as: "Owner",
            attributes: ['id', 'firstName', 'lastName']
        }
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

router.post('/', validateCreation, async (req, res, next) => {
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
    } else {
        res.status(401)
        return res.json({
            message: "Authentication required",
            statusCode: 401
        })
    }
})


module.exports = router;