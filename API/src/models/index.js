const mongoose = require("mongoose");
const recipes  = require("./Recipe");
const users    = require("./User");

const db = {
    connect: async () => {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?maxPoolSize=20&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    },
    disconnect: async () => { await mongoose.disconnect() },
    recipes: recipes,
    users: users
};


module.exports = db;