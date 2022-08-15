const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodToken.userId;
        req.auth = {
            userId: userId
        }
        next();
    } catch (error) {
        console.log('non authoriser');
        res.status(401).json({ error })
    }
}