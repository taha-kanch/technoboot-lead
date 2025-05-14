const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
        },
        source: {
            type: String,
            enum: ['Website', 'Referral', 'Campaign'],
        },
        status: {
            type: String,
            required: true,
            enum: ['New', 'No Feedback', 'In Progress', 'Waiting', 'No Success', 'Order Placed'],
            default: 'New',
        },
        type: {
            type: String,
            enum: ['Sales Person', 'Buyer'],
        },
        subscription: {
            type: String,
            enum: ['Prepaid', 'Premium'],
        },
        leadSourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Lead', leadSchema);