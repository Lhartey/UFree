const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login user
const loginUser = async (req, res) => {
    const {email, password, userType} = req.body

    try {
        const user = await User.login(email, password, userType)

        // create  a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password, userType} = req.body

    try {
        const user = await User.signup(email, password, userType)

        // create  a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }