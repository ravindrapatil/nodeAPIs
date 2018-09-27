const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middlewear/check-auth');
const Pharma = require('../models/products');
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getAllProducts);

module.exports = router;
