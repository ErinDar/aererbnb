const express = require('express')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')
const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];

router.get('/', (req, res) => {
    const { user } = req
    if (user) {
        return res.json({
            user: user.toSafeObject()
        })
    } else {
        return res.json({})
    }
})

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.login({
        credential,
        password
    })

    if (!user) {
        res.status(401)
        return res.json({
            message: 'Invalid credentials',
            statusCode: 401
        })
    }

    const token = await setTokenCookie(res, user)

    user.dataValues.token = token

    return res.json(user)
})

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: 'success'
    })
})

module.exports = router;