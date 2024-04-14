const express = require('express')
const {
    getGigs,
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


//GET a single gigs
router.get('/:id', getGig)

//POST a new gigs
router.post('/', createGig)

//DELETE a  gigs
router.delete('/:id', deleteGig)

//UPDATE a gigs
router.patch('/:id', updateGig)

module.exports = router