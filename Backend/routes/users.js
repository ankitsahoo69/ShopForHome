const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const user = await User.find();
    if (!user) return res.status(500).send('cannot get user');
    res.status(200).send(user);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(500).send('cannot get user');
    res.status(200).send(user);
})


router.post('/register', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country
    })
    user.save().then(() => {
        res.status(200).send(user);
    }).catch(() => {
        res.status(500).send('cannot create user');
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(500).send('cannot find user');

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' })
        res.status(200).send({ token: token })
    } else {
        res.status(400).send('wrong password');
    }
})

router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country
        },
    )
    if (!user) return res.status(500).send('cannot update user');
    res.status(200).send(user);
})

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) res.status(500).send('cannot delete user');
    res.status(200).send(user);
})

module.exports = router;