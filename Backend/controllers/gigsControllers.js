const Gig = require('../models/gigModels')

// get all gigs
const getGigs = async (req, res) => {
    const gigs = await Gig.find({}).sort({createdAt: -1})

    res.status(200).json(gigs)
}

// get a single gig
const getGig = async (req, res) => {
    const { id } = req.params

    const gig = await Gig.findById(id)

    if (!gig) {
        return res.status(404).json({error: 'No such Gig'})
    }

    res.status(200).json(gig)
}


// create new gig
const createGig = async (req, res) => {
    const {title, description, requirements, budget, employerId, category, deadline, attachments} = req.body

    // add doc to db
try {
    const gig = await Gig.create({title, description, requirements, budget, employerId, category, deadline, attachments})
    res.status(200).json(gig)
} catch (error) {
    res.status(400).json({error: error.message})
}
}

// delete a gig


// update a gig


module.export = {
    getGigs,
    getGig,
    createGig
}