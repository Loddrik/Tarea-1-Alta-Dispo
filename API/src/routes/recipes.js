const express = require('express');
// const passport = require('passport');

const Recipe = require('../models/Recipe');
var ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models')

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
    return res.send(recipe);


}
);
recipes.post('/', async (req, res) => {
    db.connect();
    console.log(req.body)
    const recipe = new Recipe(req.body);
    await recipe.save();
    return res.send(recipe);


}
);
// recipes.put('/recipe/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
//     await db.connect();

//     const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
//     res.send(recipe);

//     db.disconnect();
// }
// );
recipes.delete('/:id', async (req, res) => {
    db.connect();

    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.send(recipe);


}
);
module.exports = recipes;