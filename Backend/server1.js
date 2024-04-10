require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const gigsRoutes = require('./routes/gig')
const userRoutes = require('./routes/userinfo')
// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next ) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/gigs', gigsRoutes)
app.use('/api/user', userRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listening
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })

