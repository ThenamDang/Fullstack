// Menu item model to interact with the database
const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    // Name of the bagel
    name: {
        type: String,
        required: true
    },
    // Price of the bagel
    price: {
        type: Number,
        required: true,
    },
    // Array[String] of the ingredients in bagel (Engish version)
    ingredientsEnglish: {
        type: [String],
        required: false,
    },
    // Array[String] of the ingredients in bagel (Finnish version)
    ingredientsFinnish: {
        type: [String],
        required: false,
    },

})

// Model allows direcet interaction with the database
module.exports = mongoose.model('Menu', menuSchema)