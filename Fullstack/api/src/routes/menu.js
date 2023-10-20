const express = require('express')
const router = express.Router()
const Menu = require('../models/menu')

//  Routes for all Menu items
router.get('/', async (req, res) => {
    try {
        const menu = await Menu.find()
        res.json(menu)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one
router.get('/:id', getMenuItem, (req, res) => {
    res.json(res.menuItem)
})

// Creating one
router.post('/', async (req, res) => {

    const menuItem = new Menu({
        name: req.body.name,
        price: req.body.price,
        ingredientsEnglish: (req.body.hasOwnProperty("ingredientsEnglish"))? req.body.ingredientsEnglish : [],
        ingredientsFinnish: (req.body.hasOwnProperty("ingredientsFinnish"))? req.body.ingredientsFinnish : [],

    })

    try {
        const newMenuItem = await menuItem.save()
        res.status(201).json(newMenuItem)
    } catch(err) {
        res.status(400).json( { message: err.message } )
    }

})

// Updating one
router.patch('/:id', getMenuItem, async (req, res) => {
    if (req.body.name != null) {
        res.menuItem.name = req.body.name
    }
    if (req.body.price != null) {
        res.menuItem.price = req.body.price
    }

    try {
        const updatedMenuItem = await res.menuItem.save()
        res.json(updatedMenuItem)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getMenuItem, async(req, res) => {
    try {
        await res.menuItem.remove()
        res.json({ message: 'Deleted menu item'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware
async function getMenuItem(req, res, next) {
    let menuItem
    try {
        menuItem = await Menu.findById(req.params.id)

        // Error with passed menu ID
        if (menuItem == null) {
            return res.status(404).json({ message: 'Cannot find menu item' })
        }
    } catch (err) {
        // Server side error
        return res.status(500).json({ message: err.message })
    }

    res.menuItem = menuItem
    next()
}

module.exports = router