const express = require('express');
const passport = require('passport');

const Recipe = require('../models/Recipe');
var ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models')

const { verifySession } = require('../middlewares/verifySession');

const recipes = express.Router()

recipes.get('/', async (req, res) => {
    await db.connect();

    const recipes = await Recipe.find();
    res.send(recipes);

    db.disconnect();
});

recipes.get('/recipe/:id', async (req, res) => {
    db.connect()
    const recipe = await Recipe.findById(new ObjectId(req.params.id));
    db.disconnect();

    if (!recipe) { return res.json({ message: "Recipe not found!" }); }
    return res.send(recipe);
});

recipes.post('/', verifySession, async (req, res) => {
    db.connect()
        .then(() => {
            const recipe = new Recipe(req.body);
            recipe.save()
                .then((recipe) => {
                    db.disconnect();
                    res.json({ message: "Recipe created.", recipe: recipe });
                })
                .catch((err) => {
                    console.log(`[!] Error while creating recipe ${err}`);
                })
        })
        .catch((err) => {
            console.log(`[!] Error while connecting to DB ${err}`);
        })
});


recipes.put('/recipe/:id', verifySession, async (req, res) => {
    await db.connect();

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.send(recipe);

    db.disconnect();
}
);

recipes.delete('/:id', verifySession, async (req, res) => {
    db.connect()
        .then(() => {
            Recipe.findByIdAndDelete(req.params.id)
                .then((recipe) => {
                    db.disconnect();
                    res.json({ message: "Recipe deleted.", recipe: recipe });
                })
                .catch((err) => {
                    console.log(`[!] Error while deleting recipe ${err}`);
                })
        })
        .catch((err) => {
            console.log(`[!] Error while connecting to DB ${err}`);
        })
});


module.exports = recipes;