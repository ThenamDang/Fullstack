const express = require('express');
const { stat } = require('fs');
const router = express.Router()
const User = require('../models/user')

//  Routes for all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Getting one by phone number
router.get('/byPhone/:phoneNumber', async (req, res) => {

    let user;

    try {
        user = await User.findOne({phoneNumber:req.params.phoneNumber});

        // Error with passed user ID
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        // Server side error
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    res.json(res.user)
})

// Creating one
router.post('/', async (req, res) => {
    // new user starts with 0 xp
    console.log("inside post")

    try {

        const user = new User({
            name: req.body.name,
            xp: 0,
            phoneNumber: req.body.phoneNumber,
            email: (req.body.hasOwnProperty("email"))? req.body.email : null,
            isAdmin: false
        })


        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.phoneNumber != null) {
        res.user.phoneNumber = req.body.phoneNumber
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }


    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);

        // Error with passed user ID
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        // Server side error
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router