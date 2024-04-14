const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicationController = require('../controllers/applicationController');

const upload = multer({ dest: 'uploads/' });

// Define the route within the router
router.post('/api/applications', upload.single('file'), applicationController.handleApplication);

module.exports = router;
