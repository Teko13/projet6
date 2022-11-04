module.exports = (req, res, next) => {
    try {
<<<<<<< HEAD
        if (!req.headers.isAdmin) {
=======
        if (!req.header.isAdmin) {
>>>>>>> back
            return res.status(401).json({ message: "Acces non autorisé" })
        }
        next();
    } catch (error) {
        res.status(400).json({ error });
    }
}