const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        {
            data: user.toSafeObject()
        },
        secret,
        {
            expiresIn: parseInt(expiresIn)
        }
    )

    const isProduction = process.env.NODE_ENV === "production"

    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token
};

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next()
        }
        try {
            const { id } = jwtPayload.data
            req.user = await User.scope('currentUser').findByPk(id)
        }
        catch (e) {
            res.clearCookie('token')
            return next()
        }
        if (!req.user) {
            res.clearCookie('token');
        }
        return next()
    })
}

const requireAuth = (req, res, next) => {
    if (req.user) {
        return next()
    } else {
        res.status(401)
        return res.json({
            message: "Authentication required: Please Log in or Sign Up",
            statusCode: 401
        })
    }
}

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth
};