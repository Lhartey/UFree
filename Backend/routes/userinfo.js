const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userControllers')

const router = express.Router()

//GET all users
router.get('/', getUsers)

//GET a single users
router.get('/:id', getUser)

//POST a new users
router.post('/', createUser)

//DELETE a  users
router.delete('/:id', deleteUser)

//UPDATE a users
router.patch('/:id', updateUser)

module.exports = router