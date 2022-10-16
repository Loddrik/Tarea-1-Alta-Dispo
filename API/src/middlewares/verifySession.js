const jwt = require('jsonwebtoken');

const verifySession = async (req, res, next) => {
    // 1. check for Auth field
    if( !("session-token" in req.headers) ){
        res.status(401).json({ "message": "Need to be loged in to perform this action." });
        return;
    }

    next();
};

module.exports = { verifySession }