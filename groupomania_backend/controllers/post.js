const Post = require('../model/Post');

exports.posts = (req, res, next) => {
    Post.find()
        .then(postsObjects => {
            const posts = postsObjects.reverse();
            res.status(200).json({ posts })
        })
        .catch(error => { res.status(500).json({ error }) })
}

exports.createPost = (req, res, next) => {
    if (req.file) {
        const postReceived = JSON.parse(req.body.post)
        const post = new Post({
            ...postReceived,
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
        const postReceived = JSON.parse(req.body.post);
        const post = new Post({
            ...postReceived,
            imgUrl: "",
            likes: 0,
            dislikes: 0,
            userLiked: [],
            userDisliked: []
        });
        console.log(post);
        post.save()
            .then(() => { res.status(201).json({ message: 'post ajouter' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

exports.post = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(201).json(post))
        .catch(error => { res.status(404).json({ error }) })
}

exports.updatepost = (req, res, next) => {
    console.log('mis a jour post');
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
        const postReceived = JSON.parse(req.body.post);
        Post.updateOne({ _id: req.params.id }, {
            ...postReceived
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

exports.deletepost = (req, res, next) => {
    console.log("sup");
    Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "poste supprimer" }))
        .catch(error => res.status(500).json({ error }))
}

exports.postReviews = (req, res, next) => { }