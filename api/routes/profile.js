const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewear/check-auth');
const multer = require('multer');
const profileController = require('../controllers/profile');

const Pharma = require('../models/pharma');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer (
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB only
        },
        fileFilter: fileFilter
    }
);

router.post('/:userId', upload.single('avatar'), profileController.createUserProfile);
router.get('/:userId', profileController.getSingleProfile);
router.patch('/:userId', profileController.updateSingleProfile);

router.get('/pharma/:pages/:noItems', (req, res, next) => {
    var perPage = parseInt(req.params.noItems) || 10;
    let page = req.params.pages || 1;
    Pharma
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(products => {
            Pharma.count()
                .then(count => {
                    res.status(200).json({
                        products: products,
                        count: count,
                        perPage: perPage,
                        pages: Math.ceil(count / perPage)  
                    })
                })
                .catch(err => {
                    console.log("hiiii" + err);
                })
        })
        .catch(err => {
            console.log(err);
        })

});

module.exports = router;
