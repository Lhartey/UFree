require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const gigsRoutes = require('./routes/gig')
const allgigsRoutes = require('./routes/allgigs')
const userRoutes = require('./routes/user')
const applicationRoutes = require('./routes/applicationRoutes');
const groupedGigsRoutes = require('./routes/groupedGigs')
const messageRoutes = require('./routes/messageRoutes');
// Express App
const app = express()

// Middleware
app.use(cors());
app.use(express.json())

app.use((req, res, next ) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/gigs', gigsRoutes)
app.use('/api/allgigs', allgigsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/grouped-gigs', groupedGigsRoutes)
app.use('/', applicationRoutes);
app.use('/api', messageRoutes);


//connect to database
mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        //Listening
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })

