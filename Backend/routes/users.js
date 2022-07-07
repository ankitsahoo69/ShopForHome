const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");


router.get('/', async (req, res) => {
    const user = await User.find();
    if (!user) return res.status(500).send('cannot get user');
    res.status(200).send(user);
})


router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid user id');
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(500).send('cannot get user');
    res.status(200).send(user);
})


router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        admin: req.body.admin,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save();
    if (!user) return res.status(500).send('cannot create user');
    res.send(user);
})


router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        admin: req.body.admin,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    })
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
        return res.status(500).send('email already exists');
    } else {
        user = await user.save();
        if (!user) return res.status(400).send('cannot create user');
        res.send(user);
    }
})


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(500).send('cannot find user');
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({ userId: user.id, admin: user.admin }, 'secret', { expiresIn: '1d' })
        res.status(200).send({ name: user.name, id: user.id, token: token })
    } else {
        res.status(400).send('wrong password');
    }
})


router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid user id');
    }
    const oldUser = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = oldUser.passwordHash;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            admin: req.body.admin,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country
        },
        { new: true }
    )
    if (!user) return res.status(500).send('cannot update user');
    res.status(200).send(user);
})


router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid user id');
    }
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) res.status(500).send('cannot delete user');
    res.status(200).send(user);
})


router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();
    if (!userCount) {
        res.status(500).json({ success: false });
    }
    res.send({ userCount: userCount });
})


module.exports = router;