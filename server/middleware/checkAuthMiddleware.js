const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS"){
        next()
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (token) {
                req.user = jwt.verify(token, process.env.SECRET_KEY)
                next()
            } else {
                next(ApiError.unauthorized("Не авторизован"))
            }
        } catch (e) {
            next(ApiError.unauthorized("Не авторизован"))
        }
    }
}
