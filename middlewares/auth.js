const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) {
        //401 => unauthorized
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //If there is a verified token...
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    //If it's invalid...
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid'})
    }
}