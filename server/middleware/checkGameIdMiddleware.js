const ApiError = require("../error/ApiError");

const checkGameIdMiddleware = (req, res, next) => {
    const { gameId } = req.body;
    if (!gameId) {
        return next(ApiError.badRequest("gameId не задан"));
    }

    next();
};

module.exports = checkGameIdMiddleware;
