const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./controllers/user_attendance');
const requestDataRouter = require('./controllers/requestform');
const mailRouter = require('./controllers/mail');
const loginRouter = require('./controllers/login');
const verifyToken = require('./controllers/middleware');
const path = require('path');

mongoose.set('strictQuery');

app.use(express.static('dist'));

const url =
    process.env.NODE_ENV === 'development'
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_PROD;

mongoose
    .connect(url)
    .then(() => console.log('connected to MongoDB', url))
    .catch(() => console.error('failed to connect to MongoDB'));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/users_attendance', userRouter);
app.use('/api/request', requestDataRouter);
app.use('/api/mail', mailRouter);
app.use('/api/login', loginRouter);
// catch all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
