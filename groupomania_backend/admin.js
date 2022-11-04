const jwt = require('jsonwebtoken');
const GUser = require('./model/GUser')
require('dotenv').config();
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodToken.userId;
        GUser.findOne({ _id: userId })
            .then((user) => {
                if (user && user.isAdmin) {
                    req.auth = {
                        userId: userId
                    };
                    next();
                }
                else {
                    return res.status(401).json({ message: 'acces non autorisé' })
                }
            })
    } catch (error) {
        console.log('non authoriser');
        res.status(401).json({ error })
    }
}