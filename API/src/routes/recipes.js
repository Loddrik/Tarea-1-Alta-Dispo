const express = require('express');
const Recipe = require('../models/Recipe');
var ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models/index')

const recipes = express.Router()

recipes.get('/recipe', async (req, res) => {
    db.connect();

    const recipes = await Recipe.find();
    res.send(recipes);


}
);

recipes.get('/recipe/:id', async (req, res) => {
    db.connect()

    const recipe = await Recipe.findById(new ObjectId(req.params.id));
    res.send(recipe);


}
);
recipes.post('/recipe', async (req, res) => {
    db.connect();

    const recipe = new Recipe(req.body);
    await recipe.save();
    res.send(recipe);


}
);
recipes.put('/recipe/:id', async (req, res) => {
    db.connect();

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.send(recipe);


}
);
recipes.delete('/recipe/:id', async (req, res) => {
    db.connect();

    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.send(recipe);


}
);
module.exports = recipes;