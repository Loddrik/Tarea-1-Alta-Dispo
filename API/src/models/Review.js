const { Schema, SchemaTypes, model } = require("mongoose");

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: SchemaTypes.ObjectId,
        ref: 'Recipe',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
});

const Review = model('Review', reviewSchema);
module.exports = Review;