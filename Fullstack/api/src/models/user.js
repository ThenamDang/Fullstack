// User model to interact with the database
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // XP: every purchased bagel increments the xp
    xp: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    // For Vigile and workers
    isAdmin: {
        type: Boolean,
        required: false
    },




})

// Model allows direcet interaction with the database
module.exports = mongoose.model('User', userSchema)