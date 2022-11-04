module.exports = (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "Acces non autorisé" })
        }
        next();
    } catch (error) {
        res.status(400).json({ error });
    }
}