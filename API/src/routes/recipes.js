const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('../models/Recipe');
var ObjectId = require('mongoose').Types.ObjectId;

const recipes = express.Router()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?maxPoolSize=20&w=majority`;

recipes.get('/recipe', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const recipes = await Recipe.find();
    res.send(recipes);
    await mongoose.disconnect();
}
);

recipes.get('/recipe/:id', async (req, res) => {
    console.log("aaa")
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // console.log(req);
    console.log(req.params.id);
    const recipe = await Recipe.findById(new ObjectId(req.params.id));
    console.log(recipe)
    res.send(recipe);
    await mongoose.disconnect();
}
);
recipes.post('/recipe', async (req, res) => {
    console.log(req);
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.send(recipe);
    await mongoose.disconnect();
}
);
recipes.put('/recipe/:id', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.send(recipe);
    await mongoose.disconnect();
}
);
recipes.delete('/recipe/:id', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.send(recipe);
    await mongoose.disconnect();
}
);
module.exports = recipes;