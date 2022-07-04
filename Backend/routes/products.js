const Product = require('../models/product');
const express = require('express');
const multer = require('multer');
const mongoose = require("mongoose");
const router = express.Router();


const MIME_TYPE_MAP = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg' };


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});


const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(500).send('cannot get product');
    res.status(200).send(product);
})


router.get('/:id',  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(500).send('cannot get product');
    res.status(200).send(product);
})


router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('image not found');
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: imagePath,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })
    product.save().then(() => {
        res.status(200).send(product);
    }).catch(() => {
        res.status(500).send('cannot add product');
    })
})


router.put('/:id', upload.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('invalid product');
    let imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    else {
        imagepath = product.image;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: imagePath,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        },
        { new: true }
    )
    if (!updatedProduct) return res.status(500).send('cannot update product');
    res.status(200).send(updatedProduct);
})


router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) res.status(500).send('cannot delete product');
    res.status(200).send(product);
})


module.exports = router;