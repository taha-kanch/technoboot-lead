const { default: mongoose } = require('mongoose');
const Lead = require('../models/lead.model');

exports.createLead = async (userId, leadData) => {
    const lead = new Lead({ ...leadData, leadSourceId: userId });
    return await lead.save();
};

exports.getLeads = async (userId, query) => {
    const {
        page = 1,
        limit = 10,
        search,
        fromDate,
        toDate,
        status,
        subscription,
        type,
    } = query;

    const filter = { leadSourceId: userId };

    // Search logic
    if (search) {
        const searchRegex = new RegExp(search, 'i');

        const orConditions = [
            { name: searchRegex },
            { email: searchRegex },
            { phone: searchRegex },
            { companyName: searchRegex },
        ];

        // Only add ID match if it's a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(search)) {
            orConditions.push({ _id: search });
        }

        filter.$or = orConditions;
    }


    if ((fromDate && !toDate) || (!fromDate && toDate)) {
        throw new Error("Both fromDate and toDate are required together.");
    }

    if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);

        if (isNaN(from) || isNaN(to)) {
            throw new Error("Invalid date format. Use YYYY-MM-DD.");
        }

        if (to < from) {
            throw new Error("toDate cannot be earlier than fromDate.");
        }

        filter.createdAt = {
            $gte: new Date(fromDate + 'T00:00:00Z'),
            $lte: new Date(toDate + 'T23:59:59Z'),
        };
    }



    if (status) filter.status = status;
    if (subscription) filter.subscription = subscription;
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const leads = await Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Lead.countDocuments(filter);

    return {
        data: leads,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
    };
};


exports.getLeadById = async (userId, id) => {
    const lead = await Lead.findOne({ _id: id, leadSourceId: userId });
    if (!lead) throw new Error('Lead not found');
    return lead;
};

exports.updateLead = async (userId, id, updateData) => {
    const lead = await Lead.findOneAndUpdate(
        { _id: id, leadSourceId: userId },
        updateData,
        { new: true }
    );
    if (!lead) throw new Error('Lead not found or unauthorized');
    return lead;
};

exports.deleteLead = async (userId, id) => {
    const result = await Lead.findOneAndDelete({ _id: id, leadSourceId: userId });
    if (!result) throw new Error('Lead not found or unauthorized');
    return result;
};
