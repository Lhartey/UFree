const express = require('express')
const {
    getGigs,
    getUserGigs,
    getGig,
    createGig, 
    deleteGig, 
    updateGig,
} = require('../controllers/gigsControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all gig routes
router.use(requireAuth)

//GET all gigs
router.get('/', getGigs)

// Get gigs uploaded by a specific user
router.get('/', getUserGigs)

//GET a single gigs
router.get('/:id', getGig)

//POST a new gigs
router.post('/', createGig)

//DELETE a  gigs
router.delete('/:id', deleteGig)

//UPDATE a gigs
router.patch('/:id', updateGig)

module.exports = router