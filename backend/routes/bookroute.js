const router = require('express').Router();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const Book = require('../models/book_model');
const {authenticateToken} = require('./userAuth');



// Add a comment to a book
router.post('/add-comment', authenticateToken, async (req, res) => {
    try {
        const { bookId, text } = req.body;
        const { id } = req.headers;
        const user = await User.findById(id);
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const comment = {
            user: user._id,
            text: text,
        };
    

        book.comments.push(comment);
        await book.save();

        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error('Error in /add-comment route:', error);
        res.status(500).json({ message: "Router Error", error: error.message });
    }
});


// Fetch comments for a book
router.get('/get-comments/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId).populate('comments.user', 'username');

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ status: "Success", data: book.comments });
    } catch (error) {
        console.error('Error in /get-comments route:', error);
        res.status(500).json({ message: "Router Error", error: error.message });
    }
});

// Add a rating to a book
router.post('/add-rating', authenticateToken, async (req, res) => {
    try {
        const { bookId, rating } = req.body;
        const { id } = req.headers;
        const user = await User.findById(id);
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const newRating = {
            user: user._id,
            rating: rating,
        };

        book.ratings.push(newRating);
        await book.save();

        res.status(200).json({ message: "Rating added successfully" });
    } catch (error) {
        console.error('Error in /add-rating route:', error);
        res.status(500).json({ message: "Router Error", error: error.message });
    }
});

// Fetch ratings for a book
router.get('/get-ratings/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId).populate('ratings.user', 'username');

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ status: "Success", data: book.ratings });
    } catch (error) {
        console.error('Error in /get-ratings route:', error);
        res.status(500).json({ message: "Router Error", error: error.message });
    }
});

//admin
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
        const averageRating = book.calculateAverageRating();

        return res.status(200).json({status:"Success", data: book,averageRating});
    } catch (error) {
        console.error('Error in /get-book by id:', error);
        res.status(500).json({message: "An Error Occured", error: error.message});
    }
});

// // Fetch book details
// router.get('/get-book/:bookId', async (req, res) => {
//     try {
//         const { bookId } = req.params;
//         const book = await Book.findById(bookId).populate('comments.user', 'username').populate('ratings.user', 'username');

//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         const averageRating = book.calculateAverageRating();

//         res.status(200).json({ status: "Success", data: book, averageRating });
//     } catch (error) {
//         console.error('Error in /get-book route:', error);
//         res.status(500).json({ message: "Router Error", error: error.message });
//     }
// });

//search

router.get("/search", async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm || "";
      const language =
        req.query.language && req.query.language !== "all"
          ? req.query.language
          : { $in: ["Bangla", "English"] };
      const genre = req.query.genre || { $in: ["Fiction", "Non-Fiction"] };
      const limit = parseInt(req.query.limit) || 9;
      const start = parseInt(req.query.start) || 0;
  
      const sanitizedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(sanitizedTerm, "i");
  
      const books = await Book.find({
        $or: [{ title: regex }, { author: regex }],
        language: language,
        genre: genre,
      })
        .skip(start)
        .limit(limit);
  
      const totalBookCount = await Book.countDocuments({
        $or: [{ title: regex }, { author: regex }],
        language: language,
      });
  
      res.status(200).json({
        status: "Success",
        data: books,
        total: totalBookCount,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  });
  

module.exports = router;