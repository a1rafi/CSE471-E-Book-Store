const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    complaintType: {
        type: String,
        enum: ['Recommendation of book', 'Book quality issue', 'Service issue', 'Others'],
        required: true,
    },
    complaintText: {
        type: String,
        maxlength: 500,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
