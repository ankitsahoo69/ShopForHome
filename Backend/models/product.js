const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, max: 200 }
})


const Product = mongoose.model('Product', productSchema);


module.exports = Product;
