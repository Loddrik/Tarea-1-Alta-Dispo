const express = require("express");

const recipes = require("./recipes");
const users   = require("./users");

const router = express.Router();

router.get("/", async (req, res) => { res.status(200).send({ message: "olakace"})})

router.use("/recipe", recipes);
router.use("/user",   users);

module.exports = router;