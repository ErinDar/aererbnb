const { validationResult } = require('express-validator')
const { param } = require('../routes')

const handleValidationErrors = ((req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        let errors = {}

        const param = validationErrors
            .array()
            .map((error) => {
                return `${error.param}`
            })

        const messages = validationErrors
            .array()
            .map((error) => {
                return `${error.msg}`
            })

        for (let i = 0; i < param.length; i++) {
            errors[param[i]] = messages[i]
        }

        return res.status(400).json({
            message: 'Validation error',
            statusCode: 400,
            errors: errors
        })
    }
    next()
})






module.exports = {
    handleValidationErrors
}