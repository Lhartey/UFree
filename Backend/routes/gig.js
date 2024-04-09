const express = require('express')
const {
    getGigs,
    getGig,
    createGig
} = require('../controllers/gigsControllers')

const router = express.Router()

//GET all gigs
router.get('/', getGigs)

//GET a single gigs
router.get('/:id', getGig)

//POST a new gigs
router.post('/', createGig)

//DELETE a  gigs
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a gig'})
})

//UPDATE a gigs
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a gig'})
})

module.exports = router