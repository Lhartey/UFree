const express = require('express')
const {
    getGigs,
    getGig,
    createGig, 
    deleteGig, 
    updateGig
} = require('../controllers/gigsControllers')

const router = express.Router()

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