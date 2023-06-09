const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }],

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', UserSchema);