const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const decodToken = jwt.verify(token, 'TOKEN_KEY');
    const userId = decodToken.userId;
    console.log(userId);

    // Verificatin de requete sans formData

    if (req.body.userId && req.body.userId === userId) {
        next();
    }

    // Verification de requete avec formData

    else {
        const senderId = req.originalUrl.split('posts/')[1];
        if (senderId === userId) {
            next();
        }
        else { res.status(401) }
    }
}