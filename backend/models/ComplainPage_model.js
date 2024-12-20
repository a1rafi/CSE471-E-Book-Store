const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    complaintType: {
        type: String,
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
