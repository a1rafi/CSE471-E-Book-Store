const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');

const userRoute = require('./routes/userroute');
const bookRoute = require('./routes/bookroute');
const favouriteRoute = require('./routes/favouriteroute');
const cartRoute = require('./routes/cartroute');
const orderRoute = require('./routes/orderroute');
const dashboardRoute = require('./routes/dashboardroute');

// const commentsRoutes = require('./routes/commentsRoutes');



require('./conn/conn');

const app = express();

app.use(express.json());
app.use(cors());

//didn't call port through .env file for simplicity
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello from Backend');
});

app.use('/api/user', userRoute, bookRoute);
app.use('/api/user', userRoute, favouriteRoute);
app.use('/api/user', userRoute, cartRoute);
app.use('/api/user', userRoute, orderRoute);
app.use('/api/dashboard', dashboardRoute);

// app.use('/api/user', userRoute, commentsRoutes);