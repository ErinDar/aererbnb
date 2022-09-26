const express = require('express')
const { check } = require('express-validator')
const { setTokenCookie, restoreUser, handleValidationErrors } = require('../../utils/auth')
const { User } = require('../../db/models')
const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({
            checkFalsy: true
        })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({
            checkFalsy: true
        })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.post('/', async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.login({
        credential, password
    });

    if (!user) {
        const err = new Error('Login failed')
        err.status = 401
        err.title = 'Login failed'
        err.errors = ['The provided credentials were invalid']
        return next(err)
    } else {
        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
})

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: 'success'
    })
})

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

router.post('/', async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.login({
        credential,
        password
    })

    if (!user) {
        const err = new Error('Login failed')
        err.status = 401
        err.title = 'Login failed'
        err.errors = ['The provided credentials were invalid']
        return next(err)
    }

    await setTokenCookie(res, user)

    return res.json({
        user
    }, validateLogin)
})

module.exports = router;