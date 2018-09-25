const mongoose = require('mongoose');
//const user = require('../models/users');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    dob: { type: Date },
    address: { type: String },
    avatar: { type: String }
}, {timestamps: true});

module.exports = mongoose.model('Profile', profileSchema);