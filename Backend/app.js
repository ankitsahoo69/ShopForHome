const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect('mongodb://localhost:27017/homeshop');

app.listen(port);
