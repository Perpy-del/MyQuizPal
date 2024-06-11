const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const tokenSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    password_token: {
        type: String,
        required: true
    },
    expiry_time: {
        type: Date,
    },
    token_expired: {
        type: Boolean,
        default: false,
    },
    is_used: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Token = model('Token', tokenSchema);

module.exports = Token;