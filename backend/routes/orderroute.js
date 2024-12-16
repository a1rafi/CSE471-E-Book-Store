const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book_model");
const Order = require("../models/order_model");
const User = require("../models/user_model");
const sendEmail = require('../services/emailService');

router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order, paymentMethod, customerDetails } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id,
                paymentMethod,
                customerDetails
            });
            const orderDataFromDb = await newOrder.save();
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({ status: "Success", message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

router.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
        console.log(userData);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: "book", }).populate({ path: "user", }).sort({ createdAt: -1 });
        return res.json({ status: "Success", data: userData, });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('user');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Send email notification
        const userEmail = order.user.email;
        const subject = `Your order in BookHeaven is ${status}`;
        let text = '';
        if (status === 'out for delivery') {
            text = `Dear ${order.user.username},\n\nYour order is now out for delivery, now on the way.\n\nThank you for shopping with us!\n\nBest regards,\nBookHeaven Team`;
        } else if (status === 'delivered') {
            text = `Dear ${order.user.username},\n\nYour order has been successfully delivered.\n\nThank you for shopping with us!\n\nBest regards,\nBookHeaven Team`;
        } else if (status === 'cancelled') {
            text = `Dear ${order.user.username},\n\nWe are sorry to let you know that your order has been cancelled.\n\nBest regards,\nBookHeaven Team`;
        } else {
            text = `Dear ${order.user.username},\n\nYour order status has been updated to ${status}.\n\nThank you for shopping with us!\n\nBest regards,\nBookHeaven Team`;
        }



        sendEmail(userEmail, subject, text);

        return res.json({ status: "Success", message: "Status Updated Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

module.exports = router;