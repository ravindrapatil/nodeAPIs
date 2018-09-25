const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(200).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status('500').json({
                                    error: err
                                });
                            })
                    }
                });
            }
        });
}

exports.loginUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .then((user) => { // This 'user' is an array returned from the database
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        'secret',
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: "Auth Successfull",
                        token: token,
                        userInfo: user
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status('500').json({
                error: err
            });
        })
}

exports.deleteOneUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .then(result => {
            res.status(200).json({
                message: "User deleted successfully"
            });
        })
        .catch((err) => {
            error: err
        });
}

exports.getOneUser = (req, res, next) => {
    const id = req.params.userId;
    User.findById({ _id: id })
        .then(result => {
            res.status(200).json({
                individualUser: result
            });
        })
        .catch((err) => {
            error: err
        });
}

exports.getAllUsers = (req, res, next) => {
    console.log('Yes entred');
    User.find()
        .then((result) => {
            console.log('Yes entred 2');
            res.status(200).json({
                users: result
            });
        })
        .catch((err) => {
            res.status('401').json({
                error: err
            });
        });
}