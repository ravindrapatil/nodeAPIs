const mongoose = require('mongoose');

const pharmaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company: { type: String, required: true },
    drugname: { type: String, required: true },
    genericname: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    nhsnumber: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Pharma', pharmaSchema);