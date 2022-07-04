const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    admin: { type: Boolean, default: false },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
