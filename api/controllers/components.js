const mongoose = require('mongoose');
const PharmaCollection = require('../models/pharma');

exports.getPharmaList = (req, res, next) => {
    var perPage = parseInt(req.params.noItems) || 10;
    let page = req.params.pages || 1;
    PharmaCollection
        .find({})
        .sort({$natural: -1}) 
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(products => {
            PharmaCollection.count()
                .then(count => {
                    res.status(200).json({
                        products: products,
                        count: count,
                        perPage: perPage,
                        pages: Math.ceil(count / perPage)
                    })
                })
                .catch(err => {
                    res.status(401).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.filterTest = (req, res, next) => {
    let searchString = req.params.searchString;
    var perPage = parseInt(req.params.noItems) || 10;
    let page = req.params.pages || 1;
    PharmaCollection.find({company: searchString})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(products => {
            PharmaCollection.count()
                .then(count => {
                    res.status(200).json({
                        products: products,
                        count: products.length,
                        perPage: perPage,
                        pages: Math.ceil(count / perPage)
                    })
                })
                .catch(err => {
                    res.status(401).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.getAllPharmaProducts = (req, res, next) => {
    PharmaCollection.find()
        .sort({$natural: -1}) 
        .then(products => {
            res.status(200).json({
                products: products
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.deletePharmaProducts = (req, res, next) => {
    const id = req.params.prodId;
    PharmaCollection.remove({ _id: id })
        .then(result => {
            res.status(200).json({
                message: "Product removed successfully"
            });
        })
        .catch((err) => {
            error: err
        });
}

exports.updatePharmaProduct = (req, res, next) => {
    const id = req.params.prodId;
    const UpdateOps = {
        company: req.body.company,
        drugname: req.body.drugname,
        genericname: req.body.genericname,
        code: req.body.code,
        description: req.body.description,
        nhsnumber: req.body.nhsnumber
    };
    PharmaCollection.update({ '_id': id }, { $set: UpdateOps })
        .then(result => {
            res.status(200).json({
                message: 'Product updated Successfully',
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

exports.addNewPharmaProduct = (req, res, next) => {
    const product = new PharmaCollection({
        _id: mongoose.Types.ObjectId(),
        company: req.body.company,
        drugname: req.body.drugname,
        genericname: req.body.genericname,
        code: req.body.code,
        description: req.body.description,
        nhsnumber: req.body.nhsnumber
    })
    product.save()
        .then(result => {
            res.status(200).json({
                message: 'New Product added'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err 
            })
        });
}

exports.getPharmaDetails = (req, res, next) => {
    const id = req.params.prodId;
    PharmaCollection.find({ _id: id })
        .then(result => {
            res.status(200).json({
                message: "Pharma details here",
                product: result
            });
        })
        .catch((err) => {
            error: err
        });
}

//Search API
exports.getSearchResults = (req, res, next) => {
    const q = req.query.q;
    PharmaCollection.find({
        company: {
            $regex: new RegExp(q),
            $options : 'i'
        }
        // ,
        // drugname: {
        //     $regex: new RegExp(q),
        //     $options : 'i'
        // }
    }, {
        _id: 0,
        __v: 0
    })
    .then(result => {
        res.status(200).json({
            message: 'Search Result',
            result: result,
            count: result.length 
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err 
        })
    })
}