const express = require('express')
const getUserGigs = require('../controllers/allgigsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all gig routes
router.use(requireAuth)


router.get('/', getUserGigs)

module.exports = router