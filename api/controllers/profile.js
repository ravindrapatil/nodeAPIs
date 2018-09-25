const mongoose = require('mongoose');
const User = require('../models/users');
const Profile = require('../models/profile');

exports.createUserProfile = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const profile = new Profile({
                _id: mongoose.Types.ObjectId(),
                user: req.params.userId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                dob: req.body.dob,
                address: req.body.address,
                avatar: req.file.path
            });
            return profile.save();
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Profile Created'
            });
        })
        .catch((error) => {
            console.log(error);
            res.status('500').json({
                error: error
            });
        })
}

exports.getSingleProfile = (req, res, next) => {
    Profile.find({ user: req.params.userId})
        .populate('user')
        .then((result) => {
            console.log(result);
            res.status(201).json({
                profiles: result.map(doc => {
                    return {
                        _id: doc._id,
                        user: doc.user,
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        phone: doc.phone,
                        dob: doc.dob,
                        address: doc.address,
                        avatar: doc.avatar
                    }
                })
            });
        })
        .catch((error) => {
            res.status('500').json({
                error: error
            });
        })
}

exports.updateSingleProfile = (req, res, next) => {
    const UpdateOps = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address
    };
    Profile.update({ 'user': req.params.userId }, { $set: UpdateOps })
        .then(result => {
            res.status(200).json({
                message: 'Profile Updated',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err 
            });
        })
}