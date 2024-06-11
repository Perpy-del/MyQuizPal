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
    token_expired: {
        type: Boolean,
    }
}, {timestamps: true})

const Token = model('Token', tokenSchema);

module.exports = Token;