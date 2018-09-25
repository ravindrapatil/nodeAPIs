// This middleware is used to verify the incomming token. 
// Here server can verify the token is valid or not 
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        // Here slpit is used to remove the Bearer added the authorization header
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed. May be token expired'
        });
    }
};
