const express = require('express');
const morgan  = require('morgan'); 
const cors    = require('cors');
require('./auth/passport');


const routes = require('./routes');
const recipes = require("./routes/recipes");
const users   = require("./routes/users");

const app = express();

/** Express Config */
app.use( express.urlencoded({ extended: true }) );
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

/** Routes Config */
app.use("/", routes);

//app.use("/user", users);
//app.use("/recipe", recipes);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`API corriendo (mela) en el puorto 😈💦  : ${PORT}.`) );