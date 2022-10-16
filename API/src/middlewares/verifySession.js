const jwt = require('jsonwebtoken');

const verifySession = async (req, res, next) => {
    // 1. check for Auth field
    console.log(req.headers);
    if( !("session-token" in req.headers) ){
        res.status(401).json({ "message": "Need to be loged in to perform this action." });
        return;
    }
    
    // 2. param id == user id
    const token = await jwt.verify(req.headers["session-token"], process.env.SECRET);
    if(token["id"] !== req.params.id){
        res.status(401).json({ "message": "You dont have the permision to perform this action."});
        return
    } 

    next();
};

module.exports = { verifySession}