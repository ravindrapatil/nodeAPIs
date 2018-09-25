const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserRoutes = require('./api/routes/users');
const ProfileRoutes = require('./api/routes/profile');
const ComponentsRoutes = require('./api/routes/components');

// mongoose.connect('mongodb+srv://ravindra:ravindra@cluster0-z3qmt.mongodb.net/test?retryWrites=true', (err) => {
    mongoose.connect('mongodb+srv://ravindra:ravindra@cluster0-z3qmt.mongodb.net/test?retryWrites=true', (err) => { 
    if(!err) 
        console.log('MongoDB connection succeeded.');
     else 
        console.log('Error in DB connection ' + JSON.stringify(err, undefined, 2));
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Routes which should handle requests
app.use('/user', UserRoutes);
app.use('/profile', ProfileRoutes);
app.use('/basicAPI', ComponentsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;