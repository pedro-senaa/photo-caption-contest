const express = require('express');
const db = require('../models')
const authRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_for_deving'

// registration endpoint
authRouter.post('/register', async (req, res, next) => {

    const { username, password } = req.body;

    // checks for missing stuff
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required for registration' })
    }

    // creates a new user
    try {
        // hashing password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // adds user info to db
        const newUser = await db.User.create({
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
            return res.status(409).json({ error: 'Username already exists!' })
        }
        // others errors
        console.error(err)
        return res.status(500).json({ message: 'Error creating user', err })
    }

});

// login endpoint
authRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;

    // checks for missing stuff
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required for login' })
    }

    try {
        // gets user in db by username
        const user = await db.User.findOne({ where: { username: username } })
        // handles userNotFound
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // compares password with stored password of user obj
        const matchingPasswords = await bcrypt.compare(password, user.password)
        // handles not matching passowrd
        if (!matchingPasswords) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        // if code is here, we create token then send it
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Login succesful',
            token: token,
            user: { id: user.id, username: user.username }
        })

        // error handling
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error login in', err })
    }


})

// logout route. I guess destroying the token is left to the front-end? 
authRouter.post('/logout', (req, res, next) => {
    res.status(200).json({ message: 'Logout Successful!' })
});

































































module.exports = authRouter;