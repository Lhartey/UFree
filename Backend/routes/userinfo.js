const express = require('express')
const User = require('../models/userModels');

const router = express.Router()

//GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

//GET a single users
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single user'})
})

//POST a new users
router.post('/', async (req, res) => {
    const {email, password, userType, firstname, lastname} = req.body
    
    try {
        const user = await User.create({email, password, userType, firstname, lastname})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//DELETE a  users
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a user'})
})

//UPDATE a users
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a user'})
})

module.exports = router