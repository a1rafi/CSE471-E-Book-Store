const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user_model');
const Complaint = require('../models/ComplainPage_model');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be atleast 4 characters long" });
        }

        const existingUsername = await User.findOne({username: username});
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({email: email});
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length <= 4) {
            return res.status(400).json({ message: "Password must be atleast 4 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            address: address
        });
        await newUser.save();
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error in /sign-up route:', error); 
        res.status(500).json({ message: "Router Error", error: error.message }); 
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({username});
        if (!existingUser) {
            return res.status(400).json({ message: "Ivalid Credentials" });
        }
        await bcrypt.compare(password, existingUser.password, (err, result) => {
            if (result) {
                const authClaims = {
                    username: existingUser.username,
                    email: existingUser.email,
                    address: existingUser.address,
                    role: existingUser.role
                };

                const token = jwt.sign({authClaims}, process.env.JWT_SECRET,{expiresIn: '1d'});
                return res.status(200).json({ id: existingUser._id, role:existingUser.role, token: token });
            } else {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        });
    } catch (error) {
        console.error('Error in /sign-in route:', error);
        res.status(500).json({ message: "   Internak server error", error: error.message });
    }
});

router.get('/get-user',authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in /get-users route:', error); 
        res.status(500).json({ message: "Internal server error", error: error.message }); 
    }
});

router.put('/update-user', authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error('Error in /update-user route:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.post('/complain', authenticateToken, async (req, res) => {
    try {
      const { userId, type, description } = req.body;
  
      if (!userId || !type || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newComplaint = new Complaint({
        userId,
        complaintType: type,
        complaintText: description,
      });
  
      await newComplaint.save();
      return res.status(200).json({ message: "Complaint submitted successfully" });
    } catch (error) {
      console.error('Error in /complain route:', error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });


router.get('/complaints', authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const complaints = await Complaint.find().populate('userId', 'username email');
      return res.status(200).json({ status: "Success", data: complaints });
    } catch (error) {
      console.error('Error in /complaints route:', error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

module.exports = router;