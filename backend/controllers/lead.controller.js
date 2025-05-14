const leadService = require('../services/lead.service');
const { successResponse, errorResponse } = require('../utils/response');

exports.createLead = async (req, res) => {
    try {
        const lead = await leadService.createLead(req.user, req.body);
        return successResponse(res, lead, 201);
    } catch (error) {
        return errorResponse(res, error.message, 400);
    }
};

exports.getLeads = async (req, res) => {
    try {
        const result = await leadService.getLeads(req.user, req.query);
        return successResponse(res, result);
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

exports.getLeadById = async (req, res) => {
    try {
        const lead = await leadService.getLeadById(req.user, req.params.id);
        return successResponse(res, lead);
    } catch (error) {
        return errorResponse(res, error.message, 404);
    }
};

exports.updateLead = async (req, res) => {
    try {
        const updated = await leadService.updateLead(req.user, req.params.id, req.body);
        return successResponse(res, updated);
    } catch (error) {
        return errorResponse(res, error.message, 400);
    }
};

exports.deleteLead = async (req, res) => {
    try {
        const result = await leadService.deleteLead(req.user, req.params.id);
        return successResponse(res, result);
    } catch (error) {
        return errorResponse(res, error.message, 400);
    }
};
