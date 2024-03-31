const jwt = require('jsonwebtoken');

const JWT_SECRETE = 'Ayminisagoodgir@l';


const getuser = (req, res, next)=>{
//Get the user from jwt token and add id to req object. 
    const token = req.header("auth-token");         //getting token from header.
    if(!token){
        res.status(401).send({error: "please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error: "please authenticate using valid token"});
    }
}

module.exports = getuser;