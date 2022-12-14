
const express = require('express');
const jwt = require('jsonwebtoken')

const db = require('../models');
const User = require('../models/User');

const login = express.Router()

login.post("/", async (req, res) => {
    await db.connect();

    const { email, password } = req.body;
    const userWithEmail = await User.findOne({ email:  email }).catch( (err) => {
        console.log(`[!] Error: ${err}`);
    });

    if (!userWithEmail) return res.status(401).json({ message: "Email or pass does not match!", user: userWithEmail});
    if (userWithEmail.password !== password) return res.status(401).json({ message: "Email or pass does not match!", user: userWithEmail});

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.SECRET );
    res.json({ message: "Logged In Successfully!", "user": userWithEmail, "jwt": jwtToken });

    db.disconnect();
});


module.exports = login;