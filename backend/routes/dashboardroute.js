const router = require('express').Router();
const User = require('../models/user_model');
const Order = require('../models/order_model');
const Book = require('../models/book_model');
const Complaint = require('../models/ComplainPage_model');
const { authenticateToken } = require('./userAuth');

router.get('/admin-dashboard', authenticateToken, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();
        const bookCount = await Book.countDocuments();
        const complaintCount = await Complaint.countDocuments();

        const recentOrders = await Order.find().sort({ createdAt: -1 })
        .limit(5).populate('user').populate('book');
        const recentComments = await Book.find().select('title comments')
        .populate('comments.user').sort({ 'comments.createdAt': -1 }).limit(5);
        const recentRatings = await Book.find().select('title ratings')
        .populate('ratings.user').sort({ 'ratings.createdAt': -1 }).limit(5);

        res.status(200).json({
            userCount,
            orderCount,
            bookCount,
            complaintCount,
            recentOrders,
            recentComments,
            recentRatings
        });
    } catch (error) {
        console.error('Error in /admin-dashboard route:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;