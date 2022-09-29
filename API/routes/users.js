const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const users = express.Router()

const uri =
    "mongodb://localhost:27017/ReseñaCocina?maxPoolSize=20&w=majority";

users.get('/user', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const users = await User.find();
    res.send(users);
    await mongoose.disconnect();
}
);

users.get('/user/:id', async (req, res) => {
    console.log("aaa")
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // console.log(req);
    console.log(req.params.id);
    const user = await User.findById(new ObjectId(req.params.id));
    console.log(user)
    res.send(user);
    await mongoose.disconnect();
}
);
users.post('/user', async (req, res) => {
    console.log(req.body);
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const user = new User(req.body);
    await user.save();
    res.send(user);
    await mongoose.disconnect();
}
);
users.put('/user/:id', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
    await mongoose.disconnect();
}
);
users.delete('/user/:id', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
    await mongoose.disconnect();
}
);

module.exports = users;
