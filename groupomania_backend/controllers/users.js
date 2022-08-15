const GUser = require('../model/GUser')
require('dotenv').config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new GUser({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => { res.status(201).json({ message: "utilisateur creer" }) })
                .catch(error => { res.status(401).json(error) })
        })
        .catch(error => { res.status(500).json(error) })
}

exports.login = (req, res, next) => {
    GUser.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'email ou mot de passe incorrect' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "mot de passe ou email incorrect" })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: "24h" })
                    })
                })
                .catch(error => { res.status(500).json(error) })
        })
        .catch(error => { res.status(500).json({ error }) })
}