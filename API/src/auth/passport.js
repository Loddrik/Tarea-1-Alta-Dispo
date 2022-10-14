const passport = require("passport");
const passportJwt = require("passport-jwt");

const User = require("../models/User");
const db   = require("../models")

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(
    new StrategyJwt({ 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET 
    }, (jwtPayload, done) => {
        db.connect();
        const response = User.findOne({ id: jwtPayload.id })
            .then( (user) => done(null, user))
            .catch((err)  => done(err));
        db.disconnect();

        return response;
    })
);

