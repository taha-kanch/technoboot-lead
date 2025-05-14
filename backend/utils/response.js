exports.successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        statusCode,
        data,
    });
};

exports.errorResponse = (res, errorMessage, statusCode = 500) => {
    return res.status(statusCode).json({
        statusCode,
        errorMessage,
    });
};
