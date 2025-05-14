const { errorResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    return errorResponse(res, err.message || 'Server Error', err.statusCode || 500);
};

module.exports = errorMiddleware;
