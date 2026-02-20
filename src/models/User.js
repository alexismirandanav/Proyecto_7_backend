const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
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
            required: true,
            minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
        },
        cart: {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
            default: []
        },
        country: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        zipcode: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;