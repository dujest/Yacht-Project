const { CustomAPIError } = require('./custom-error')
const { ValidationError } = require('yup')

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    if (err instanceof ValidationError) {
        return res.status(404).json({ msg: err.errors })
    }
    return res.status(500).json({ msg: 'Something went wrong, try again!' })
}

module.exports = errorHandlerMiddleware