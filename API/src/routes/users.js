const express = require('express');
const db = require('../models/index');
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const users = express.Router()

users.get('/user', async (req, res) => {
    db.connect()

    const users = await User.find();
    res.send(users);


});

users.get('/user/:id', async (req, res) => {
    db.connect()

    const user = await User.findById(new ObjectId(req.params.id));
    res.send(user);


});

users.post('/user', async (req, res) => {
    db.connect()

    const user = new User(req.body);
    await user.save();

    res.send(user);


});

users.put('/user/:id', async (req, res) => {
    db.connect()

    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);


});

users.delete('/user/:id', async (req, res) => {
    db.connect()

    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);


});

module.exports = users;