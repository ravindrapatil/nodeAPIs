const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middlewear/check-auth');
const Pharma = require('../models/pharma');
const ComponentController = require('../controllers/components');

router.get('/pharma/:pages/:noItems', ComponentController.getPharmaList);
router.get('/filter/:searchString/:pages/:noItems', ComponentController.filterTest);
router.get('/pharmaproducts', ComponentController.getAllPharmaProducts);
router.delete('/deletePharmaProduct/:prodId', ComponentController.deletePharmaProducts);
router.patch('/updatePharmaProduct/:prodId', ComponentController.updatePharmaProduct);
router.post('/addNewPharmaProduct', ComponentController.addNewPharmaProduct);
router.get('/getPharmaDetails/:prodId', ComponentController.getPharmaDetails);
router.get('/searchPharma', ComponentController.getSearchResults);





module.exports = router;
