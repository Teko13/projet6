const Post = require('../model/Post');
const fs = require('fs');
// update controller for admin
exports.updatepost = (req, res, next) => {
    if (req.file) {
        const postReceived = JSON.parse(req.body.post)
        Post.updateOne({ _id: req.params.id }, {
            ...postReceived,
            imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
    else {
        const postReceived = JSON.parse(req.body.post)
        Post.updateOne({ _id: req.params.id }, {
            ...postReceived
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

// delete controller for admin
exports.deletepost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {

            const imgName = post.imgUrl.split('/images/')[1];
            fs.unlink(`images/${imgName}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "poste supprimer" }))
                    .catch(error => res.status(500).json({ error }))
            })
        })
        .catch(error => res.status(500).json({ error }))
}
