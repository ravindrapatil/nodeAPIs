const mongoose = require('mongoose');
const ProductsCollection = require('../models/products');

exports.getAllProducts = (req, res, next) => {
    ProductsCollection.find()
        .then(products => {
            res.status(200).json({
                message: 'Got all products',
                status: 200,
                products: products
            })
        })
        .catch(err => {
            res.status(500).json({
                errot: err
            })
        })
}