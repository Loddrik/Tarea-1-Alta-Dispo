const mongoose = require("mongoose");

const db = {
    connect: async () => {
        await mongoose.connect("mongodb+srv://loddrik:1234@cluster0.z7xjr.mongodb.net/test?maxPoolSize=20&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    },
    disconnect: () => mongoose.disconnect()
}


module.exports = db;