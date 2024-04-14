const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// Controllers
const { signupUser, loginUser, userProfile} = require('../controllers/userController')

const router = express.Router()


//Login route
router.post('/login', loginUser)

//Signup route
router.post('/signup', signupUser);

// user Profile route
router.put('/:id', requireAuth, userProfile);


module.exports = router 