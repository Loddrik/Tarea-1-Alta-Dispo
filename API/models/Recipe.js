const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
        },
        content: String,
    }]
    ,
    description: {
        type: String,
        required: true,
    }
});

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;