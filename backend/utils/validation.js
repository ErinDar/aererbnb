const { validationResult } = require('express-validator')
const { param } = require('../routes')

const handleValidationErrors = ((req, res, next) => {
    const validationErrors = validationResult(req)
    console.log('before array', validationErrors)
    console.log('after array', validationErrors.array())
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
        console.log('errors object', errors)
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