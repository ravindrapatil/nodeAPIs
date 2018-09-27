const mongoose = require('mongoose');
const OrderCollection = require('../models/orders');

exports.addOrder = (req, res, next) => {
    const order = new OrderCollection({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        image: req.body.image,
        quantity: req.body.quantity,
        total: req.body.total
    })
    order.save()
        .then(result => {
            res.status(200).json({
                message: 'Order Placed Successfully',
                status: 200
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err 
            })
        });
    
}