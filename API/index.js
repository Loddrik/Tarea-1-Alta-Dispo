const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routes/users");
const recipes = require("./routes/recipes");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use(cors());


app.use("/user", users);
app.use("/recipe", recipes);

app.listen(3001, "localhost", () => {
    console.log(`API corriendo (mela) en el puorto 😈💦  : 3000.`);
})