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
        const post = new Post({
            ...req.body,
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
        .then(post => res.status(201).json(post))
        .catch(error => { res.status(404).json({ error }) })
}

exports.updatepost = (req, res, next) => {
    console.log('mis a jour post');
    if (req.file) {
        const postReceived = JSON.parse(req.body.post)
        Post.updateOne({ _id: postReceived.postId }, {
            ...postReceived,
            imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
    else {
        Post.updateOne({ _id: req.body.postId }, {
            ...req.body
        })
            .then(() => { res.status(200).json({ message: 'post modifier' }) })
            .catch(error => { res.status(401).json({ error }) })
    }
}

exports.deletepost = (req, res, next) => {
    console.log("sup");
    Post.deleteOne({ _id: req.body.post })
        .then(() => res.status(200).json({ message: "poste supprimer" }))
        .catch(error => res.status(500).json({ error }))
}

exports.postReviews = (req, res, next) => {
    console.log(req.body.like);
    Post.findOne({ _id: req.body.postId })
        .then(post => {
            const userLiked = post.userLiked;
            const userDisliked = post.userDisliked;
            const checkUserLike = userLiked.find(usrId => req.body.userId === usrId);
            const checkUserDislike = userDisliked.find(userId => req.body.userId === userId);

            switch (req.body.like) {
                case 1:
                    try {
                        if (!checkUserLike && !checkUserDislike) {
                            console.log('ajout like');
                            userLiked.push(req.body.userId);
                            Post.updateOne({ _id: req.body.postId }, {
                                likes: post.likes += 1,
                                userLiked: userLiked
                            })
                                .then(() => res.status(200).json({ message: "post liker" }))
                                .catch(error => { throw error })
                        }
                        else {
                            throw "l'utilisateur a deja liker ou disliker le post"
                        }
                    } catch (error) {
                        res.status(500).json({ error })
                    }

                    break;

                case -1: try {
                    if (!checkUserDislike && !checkUserLike) {
                        userDisliked.push(req.body.userId);
                        Post.updateOne({ _id: req.body.postId }, {
                            dislikes: post.dislikes += 1,
                            userDisliked: userDisliked
                        })
                            .then(() => res.status(200).json({ message: "post disliker" }))
                            .catch(error => { throw error })
                    }
                    else {
                        throw 'non autoriser'
                    }
                } catch (error) {
                    res.status(500).json({ error })
                }
                    break;

                case 0: try {
                    console.log('annulation');
                    if (checkUserLike) {
                        const index = userLiked.findIndex(userId => userId === req.body.userId);
                        userLiked.splice(index, 1)
                        Post.updateOne({ _id: req.body.postId }, {
                            likes: post.likes -= 1,
                            userLiked: userLiked
                        })
                            .then(() => res.status(200).json({ message: 'like annuler' }))
                            .catch(error => { throw error })
                    }
                    else if (checkUserDislike) {
                        const index = userDisliked.findIndex(userId => userId === req.body.userId);
                        userDisliked.splice(index, 1);
                        Post.updateOne({ _id: req.body.postId }, {
                            dislikes: post.dislikes -= 1,
                            userDisliked: userDisliked
                        })
                            .then(() => res.status(200).json({ message: 'dislike annuler' }))
                            .catch(error => { throw error })
                    }
                } catch (error) {
                    res.status(500).json({ error })
                }
                    break;

                default:
                    break;
            }
        })
        .catch(error => res.status(500).json({ error }))
}