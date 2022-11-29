const { CustomAPIError } = require('./custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Smt went wrong, try again!' })
}

module.exports = errorHandlerMiddleware
