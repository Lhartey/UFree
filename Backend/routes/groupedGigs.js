const express = require('express')
const getGroupedGigs = require('../controllers/groupedGigsControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getGroupedGigs)

module.exports = router