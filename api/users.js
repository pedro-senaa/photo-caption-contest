const express = require('express');
const db = require('../models')
const authRouter = express.Router()
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;


// registration endpoint
authRouter.post('/register', async (req, res, next) => {

    const { username, password } = req.body;

    // checks for missing stuff
    if (!username || !password) {
        return res.status(400).json({ error: 'Username or password required for registration' })
    }

    // creates a new user
    try {
        // hashing password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // adds user info to db
        const newUser = db.User.create({
            username: username,
            password: hashedPassword
        })

        // returns newUser id and username
        res.status(201).json({
            message: 'User registrated!',
            user: {
                id: newUser.id,
                username: newUser.username
            }
        })


        // catches errors
    } catch (err) {
        // no username duplicates!!
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({error: 'Username already exists!'})
        }
        // others
        console.error(err)
        return res.status(500).json({message: 'Error creating user', err})
    }

});






































module.exports = authRouter;