const Post = require('../model/Post');

exports.posts = (req, res, next) => {
    Post.find()
        .then(sauces => { res.status(200).json(sauces) })
        .catch(error => { res.status(500).json({ error }) })
}

exports.createPost = (req, res, next) => {
    if (req.file) {
        const post = new Post({
            ...req.body.post,
            imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: []
        });
        post.save()
            .then(() => { res.status(201).json({ message: 'post ajouter' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
    else {
        const post = new Post({
            ...req.body.post,
            imgUrl: "",
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: []
        });
        post.save()
            .then(() => { res.status(201).json({ message: 'post ajouter' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

exports.post = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(sauce => res.status(201).json(sauce))
        .catch(error => { res.status(404).json({ error }) })
}

exports.updatepost = (req, res, next) => { }

exports.deletepost = (req, res, next) => { }

exports.postReviews = (req, res, next) => { }