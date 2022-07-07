const express = require('express');
const router = express.Router();
const extractFile = require('../middleware/file');
const ProductController = require('../controllers/products');


router.get('/', ProductController.getProducts);


router.get('/:id', ProductController.getProduct);


router.post('/', extractFile, ProductController.createProduct);


router.put('/:id', extractFile, ProductController.updateProduct);


router.delete('/:id', ProductController.deleteProduct);


router.get('/get/count', ProductController.getProductCount);


module.exports = router;