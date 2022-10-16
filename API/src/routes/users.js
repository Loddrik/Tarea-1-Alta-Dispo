const express = require('express');
const db = require('../models/index');
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const { verifySession } = require('../middlewares/verifySession');

const users = express.Router()

users.get('/', async (req, res) => {
    db.connect()
    const users = await User.find();
    res.send(users);
});

users.get('/getById/:id', async (req, res) => {
    db.connect()
        .then(() => {
            User.findById(new ObjectId(req.params.id))
                .then((user) => {
                    if (!user) { res.json({ message: "User not found!" }); }
                    else res.send(user);
                    db.disconnect();
                })
                .catch((err) => {
                    console.log(`[!] Error while getting user ${err}`);
                })
        })
        .catch((err) => {
            console.log(`[!] Error while connecting to DB ${err}`);
        })
});



users.get('/getByEmail/:email', async (req, res) => {
    db.connect()
        .then(() => {
            User.findOne({ email: req.params.email })
                .then((user) => {
                    if (!user) { res.json({ message: "User not found!" }); }
                    else res.send(user);
                    db.disconnect();
                })
                .catch((err) => {
                    console.log(`[!] Error while getting user ${err}`);
                })
        })
        .catch((err) => {
            console.log(`[!] Error while connecting to DB ${err}`);
        })
});


users.post('/register', async (req, res) => {
    await db.connect()
        .then(() => {
            const { name, email, password } = req.body;
            User.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        res.json({ message: "User already exists!", user: user });
                    }
                    else {
                        const newUser = new User({ name: name, email: email, password: password });
                        newUser.save()
                            .then((user) => {
                                res.json({ message: "User created.", user: user });
                                db.disconnect();
                            })
                            .catch((err) => {
                                console.log(`[!] Error while creating user ${err}`);
                            })
                    }
                })
                .catch((err) => {
                    console.log(`[!] Error while getting user ${err}`);
                })
        })
        .catch((err) => {
            console.log(`[!] Error while connecting to DB ${err}`);
        })
});

users.put('/:id', verifySession, async (req, res) => {
    await db.connect()

    const doesntExists = await User.findOne({ id: req.params.id })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body).catch((err) => {
        console.log(`[!] Error while updating user ${err}`);
    });
    await db.disconnect();

    if (updatedUser) return res.json({ message: "User registered." });
    return res.json({ message: "Could not update the user." })
});

users.delete('/:id', verifySession, async (req, res) => {
    db.connect()

    const doesntExists = await User.findOne({ id: req.params.id })
    if (!doesntExists) { return res.json({ message: "User not found!" }); }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) res.json({ message: "User deleted." });
    res.json({ message: "Could not delete the user." })


});

module.exports = users;