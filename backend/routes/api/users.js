const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    const emailUsed = await User.findOne({
        where: {
            email: email
        }
    })

    const usernameUsed = await User.findOne({
        where: {
            username: username
        }
    })

    if (emailUsed || usernameUsed) {
        let error = {}
        if (emailUsed) {
            error.email = "User with that email already exists"
        } else {
            error.username = "User with that username already exists"
        }
        res.status(403).json({
            message: "User already exists",
            statusCode: 403,
            errors: error
        })
    }

    const user = await User.signup({
        firstName,
        lastName,
        email,
        username,
        password
    })

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token

    return res.json(user)
})





module.exports = router;