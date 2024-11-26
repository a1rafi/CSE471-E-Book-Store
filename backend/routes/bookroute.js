const router = require('express').Router();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const Book = require('../models/book_model');
const {authenticateToken} = require('./userAuth');


router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if (user.role !== 'admin') {
            return res.status(400).json({message: "Forbidden. Only admin can add books"});
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({message: "Book added successfully"});
    } catch (error) {
        console.error('Error in /add-book route:', error);
        res.status(500).json({message: "Router Error", error: error.message});
    }
});

router.put('/update-book', authenticateToken, async (req, res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        
        return res.status(200).json({message: "Book updated successfully"});
    } catch (error) {
        console.error('Error in /update-book route:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});

router.delete('/delete-book', authenticateToken, async (req, res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        console.error('Error in /delete-book route:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});

router.get('/get-books', async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.status(200).json({status:"Success", data: books});
    } catch (error) {
        console.error('Error in /get-books route:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});

//Get recent books
router.get('/get-recent-books', async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.status(200).json({status:"Success", data: books});
    } catch (error) {
        console.error('Error in /get-recent-books:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});


//Get book by id
router.get('/get-book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({status:"Success", data: book});
    } catch (error) {
        console.error('Error in /get-book by id:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});

module.exports = router;