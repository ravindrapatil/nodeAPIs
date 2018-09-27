const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middlewear/check-auth');
const Order = require('../models/orders');
const OrdersController = require('../controllers/orders');

router.post('/', OrdersController.addOrder);

module.exports = router;
