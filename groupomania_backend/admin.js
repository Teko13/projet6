module.exports = (req, res, next) => {
    try {
        console.log(req.isAdmin);
        if (!(req.isAdmin === 'true')) {
            return res.status(401).json({ message: "Acces non autorisé" })
        }
        next();
    } catch (error) {
        res.status(400).json({ error });
    }
}