const express = require('express')
const Gig = require('../models/gigModels')

const router = express.Router()

//GET all gigs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all gigs'})
})

//GET a single gigs
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single gig'})
})

//POST a new gigs
router.post('/', async (req, res) => {
    const {title, description, requirements, budget, employerId, category, deadline, attachments} = req.body
try {
    const gig = await Gig.create({title, description, requirements, budget, employerId, category, deadline, attachments})
    res.status(200).json(gig)
} catch (error) {
    res.status(400).json({error: error.message})
}
})

//DELETE a  gigs
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a gig'})
})

//UPDATE a gigs
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a gig'})
})

module.exports = router