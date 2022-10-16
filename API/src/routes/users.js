const express = require('express');
const db = require('../models/index');
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const users = express.Router()

users.get('/', async (req, res) => {
    db.connect()
    const users = await User.find();
    res.send(users);
});

users.get('/getById/:id', async (req, res) => {
    db.connect()

    const doesntExists = await User.findOne({ id: req.params.id })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const user = await User.findById(new ObjectId(req.params.id));
    res.send(user);
});

users.get('/getByEmail/:email', async (req, res) => {
    db.connect()

    const doesntExists = await User.findOne({ email: req.params.email })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const user = await User.find({ email: req.params.email })
    res.send(user);


});

users.post('/register', async (req, res) => {
    await db.connect()
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const alreadyExists = await User.findOne({ email: email })
    if (alreadyExists) { return res.json({ message: "User with email already exists!", user: alreadyExists }); }

    const user = new User({ name, email, password });
    const savedUser = await user.save().catch((err) => {
        console.log(`Error registering user ${err}`);
    });
    console.log(savedUser);
    if (savedUser) return res.json({ message: "User registered." });
    return res.json({ message: "Could not register the user." })


});

users.put('/:id', async (req, res) => {
    db.connect()

    const doesntExists = await User.findOne({ id: req.params.id })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body).catch((err) => {
        console.log(`[!] Error while updating user ${err}`);
    });

    if (updatedUser) return res.json({ message: "User registered." });
    return res.json({ message: "Could not update the user." })


});

users.delete('/:id', async (req, res) => {
    db.connect()

    const doesntExists = await User.findOne({ id: req.params.id })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) res.json({ message: "User deleted." });
    res.json({ message: "Could not delete the user." })


});

module.exports = users;