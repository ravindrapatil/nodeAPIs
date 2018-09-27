const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    price: { type: Number },
    currency: { type: String },
    image: { type: String },
    quantity: { type: Number, default: 1 },
    total: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);