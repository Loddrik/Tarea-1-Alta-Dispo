const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    author_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    comments: [{
        user: {
            type: String,
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