const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        return successResponse(res, result, 201);
    } catch (error) {
        return errorResponse(res, error.message, 400);
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        return successResponse(res, result, 200);
    } catch (error) {
        return errorResponse(res, error.message, 401);
    }
};
